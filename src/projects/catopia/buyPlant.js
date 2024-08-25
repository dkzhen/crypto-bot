const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { getUserInfo } = require("./repo");

exports.buyPlant = async () => {
  const tokens = await validateToken();
  const listPlant = [
    {
      id: 13,
      name: "Tomato",
      price: 1000,
    },
    {
      id: 14,
      name: "Carrot",
      price: 2000,
    },
    {
      id: 15,
      name: "Pinapple",
      price: 4000,
    },
    {
      id: 16,
      name: "Watermelon",
      price: 8000,
    },
    {
      id: 17,
      name: "Grape",
      price: 16000,
    },
  ];

  for (const token of tokens) {
    const userInfo = await getUserInfo(token);
    if (!userInfo) {
      console.log(`[ Error ] : cant get user info ${token.token}`);
      return;
    }

    const gold = userInfo.goldenCoin || 0;

    const plant = choosePlant(listPlant, gold);
    if (!plant) {
      console.log(
        `[ Error ] : cant choose plant GOLD: ${gold} UserId: ${userInfo.userId}`
      );
      return;
    }
    console.log(
      `[ BOT ] : Plant:  ${plant.name}  GOLD: ${gold} UserId: ${userInfo.userId}`
    );

    try {
      await axios.post(
        "https://api.catopia.io/api/v1/store/buy",
        {
          storeId: plant.id,
          price: plant.price,
          unit: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      console.log(`[ Running ] : Buy plant ${plant.name}`);
    } catch (error) {
      console.log(`[ Error ] : cant buy plant ${error.message}`);
    }
  }
};

function choosePlant(listPlant, gold) {
  // Loop through listPlant in reverse order
  for (let i = listPlant.length - 1; i >= 0; i--) {
    if (gold >= listPlant[i].price) {
      return listPlant[i]; // Return the first plant that meets the condition
    }
  }
  return null; // Jika tidak ada yang sesuai, return null atau bisa di-handle sesuai kebutuhan
}

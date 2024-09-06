const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.upgradeAnimal = async () => {
  const tokens = await validateToken();

  for (const token of tokens) {
    try {
      const ids = [1, 2];
      for (const id of ids) {
        const buy = await axios.post(
          "https://api.catopia.io/api/v1/store/buy",
          {
            storeId: 4,
            price: 60000,
            unit: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        const box = buy.data.data.buyData;

        console.log(
          `[ BUY ] : buy box has been created : length : ${box.length} `
        );

        const openBox = await axios.post(
          "https://api.catopia.io/api/v1/chest/open-multiple",
          {
            petTypeIds: [id],
            chestIds: box.map((item) => item.id),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        const boxReadyOpen = openBox.data.data.petsReceived;
        console.log(
          `[ OPEN ] : open box has been created : length : ${boxReadyOpen.length} `
        );
        const upgrade = await axios.post(
          "https://api.catopia.io/api/v1/players/pet/fast-upgrade",
          {
            level: 1,
            petTypeId: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        console.log(upgrade.data.data);
        console.log(`[ UPGRADE ] : upgrade pets has been created.. `);
        console.log(`[ BOT ] : wait 1 minute...`);
        await delay(1);
        console.log(`[ BOT ] : Box ${id} has been opened`);
      }

      console.log(`[ BOT ] : buy animal done..`);
    } catch (error) {
      console.log(error.message);
    }
  }
};

function delay(minutes) {
  return new Promise((resolve) => setTimeout(resolve, minutes * 60000));
}

const axios = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.buyFactory = async function () {
  const API_GAME_INFO = "https://cowtopia-be.tonfarmer.com/user/game-info?";
  const API_BUY_FACTORY = "https://cowtopia-be.tonfarmer.com/factory/buy";

  const tokens = await validateToken();

  for (const token of tokens) {
    try {
      const res = await axios.get(API_GAME_INFO, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      const factories = res.data.data.factories;
      const factoriesIsAvailable = factories.filter(
        (factory) => factory.lock === true
      );

      const money = res.data.data.user.money;

      if (money >= factoriesIsAvailable[0].unlockCost) {
        await axios.post(
          API_BUY_FACTORY,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        console.log(`[ Factory ] : factory unlocked`);
      } else {
        console.log(`[ Factory ] : not enough money to unlock factory`);
        console.log("");
      }
    } catch (error) {
      console.log(`[ Error ] : unlock factory failed`);
    }
  }
};

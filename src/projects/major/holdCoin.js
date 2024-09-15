const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.holdCoin = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const holdCoin = await axios.post(
        "https://major.bot/api/bonuses/coins/",
        { coins: 915 },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(`[ Hold Coin ] : Hold Coin ${holdCoin.data}`);
    }
  } catch (error) {
    const timestamp = error.response.data;

    const dateInUTC = new Date(timestamp.detail.blocked_until * 1000);
    const utcPlus7 = new Date(dateInUTC.getTime() + 7 * 60 * 60 * 1000);
    console.log("[ Error ] Hold Coin Play again in", utcPlus7.toISOString());
  }
};

exports.swipeCoin = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const holdCoin = await axios.post(
        "https://major.bot/api/swipe_coin/",
        { coins: 3000 },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(`[ Swipe Coin ] : Successfully ${holdCoin.data}`);
    }
  } catch (error) {
    const timestamp = error.response.data;
    const dateInUTC = new Date(timestamp.detail.blocked_until * 1000);
    const utcPlus7 = new Date(dateInUTC.getTime() + 7 * 60 * 60 * 1000);
    console.log("[ Error ] Swipe Coin Play again in", utcPlus7.toISOString());
  }
};

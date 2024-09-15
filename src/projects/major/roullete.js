const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.roullete = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const holdCoin = await axios.post(
        "https://major.bot/api/roulette/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(`[ Roullete Coin ] : Successfully ${holdCoin.data}`);
    }
  } catch (error) {
    const timestamp = error.response.data;
    const dateInUTC = new Date(timestamp.detail.blocked_until * 1000);
    const utcPlus7 = new Date(dateInUTC.getTime() + 7 * 60 * 60 * 1000);
    console.log("[ Error ] Roullete Play again in", utcPlus7.toISOString());
  }
};

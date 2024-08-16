const { default: axios } = require("axios");
const { getTokens } = require("./GetTokens");
const { configDotenv } = require("dotenv");
configDotenv();

exports.validateToken = async () => {
  const tokens = await getTokens();

  const validToken = [];
  for (const token of tokens) {
    try {
      const balance = await axios.get(
        "https://api-web.tomarket.ai/tomarket-game/v1/user/balance",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token}`,
          },
        }
      );
      console.log(
        `[ Balance : ${balance.data.data.available_balance} ]\n[ Play_passes : ${balance.data.data.play_passes} ]\n`
      );
      validToken.push(token);
    } catch (error) {
      const url = `${process.env.API_URL}/bot/sendMessage`;
      await axios.post(url, {
        chatId: token.telegramId,
        message: `Token expired or invalid: 
 \nBot : @Tomarketbot 
 \nTelegramId : ${token.telegramId} \nToken : ${token.token}`,
        tokenId: token.id,
      });

      console.log(`[ Error ] : token not valid , response code : ${error}`);
    }
  }
  console.log(`[ Token valid ] : ${validToken.length}\n`);
  return validToken;
};

const { default: axios } = require("axios");
const { getTokens } = require("./GetTokens");
const { configDotenv } = require("dotenv");
configDotenv();

exports.validateToken = async () => {
  const tokens = await getTokens();

  const validToken = [];
  for (const token of tokens) {
    try {
      await axios.get("https://api.catopia.io/api/v1/user/me?limit=3000", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      validToken.push(token);
    } catch (error) {
      const url = `${process.env.API_URL}/bot/sendMessage`;
      await axios.post(url, {
        chatId: token.telegramId,
        message: `Token expired or invalid: 
 \nBot : @Catopia 
 \nTelegramId : ${token.telegramId} \nToken : ${token.token}`,
        tokenId: token.id,
      });

      console.log(`[ Error ] : token not valid , response code : ${error}`);
    }
  }
  console.log(`[ Token valid ] : ${validToken.length}\n`);
  return validToken;
};

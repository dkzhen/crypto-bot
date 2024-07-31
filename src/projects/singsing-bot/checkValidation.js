const { default: axios } = require("axios");
const { configDotenv } = require("dotenv");
const { getTokenAuth } = require("./getToken");
const { getMission } = require("./repo");
configDotenv();

exports.validateToken = async () => {
  const tokens = await getTokenAuth();
  if (tokens === null) return null;
  const validToken = [];
  for (const token of tokens) {
    try {
      await getMission(token.token);

      validToken.push(token);
    } catch (error) {
      const url = `${process.env.API_URL}/bot/sendMessage`;
      await axios.post(url, {
        chatId: token.telegramId,
        message: `Token expired or invalid: 
 \nBot : @SingSingTGbot 
 \nTelegramId : ${token.telegramId} \nToken : ${token.token}`,
        tokenId: token.id,
      });

      console.log(`[ Error ] : token not valid , response code : ${error}`);
    }
  }
  console.log(`[ Token valid ] : ${validToken.length}\n`);
  return validToken;
};

const { default: axios } = require("axios");
const { getTokens } = require("./GetTokens");
const { configDotenv } = require("dotenv");
configDotenv();

exports.validateToken = async () => {
  const API_URL = "https://interface.carv.io/banana/get_user_info";

  const tokens = await getTokens();

  const validToken = [];
  if (tokens === null) return null;

  for (const token of tokens) {
    try {
      await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      validToken.push(token);
    } catch (error) {
      const url = `${process.env.API_URL}/bot/sendMessage`;
      await axios.post(url, {
        chatId: token.telegramId,
        message: `Token expired or invalid: 
 \nBot : @bananaBot 
 \nTelegramId : ${token.telegramId} \nToken : ${token.token}`,
        tokenId: token.id,
      });

      console.log(`[ Error ] : token not valid , response code : ${error}`);
    }
  }
  console.log(`[ Token valid ] : ${validToken.length}\n`);
  return validToken;
};

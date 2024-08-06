const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  try {
    const url = `${process.env.API_URL}/token/@piggybot`;
    const tokens = await fetchQueryTokens(url);
    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.get(
          `https://api.prod.piggypiggy.io/tgBot/login?${token.token}&invite_id=1370196228`
        );

        const auth = response.data.data.token;
        authToken.push({ token: auth });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @Piggybot 
 \nTelegramId : ${token.telegramId} \nToken : ${token.token}`,
          tokenId: token.id,
        });

        console.log(`[ Error ] : token not valid , response code : ${error}`);
      }
    }
    return authToken;
  } catch (error) {
    console.log(error.message);
  }
};

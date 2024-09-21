const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  try {
    const url = `${process.env.API_URL}/token/@seedbot`;
    const tokens = await fetchQueryTokens(url);
    const authToken = [];

    for (const token of tokens) {
      try {
        authToken.push({ token: token.token });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @SeedBot 
 \nTelegramId : ${token.telegramId} \nToken : ${token.token}\nStatus : ${error.response.status}`,
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

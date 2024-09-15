const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH = "https://major.bot/api/auth/tg/";

  try {
    const url = `${process.env.API_URL}/token/@major-bot`;
    const tokens = await fetchQueryTokens(url);
    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.post(API_AUTH, { init_data: token.token });

        const auth = response.data.access_token;

        authToken.push({ token: auth });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @majorBot 
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

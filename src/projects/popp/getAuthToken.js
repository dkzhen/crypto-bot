const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH = "https://moon.popp.club/pass/login";

  try {
    const url = `${process.env.API_URL}/token/@poppbot`;
    const tokens = await fetchQueryTokens(url);

    const authToken = [];

    for (const token of tokens) {
      const body = {
        initData: token.token,
      };
      try {
        const response = await axios.post(API_AUTH, body);
        const auth = response.data.data.token;

        authToken.push({ token: auth });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @popptothemoon-bot 
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

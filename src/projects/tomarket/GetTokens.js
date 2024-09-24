const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH = "https://api-web.tomarket.ai/tomarket-game/v1/user/login";

  try {
    const url = `${process.env.API_URL}/token/@tomarketbot`;
    const tokens = await fetchQueryTokens(url);
    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.post(API_AUTH, {
          init_data: token.token,
          invite_code: "00002rfy",
          from: "",
          is_bot: false,
        });

        const auth = response.data.data.access_token;
        const status = response.data.status;

        if (status === 400) {
          const url = `${process.env.API_URL}/bot/sendMessage`;
          await axios.post(url, {
            chatId: token.telegramId,
            message: `Token expired or invalid:
           \nBot : @tomarket
           \nTelegramId : ${token.telegramId} \nToken : ${token.token}\nStatus : ${status}\n Message : ${response.data.data.message}`,
            tokenId: token.id,
          });
        }

        authToken.push({ token: auth });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @tomarket 
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

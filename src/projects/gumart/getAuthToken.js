const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH = "https://api.gumart.click/api/login";

  try {
    const url = `${process.env.API_URL}/token/@gumartbot`;
    const tokens = await fetchQueryTokens(url);
    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.post(API_AUTH, {
          telegram_data: token.token,
          ref_id: "",
        });

        const auth = response.data.data.access_token;
        authToken.push({ token: auth });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @gumart 
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

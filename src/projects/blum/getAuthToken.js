const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH =
    "https://user-domain.blum.codes/api/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP";

  try {
    const url = `${process.env.API_URL}/token/@BlumCryptoBot`;
    const tokens = await fetchQueryTokens(url);

    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.post(API_AUTH, { query: token.token });

        const auth = response.data.token.refresh;
        authToken.push({ token: auth });
      } catch (error) {
        const url = `${process.env.API_URL}/bot/sendMessage`;
        await axios.post(url, {
          chatId: token.telegramId,
          message: `Token expired or invalid: 
 \nBot : @BlumCryptoBot 
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

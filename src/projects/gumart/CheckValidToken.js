const { default: axios } = require("axios");
const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./getAuthToken");
configDotenv();

exports.validateToken = async () => {
  const API_URL = "https://api.gumart.click/api/home";
  const tokens = await getAuthToken();

  const validToken = [];
  for (const token of tokens) {
    try {
      const info = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      console.log(`[ BOT ] : Checking token done..`);
      console.log(`[ BOT ] : balance : ${info.data.data.balance}`);

      validToken.push(token);
    } catch (error) {
      console.log(`[ Error ] : validate token failed`);
    }
  }
  return validToken;
};

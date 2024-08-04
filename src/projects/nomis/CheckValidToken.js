const { default: axios } = require("axios");
const { getTokens } = require("./GetTokens");
const { configDotenv } = require("dotenv");
const { getProfile } = require("./repo");
const { AuthUserId } = require("./AuthUserId");
configDotenv();

exports.validateToken = async () => {
  const tokens = await getTokens();

  const validToken = [];
  for (const token of tokens) {
    try {
      const user_id = await AuthUserId(token.token);
      await getProfile(token.token, user_id);
      validToken.push(token);
    } catch (error) {
      console.log(`[ Error ] : token not valid , response code : ${error}`);
    }
  }
  console.log(`[ Token valid ] : ${validToken.length}\n`);
  return validToken;
};

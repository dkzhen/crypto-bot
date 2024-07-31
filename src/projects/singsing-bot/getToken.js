const fs = require("fs").promises;
const { configDotenv } = require("dotenv");
const { fetchJWTTokens } = require("../../utils/Tokens");
configDotenv();
exports.getTokenAuth = async () => {
  try {
    const url = `${process.env.API_URL}/token/@SingSingTGBot`;
    const tokens = await fetchJWTTokens(url);
    if (tokens.length > 0) {
      tokens.map((item, index) => {
        console.log(`\n[ Token ${index + 1} ] : ${item.token}`);
      });
      console.log(`[ Total tokens ] : ${tokens.length}`);

      return tokens;
    } else {
      console.log("[ Error ] No tokens found");
    }
  } catch (error) {
    console.log(
      `[ Error ] : Token not found, please add token on configs/config.json`
    );
    return null;
  }
};

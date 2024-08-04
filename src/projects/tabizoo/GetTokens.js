const axios = require("axios");
const { configDotenv } = require("dotenv");
const { fetchQueryTokens } = require("../../utils/Tokens");
const fs = require("fs").promises;
configDotenv();

exports.getTokens = async () => {
  try {
    const url = `${process.env.API_URL}/token/@tabizooBot`;
    const tokens = await fetchQueryTokens(url);
    tokens.map((item, index) => {
      console.log(`\n[ Token ${index + 1} ] : ${item.token}`);
    });
    console.log(`[ Total tokens ] : ${tokens.length}`);

    return tokens;
  } catch (error) {
    console.log(
      `[ Error ] : Token not found, please add token on configs/config.json`
    );
    return null;
  }
};

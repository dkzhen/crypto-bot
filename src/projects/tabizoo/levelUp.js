const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { headersRequest } = require("./repo");

exports.levelUp = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const headers = await headersRequest(token.token);
      const levelUp = await axios.post(
        "https://app.tabibot.com/api/user/level-up",
        {},
        headers
      );
      if (levelUp.data) {
        console.log(
          `[ Running ] : Upgrade to level ${levelUp.data.level} successfully...`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

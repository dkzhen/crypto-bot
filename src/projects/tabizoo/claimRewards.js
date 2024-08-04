const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { headersRequest } = require("./repo");

exports.claimRewards = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const headers = await headersRequest(token.token);
      const claim = await axios.post(
        "https://app.tabibot.com/api/mining/claim",
        {},
        headers
      );
      if (claim.data) {
        console.log(`[ Running ] : Claiming mining...`);
      } else {
        console.log(`[ Completed ] : Farming has been claimed`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

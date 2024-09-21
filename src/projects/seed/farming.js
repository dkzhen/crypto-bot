const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.claimSeed = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const claim = await axios.post(
        "https://elb.seeddao.org/api/v1/seed/claim",
        {},
        {
          headers: {
            "telegram-data": `${token.token}`,
          },
        }
      );
      console.log(
        `[ Running ] : Claim seed successfully. Seed: ${claim.data.data.amount}`
      );
    }
  } catch (error) {
    console.log(
      `[ Error ] : claim seed failed. Response code : ${error.response.status}. Message : ${error.response.data.message}`
    );
  }
};

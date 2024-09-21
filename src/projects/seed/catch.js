const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.catchWormOrEgg = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const catchWorm = await axios.post(
        "https://elb.seeddao.org/api/v1/worms/catch",
        {},
        {
          headers: {
            "telegram-data": `${token.token}`,
          },
        }
      );
      console.log(
        `[ Running ] : Catch worm successfully. WormId: ${catchWorm.data.data.id}. Type: ${catchWorm.data.data.type}`
      );
    }
  } catch (error) {
    console.log(
      `[ Error ] : Catch failed. Response code : ${error.response.status}. Message : ${error.response.data.message}`
    );
  }
};

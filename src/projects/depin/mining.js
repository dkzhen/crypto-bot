const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.mining = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const mining = await axios.get(
        "https://api.depinalliance.xyz/users/claim",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(
        `[ Running ] :claim mining reward. Points : ${mining.data.data.point}`
      );
    }
  } catch (error) {
    console.log(`[ Error ] : Farming in failed`);
  }
};

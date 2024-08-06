const { default: axios } = require("axios");
const { getAuthToken } = require("./getAuthToken");
const { validateToken } = require("./CheckValidToken");

exports.startBoost = async () => {
  const API_URL = "https://api.gumart.click/api/boost";
  const tokens = await validateToken();

  for (const token of tokens) {
    try {
      const info = await axios.post(
        API_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      if (info.data.status_code !== 400) {
        console.log(`[ Running ] : Boost started...`);
      } else {
        console.log(`[ Completed ] : Boost has been running...`);
      }
    } catch (error) {
      console.log(`[ Error ] : validate token failed`);
    }
  }
};

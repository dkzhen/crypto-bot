const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { getProfile } = require("./repo");
const { AuthUserId } = require("./AuthUserId");

exports.startFarming = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const user_id = await AuthUserId(token.token);
      const profile = await getProfile(token.token, user_id);

      if (profile.nextFarmClaimAt == null) {
        await axios.post(
          "https://cms-tg.nomis.cc/api/ton-twa-users/start-farm",
          { user_id: user_id },
          {
            headers: {
              "Content-Type": "application/json",
              Origin: "https://telegram.nomis.cc",
              Referer: "https://telegram.nomis.cc/",
              "X-App-Init-Data": token.token,
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        console.log(`[ Completed ] : Farming started..`);
      } else {
        console.log(`[ Completed ] : Farming has been running..`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

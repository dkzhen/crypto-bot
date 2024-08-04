const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { getProfile } = require("./repo");
const { AuthUserId } = require("./AuthUserId");

exports.claimFarming = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const user_id = await AuthUserId(token.token);
      const profile = await getProfile(token.token, user_id);
      try {
        if (profile.nextFarmClaimAt != null) {
          const claim = await axios.post(
            "https://cms-tg.nomis.cc/api/ton-twa-users/claim-farm",
            {
              user_id: user_id,
            },
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
          console.log(`[ Running ] : Claim Farming successfully...`, claim);
        }
      } catch (error) {
        if (error.response.status == 400) {
          console.log(`[ Completed ] :${error.response.data.error.message}`);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { headersRequest } = require("./repo");

exports.checkIn = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const headers = await headersRequest(token.token);
      const check = await axios.post(
        "https://app.tabibot.com/api/user/sign-in",
        {},
        headers
      );
      if (check.data.user.hasCheckedIn) {
        console.log(
          `[ Completed ] : ${check.data.user.name} has been check in today`
        );
        console.log(
          `[ Account ] : Name : ${check.data.user.name}\n [ Wallet ] : ${check.data.user.tabiAddress}\n  [ Coins ] : ${check.data.user.coins}\n [ Level ] : ${check.data.user.level}\n`
        );
      } else {
        const checkIn = await axios.post(
          "https://app.tabibot.com/api/user/check-in",
          {},
          headers
        );
        console.log(
          `[ Running ] : checking in ${checkIn.data.user.checkInDate}...`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.getUserVisit = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const visitExc = await axios.post(
        "https://major.bot/api/user-visits/visit/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      console.log(
        `[ Running ] user ${visitExc.data.user_id} Streak : ${visitExc.data.streak} is_completed : ${visitExc.data.is_increased}: ${visitExc.data.is_allowed} `
      );
      const visit = await axios.get(
        "https://major.bot/api/user-visits/streak/",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(
        `[ BOT ] user ${visit.data.user_id} Streak : ${visit.data.streak}`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

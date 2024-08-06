const { default: axios } = require("axios");
const { ExtractQuery } = require("./repo");

exports.AuthUserId = async (token) => {
  try {
    const { username, userId } = await ExtractQuery(token);
    if (username && userId) {
      const auth = await axios.post(
        "https://cms-tg.nomis.cc/api/ton-twa-users/auth/",
        {
          telegram_user_id: userId,
          telegram_username: username,
          referrer: "",
        },
        {
          headers: {
            "x-app-init-data": token,
            Origin: "https://telegram.nomis.cc",
            Priority: "u=1, i",
            Referer: "https://telegram.nomis.cc/",
          },
        }
      );
      return auth.data.id;
    }
  } catch (error) {
    console.log(error.message);
  }
};

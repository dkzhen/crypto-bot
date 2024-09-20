const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.DailyCheckIn = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const res = await axios.post(
        "https://api-web.tomarket.ai/tomarket-game/v1/daily/claim",
        { game_id: "fa873d13-d831-4d6f-8aee-9cff7a1d0db1" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token}`,
          },
        }
      );

      if (res.data.status === 400) {
        console.log(res.data);
        console.log(
          `[ Completed ] : Already check in today. Points : ${res.data.data.today_points}. Streak : ${res.data.data.check_counter} `
        );
      } else {
        console.log(
          `[ Running ] : Check in Successfully. Points : ${res.data.data.today_points}. Streak : ${res.data.data.check_counter}`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

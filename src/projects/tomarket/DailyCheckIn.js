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
        console.log(`[ Completed ] : ${res.data.message}`);
      } else {
        console.log(`[ Running ] : ${res.data.message}`);
      }

      const star = await axios.post(
        "https://api-web.tomarket.ai/tomarket-game/v1/tasks/classmateStars",
        { task_id: 150 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token}`,
          },
        }
      );
      console.log(
        `[ BOT ] : Classmate Stars : ${star.data.data.stars}, days: ${star.data.data.days} `
      );
      const claim = await axios.post(
        "https://api-web.tomarket.ai/tomarket-game/v1/tasks/claim",
        { task_id: 150 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token}`,
          },
        }
      );

      console.log(`[ Running ] : Claim classmate : ${claim.data.data}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

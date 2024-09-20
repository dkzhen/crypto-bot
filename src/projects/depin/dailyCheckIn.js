const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.dailyCheckin = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const check = await axios.get(
        "https://api.depinalliance.xyz/missions/daily-checkin",

        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      const today = new Date();
      const todayTimestamp = Math.floor(today.setUTCHours(0, 0, 0, 0) / 1000);

      // Check if today's date exists in the array and if it isChecked
      const foundDay = check.data.data.find(
        (day) => day.time === todayTimestamp && day.isChecked === true
      );

      if (foundDay) {
        console.log(
          `[ Completed ] : ${foundDay.name} already checked in today. XP : ${foundDay.xp}. Points : ${foundDay.point}`
        );
      } else {
        const checkin = await axios.post(
          "https://api.depinalliance.xyz/missions/daily-checkin",
          {},
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        console.log(
          `[ Running ] : CheckIn Successfully. Points: ${checkin.data.data}`
        );
      }
    }
  } catch (error) {
    console.log(`[ Error ] : Daily check in failed`);
  }
};

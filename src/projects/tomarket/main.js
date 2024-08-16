const { claimFarming } = require("./claimFarming");
const { DailyCheckIn } = require("./DailyCheckIn");
const { playGame } = require("./playgame");
const cron = require("node-cron");
const MainTomarketBot = async () => {
  DailyCheckIn();
  claimFarming();
  playGame();

  cron.schedule("0 * * * *", DailyCheckIn);
  cron.schedule("0 * * * *", claimFarming);
  cron.schedule("0 * * * *", playGame);
};

module.exports = { MainTomarketBot };

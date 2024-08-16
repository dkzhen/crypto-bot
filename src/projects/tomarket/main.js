const { claimFarming } = require("./claimFarming");
const { DailyCheckIn } = require("./DailyCheckIn");
const { playGame } = require("./playgame");
const cron = require("node-cron");
const MainTomarketBot = async () => {
  console.log(`[ BOT ] : Tomarket Bot starting...`);
  DailyCheckIn();
  claimFarming();
  playGame();
};

module.exports = { MainTomarketBot };

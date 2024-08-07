const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { playGame } = require("./PlayGame");
const { claimMission, mission } = require("./Mission");
const { claimRewards } = require("./ClaimReward");
const { DailyRewards } = require("./DailyReward");
configDotenv();

const app = express();

playGame();
claimMission();
claimRewards();
mission();
cron.schedule("0 * * * *", playGame);
cron.schedule("0 * * * *", claimMission);
cron.schedule("0 * * * *", claimRewards);
cron.schedule("0 * * * *", mission);

cron.schedule("0 0 * * *", DailyRewards);

const port = process.env.PORT || process.env.PORT_BLUM || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

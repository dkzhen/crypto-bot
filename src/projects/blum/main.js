const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { playGame } = require("./PlayGame");
const { claimMission, mission } = require("./Mission");
const { claimRewards } = require("./ClaimReward");
const { DailyRewards } = require("./DailyReward");
const { MainTomarketBot } = require("../tomarket/main");
configDotenv();

const app = express();

const mainBlum = async () => {
  console.log(`[ BOT ] Blum bot Started...`);

  await claimMission();
  await claimRewards();
  await mission();
  await playGame();
};
const main = async () => {
  await mainBlum();
  await MainTomarketBot();
};
main();
cron.schedule("0 * * * *", mainBlum);
cron.schedule("0 * * * *", MainTomarketBot);

const port = process.env.PORT || process.env.PORT_BLUM || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { rewardDaily } = require("./DailyReward");
const { farming } = require("./farming");
const { planetGame } = require("./ExplorePlanet");
const { SocialSummerTask } = require("./VisitSummer");

configDotenv();

rewardDaily();
farming();
planetGame();
SocialSummerTask();

cron.schedule("0 * * * *", rewardDaily);
cron.schedule("0 * * * *", farming);
cron.schedule("0 * * * *", planetGame);
cron.schedule("0 * * * *", SocialSummerTask);
const app = express();

const port = process.env.PORT || process.env.PORT_POPP || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

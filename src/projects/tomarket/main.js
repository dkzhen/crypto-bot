const { claimFarming } = require("./claimFarming");
const { DailyCheckIn } = require("./DailyCheckIn");
const { playGame } = require("./playgame");
const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
configDotenv();

const app = express();

claimFarming();
DailyCheckIn();
playGame();

cron.schedule("0 * * * *", claimFarming);
cron.schedule("0 * * * *", DailyCheckIn);
cron.schedule("0 * * * *", playGame);

const port = process.env.PORT || process.env.PORT_TOMARKET || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { dailyMission } = require("./dailyMission");
const { holdCoin, swipeCoin } = require("./holdCoin");
const { roullete } = require("./roullete");

configDotenv();

const app = express();

dailyMission();
holdCoin();
roullete();
swipeCoin();
cron.schedule("0 * * * *", holdCoin);
cron.schedule("0 * * * *", roullete);
cron.schedule("0 * * * *", swipeCoin);
cron.schedule("0 * * * *", dailyMission);

const port = process.env.PORT || process.env.PORT_BLUM || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

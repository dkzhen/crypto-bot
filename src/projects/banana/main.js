const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { claimLotery } = require("./claimLotery");
const { clickRewards } = require("./click");
const { claimMission } = require("./claimMission");

configDotenv();

const app = express();

claimLotery();
clickRewards();
claimMission();
cron.schedule("0 * * * *", claimLotery);
cron.schedule("0 * * * *", clickRewards);
cron.schedule("0 * * * *", claimMission);

const port = process.env.PORT_BANANA || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

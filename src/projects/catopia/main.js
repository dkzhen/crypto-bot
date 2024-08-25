const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { farmPlant } = require("./farmPlant");
const { claimMission } = require("./claimMission");

configDotenv();

const app = express();

farmPlant();

cron.schedule("*/12 * * * *", farmPlant);
cron.schedule("0 * * * *", claimMission);

const port = process.env.PORT || process.env.PORT_COWTOPIA || 202;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

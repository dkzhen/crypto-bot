const { claimMission } = require("./ClaimMission");
const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
configDotenv();

const app = express();

const main = async () => {
  claimMission();

  cron.schedule("0 * * * *", claimMission);
};
main();

const port = process.env.PORT_SINGSING || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

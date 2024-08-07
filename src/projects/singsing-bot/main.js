const { claimMission } = require("./ClaimMission");
const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
configDotenv();

const app = express();

const main = async () => {
  claimMission();

  cron.schedule("0 * * * *", () => {
    const now = new Date();
    const hours = now.getUTCHours();
    const timezoneOffset = 7; // UTC+7

    // Calculate the current hour in UTC+7
    const localHours = (hours + timezoneOffset) % 24;

    // Skip execution if it's 6 AM in UTC+7
    if (localHours === 6) {
      console.log("Skipping execution at 6 AM UTC+7");
      return;
    }

    // Call the complex claimMission function
    claimMission();
  });
};
main();

const port = process.env.PORT || process.env.PORT_SINGSING || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

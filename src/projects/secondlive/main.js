const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { checkInToday } = require("./checkInToday");
const { dailySpinner } = require("./dailySpinner");
const { claimFarming } = require("./claimFarming");
const { crushLocker } = require("./crushLocker");
configDotenv();

const app = express();

checkInToday();
dailySpinner();
claimFarming();
crushLocker();
cron.schedule("0 * * * *", checkInToday);
cron.schedule("0 * * * *", dailySpinner);
cron.schedule("0 * * * *", claimFarming);
cron.schedule("0 * * * *", crushLocker);

const port = process.env.PORT_SECONDLIVE || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

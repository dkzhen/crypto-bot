const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { mining } = require("./mining");
const { dailyCheckin } = require("./dailyCheckIn");
configDotenv();

const app = express();

dailyCheckin();
mining();
cron.schedule("0 * * * *", dailyCheckin);
cron.schedule("0 * * * *", mining);
const port = process.env.PORT || process.env.PORT_TOMARKET || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

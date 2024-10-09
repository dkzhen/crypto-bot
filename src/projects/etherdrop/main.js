const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { dailyLogin } = require("./dailyLogin");
const { dailyTask } = require("./dailyTask");

configDotenv();

const app = express();

dailyLogin();
dailyTask();
cron.schedule("0 * * * *", dailyTask);
cron.schedule("0 * * * *", dailyLogin);

const port = process.env.PORT || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

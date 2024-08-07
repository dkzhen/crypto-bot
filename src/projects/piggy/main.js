const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { Task } = require("./Task");
const { CreateStarPay } = require("./CreateStarPay");
const { initTask } = require("./initTask");

configDotenv();

const app = express();

const main = async () => {
  await initTask();
  await Task();
  CreateStarPay();
};

main();
cron.schedule("0 * * * *", CreateStarPay);
cron.schedule("0 * * * *", Task);
cron.schedule("0 0 * * *", initTask);

const port = process.env.PORT || process.env.PORT_PIGGY || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

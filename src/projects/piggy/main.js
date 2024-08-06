const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { Task } = require("./Task");
const { CreateStarPay } = require("./CreateStarPay");

configDotenv();

const app = express();

Task();
CreateStarPay();
cron.schedule("0 * * * *", Task);
cron.schedule("0 * * * *", CreateStarPay);

const port = process.env.PORT_PIGGY || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

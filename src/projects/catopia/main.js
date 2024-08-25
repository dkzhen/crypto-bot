const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { farmPlant } = require("./farmPlant");

configDotenv();

const app = express();

farmPlant();

cron.schedule("*/12 * * * *", farmPlant);

const port = process.env.PORT || process.env.PORT_COWTOPIA || 202;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

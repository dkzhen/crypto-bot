const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { startBoost } = require("./startBoost");
configDotenv();

const app = express();

startBoost();
cron.schedule("0 * * * *", startBoost);

const port = process.env.PORT_GUMART || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

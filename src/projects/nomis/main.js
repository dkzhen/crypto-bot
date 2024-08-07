const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { startFarming } = require("./startFarming");
const { claimFarming } = require("./claimFarming");
configDotenv();

const app = express();

const main = async () => {
  await claimFarming();
  await startFarming();
};
main();

cron.schedule("0 * * * *", claimFarming);
cron.schedule("0 * * * *", startFarming);

const port = process.env.PORT || process.env.PORT_NOMIS || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

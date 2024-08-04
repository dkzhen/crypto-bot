const { checkIn } = require("./checkIn");
const { claimRewards } = require("./claimRewards");
const { levelUp } = require("./levelUp");
const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
configDotenv();

const app = express();
const main = async () => {
  await checkIn();
  await claimRewards();
  await levelUp();
};
main();
cron.schedule("0 * * * *", checkIn);
cron.schedule("0 * * * *", claimRewards);
cron.schedule("0 * * * *", levelUp);

const port = process.env.PORT_TABIZOO || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

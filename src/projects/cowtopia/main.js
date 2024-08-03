const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { claimMission } = require("./ClaimMission");
const { claimOfflineProfit } = require("./ClaimOfflineProfit");
const { buyAnimal } = require("./BuyAnimal");
configDotenv();

const app = express();

async function main() {
  await claimMission();
  await claimOfflineProfit();
  await buyAnimal();
  console.log(`\n[ BOT ] : Task complete please wait 1 hour...\n`);
}
// Schedule the task to run every hour on the hour
main();

cron.schedule("0 * * * *", claimMission);
cron.schedule("0 */3 * * *", claimOfflineProfit);
cron.schedule("0 * * * *", buyAnimal);

const port = process.env.PORT_COWTOPIA || 202;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

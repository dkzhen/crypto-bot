const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { dailyMission } = require("./dailyMission");
const { holdCoin, swipeCoin } = require("./holdCoin");
const { roullete } = require("./roullete");
const { getUserVisit } = require("./visit");

configDotenv();

const app = express();

// Helper function to add delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scheduleWithDelay() {
  dailyMission();
  await delay(10000); // 10 seconds delay

  holdCoin();
  await delay(10000); // 10 seconds delay

  roullete();
  await delay(10000); // 10 seconds delay

  swipeCoin();
  await delay(10000); // 10 seconds delay

  getUserVisit();
}

// Run the functions initially with delay
scheduleWithDelay();

// Schedule the tasks with cron, each with the same interval but delayed execution
cron.schedule("0 * * * *", async () => {
  await scheduleWithDelay();
});

const port = process.env.PORT || process.env.PORT_BLUM || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

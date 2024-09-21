const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { claimSeed } = require("./farming");
const { Login, streakReward, spinTicket } = require("./dailyLogin");
const { catchEgg } = require("./wormEgg");
const { catchWormOrEgg } = require("./catch");

configDotenv();

const app = express();

claimSeed();
Login();
streakReward();
spinTicket();
catchEgg();
catchWormOrEgg();
cron.schedule("0 * * * *", claimSeed);
cron.schedule("0 * * * *", Login);
cron.schedule("0 * * * *", streakReward);
cron.schedule("0 * * * *", spinTicket);
cron.schedule("0 * * * *", catchEgg);
cron.schedule("0 * * * *", catchWormOrEgg);

const port = process.env.PORT || 201;
app.listen(port, () => {
  console.log("Express app is running on port " + port);
  console.log(`[ BOT ] : Bot starting...`);
});

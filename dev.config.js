const { configDotenv } = require("dotenv");

configDotenv();
const { API_URL } = process.env;

const apps = [
  // "singsing",
  // "cowtopia",
  "blum",
  // "nomis",
  // "piggy",
  // "banana",
  // "gumart",
  // "tabizoo",
  "major",
  // "popp",
  // "secondlive",
  "tomarket",
  "catopia",
  "depin",
];

const config = apps.map((appName, index) => ({
  name: appName,
  script: "npm",
  args: `run ${appName}`,
  env: {
    NODE_ENV: "development",
    PORT: 1000 + index,
    API_URL: API_URL,
  },
  log_date_format: "YYYY-MM-DD HH:mm Z",
  merge_logs: true,
}));

module.exports = {
  apps: config,
};

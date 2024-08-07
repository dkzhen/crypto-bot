const API_URL = "https://telegram-api.zhen.lat";

const apps = [
  "singsing",
  "cowtopia",
  "blum",
  "nomis",
  "piggy",
  "banana",
  "gumart",
  "tabizoo",
  "popp",
];

const config = apps.map((appName, index) => ({
  name: appName,
  script: "npm",
  args: `run ${appName}`,
  instances: 1,
  exec_mode: "cluster",
  env: {
    NODE_ENV: "development",
    PORT: 200 + index,
    API_URL: API_URL,
  },
  log_date_format: "YYYY-MM-DD HH:mm Z",
  merge_logs: true,
  max_restarts: 10,
  min_uptime: "200s",
}));

module.exports = {
  apps: config,
};

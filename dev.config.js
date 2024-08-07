const API_URL = "https://telegram-api.zhen.lat";
module.exports = {
  apps: [
    {
      name: "singsing",
      script: "npm",
      args: "run singsing",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 200,
        API_URL: API_URL,
      },
    },
    {
      name: "cowtopia",
      script: "npm",
      args: "run cowtopia",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 201,
        API_URL: API_URL,
      },
    },
    {
      name: "blum",
      script: "npm",
      args: "run blum",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 202,
        API_URL: API_URL,
      },
    },
    {
      name: "nomis",
      script: "npm",
      args: "run nomis",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 203,
        API_URL: API_URL,
      },
    },
    {
      name: "piggy",
      script: "npm",
      args: "run piggy",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 204,
        API_URL: API_URL,
      },
    },
    {
      name: "banana",
      script: "npm",
      args: "run banana",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 205,
        API_URL: API_URL,
      },
    },
    {
      name: "gumart",
      script: "npm",
      args: "run gumart",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 206,
        API_URL: API_URL,
      },
    },
    {
      name: "tabizoo",
      script: "npm",
      args: "run tabizoo",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 207,
        API_URL: API_URL,
      },
    },
    {
      name: "popp",
      script: "npm",
      args: "run popp",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 208,
        API_URL: API_URL,
      },
    },
  ],
};

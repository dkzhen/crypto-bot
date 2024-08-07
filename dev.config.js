const API_URL = "https://telegram-api.zhen.lat";
module.exports = {
  apps: [
    {
      name: "singsing",
      script: "npm",
      args: "singsing",
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
      args: "cowtopia",
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
      args: "blum",
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
      args: "nomis",
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
      args: "piggy",
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
      args: "banana",
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
      args: "gumart",
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
      args: "tabizoo",
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
      args: "popp",
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

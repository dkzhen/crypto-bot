const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.dailyMission = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const checkTask = await axios.get(
        "https://major.bot/api/tasks/?is_daily=true",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const tasks = checkTask.data.filter((task) => !task.is_completed);

      if (tasks.length < 1) {
        console.log(`[ BOT ] : All task completed`);
      }

      for (const task of tasks) {
        console.log(`[ BOT ] : Start ${task.id} task ${task.title}`);

        const taskexecution = await axios.post(
          "https://major.bot/api/tasks/",
          { task_id: task.id },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        if (taskexecution.data.is_completed) {
          console.log(`[ Running ] : Complete ${task.id} task ${task.title}`);
        } else {
          console.log(`[ Error ] : Error ${task.id} task ${task.title}`);
        }
        await delay(2000);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

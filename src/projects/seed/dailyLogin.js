const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.Login = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const login = await axios.post(
        "https://elb.seeddao.org/api/v1/login-bonuses",
        {},
        {
          headers: {
            "telegram-data": `${token.token}`,
          },
        }
      );
      console.log(
        `[ Running ] : Login successfully Day: ${login.data.data.no}. Amount : ${login.data.data.amount}`
      );
    }
  } catch (error) {
    console.log(
      `[ Error ] : Login failed. Response code : ${error.response.status}. Message : ${error.response.data.message}`
    );
  }
};

exports.streakReward = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const checkStreak = await axios.get(
        "https://elb.seeddao.org/api/v1/streak-reward",
        {
          headers: {
            "telegram-data": `${token.token}`,
          },
        }
      );
      const rewards = checkStreak.data.data;

      if (rewards.length > 0) {
        const streak_reward_ids = rewards.map((item) => item.id);
        const claimStreak = await axios.post(
          "https://elb.seeddao.org/api/v1/streak-reward",
          {
            streak_reward_ids: streak_reward_ids,
          },
          {
            headers: {
              "telegram-data": `${token.token}`,
            },
          }
        );
        console.log(
          `[ Running ] : claim streak reward successfully. RewardId: ${claimStreak.data.data.length}.`
        );
      } else {
        console.log(`[ Completed ] : no streak reward`);
      }
    }
  } catch (error) {
    console.log(
      `[ Error ] : streakReward failed. Response code : ${error.response.status}. Message : ${error.response.data.message}`
    );
  }
};
exports.spinTicket = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const checkTiket = await axios.get(
        "https://elb.seeddao.org/api/v1/spin-ticket",
        {
          headers: {
            "telegram-data": `${token.token}`,
          },
        }
      );
      const tikets = checkTiket.data.data;

      if (tikets.length > 0) {
        for (const tiket of tikets) {
          const spinReward = await axios.post(
            "https://elb.seeddao.org/api/v1/spin-reward",
            {
              ticket_id: tiket.id,
            },
            {
              headers: {
                "telegram-data": `${token.token}`,
              },
            }
          );
          console.log(
            `[ Running ] : claim spin reward successfully. TicketId: ${spinReward.data.data.id}. Type: ${spinReward.data.data.type}`
          );
        }
      } else {
        console.log(`[ Completed ] : no Ticket Spin`);
      }
    }
  } catch (error) {
    console.log(
      `[ Error ] : spin Ticket failed. Response code : ${error.response.status}. Message : ${error.response.data.message}`
    );
  }
};

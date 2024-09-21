const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.catchEgg = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const checkEgg = await axios.get(
        "https://elb.seeddao.org/api/v1/egg/me?page=1",

        {
          headers: {
            "telegram-data": `${token.token}`,
          },
        }
      );

      const items = checkEgg.data.data.items;
      if (items.length > 0) {
        for (const item of items) {
          const catchEgg = await axios.post(
            "https://elb.seeddao.org/api/v1/egg-hatch/complete",
            { egg_id: item.id },
            {
              headers: {
                "telegram-data": `${token.token}`,
              },
            }
          );

          console.log(
            `[ Running ] : Catch egg successfully. EggId: ${catchEgg.data.data.id}. type: ${catchEgg.data.data.type}`
          );
        }
      } else {
        console.log(`[ Completed ] : No eggs found`);
      }
    }
  } catch (error) {
    console.log(
      `[ Error ] : catch egg failed. Response code : ${error.response.status}. Message : ${error.response.data.message}`
    );
  }
};

const dotenv = require("dotenv");
const fs = require("fs").promises;
const axios = require("axios");
const { getTokenAuth } = require("./getToken");
const { getMission, getProfile } = require("./repo");
const { validateToken } = require("./checkValidation");
dotenv.config();

const CLAIM_API_URL = "https://miniapp-api.singsing.net/mission/check";

exports.claimMission = async function () {
  try {
    const tokens = await validateToken();

    if (tokens.length > 0) {
      for (const token of tokens) {
        try {
          const missions = await getMission(token.token);
          const profile = await getProfile(token.token);
          console.log(
            `| Profile => Username : ${profile.username}\n|            Bonus_amount : ${profile.bonus_vault_amount}\n|            FirstName : ${profile.first_name}\n|            LastName : ${profile.last_name}\n|            Balance : ${profile.onchain_data.balance}\n-----------------------------------`
          );

          // Loop through each mission and make API requests
          for (const mission of missions) {
            if (!mission.completed) {
              try {
                const BODY_DATA = {
                  mission_key: mission.key,
                };

                const claimResponse = await axios.post(
                  CLAIM_API_URL,
                  BODY_DATA,
                  {
                    headers: {
                      Authorization: `Bearer ${token.token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                console.log(
                  `[ Running   ] : Claimed ${mission.key} successfully. Response status: ${claimResponse.status} `
                );
              } catch (error) {
                console.error(`[ Error ] : Claim ${mission.key} failed`);
              }
            } else {
              console.log(`[ Completed ] : ${mission.key} completed`);
            }
          }
          console.log(`\n[ BOT ] : Task complete please wait 1 hour...\n`);
        } catch (error) {
          console.error(`[ Error ] : Error fetching missions `);
        }
      }
    } else {
      console.log(`[ Error ] : No token found`);
    }
    // Loop through each token and make a GET request
  } catch (error) {
    console.log(`[ Error ] : mission cant claim because token not valid `);
  }
};

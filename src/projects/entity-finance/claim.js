const { default: axios } = require("axios");
const randomstring = require("randomstring");
function generateRandomUsername(length = 8) {
  // Generate a random string of letters
  const letters = randomstring.generate({
    length: length - 3,
    charset: "alphabetic",
  });

  // Generate a random number
  const number = randomstring.generate({
    length: 3,
    charset: "numeric",
  });

  // Combine letters and number to create a username
  return letters + number;
}
exports.claim = async (email) => {
  try {
    let accessToken;
    try {
      const body = {
        email: email,
        password: "Bandulan113",
      };
      const token = await axios.post(
        "https://api-spacerace.entity.global:4001/auth/login",
        body
      );
      accessToken = token.data.accessToken;
    } catch (error) {
      console.log("error on login");
    }

    try {
      const watch = await axios.put(
        "https://api-spacerace.entity.global:4001/users/watch-intro",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(watch.data);
    } catch (error) {
      console.log("error on watch");
    }
    try {
      const username = await axios.put(
        "https://api-spacerace.entity.global:4001/users/username",
        { username: generateRandomUsername() },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(username.data);
    } catch (error) {
      console.log("error on username");
    }
    try {
      const news = await axios.put(
        "https://api-spacerace.entity.global:4001/users/newsletter-subscribe",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(news.data);
    } catch (error) {
      console.log("error on news");
    }
    try {
      const mission = await axios.put(
        "https://api-spacerace.entity.global:4001/users/missions/provide-answers",
        { missionId: 3, questions: [{ questionId: 1, pickedAnswersIds: [2] }] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(mission.data);
    } catch (error) {
      console.log("error on mission");
    }
    console.log("All task completed");
  } catch (error) {
    console.log("error on claim");
  }
};

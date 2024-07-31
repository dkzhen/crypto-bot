const { default: axios } = require("axios");

const getTokenFromBot = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data.data;
  } catch (error) {
    throw new Error(null);
  }
};

function filterJWTObjects(objects) {
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return objects.filter(
    (obj) =>
      jwtPattern.test(obj.token) &&
      obj.telegramId &&
      obj.token &&
      obj.token !== "0" &&
      obj.telegramId !== 0
  );
}

const fetchJWTTokens = async (url) => {
  try {
    const [tokens] = await getTokenFromBot(url);
    return filterJWTObjects(tokens);
  } catch (error) {
    return null;
  }
};

module.exports = { getTokenFromBot, fetchJWTTokens };

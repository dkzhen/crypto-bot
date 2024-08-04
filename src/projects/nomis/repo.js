const { default: axios } = require("axios");
const querystring = require("querystring");
exports.getProfile = async (token, userId) => {
  try {
    const API_URL =
      "https://cms-tg.nomis.cc/api/ton-twa-users/farm-data?user_id=" + userId;
    const profile = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return profile.data;
  } catch (error) {
    throw error.response.status;
  }
};

exports.getUserId = async (token) => {
  try {
    const API_URL = "https://cms-tg.nomis.cc/api/ton-twa-users/auth";
    const userId = await axios.post(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userId.data;
  } catch (error) {
    throw error.response.status;
  }
};

exports.ExtractQuery = async (query) => {
  if (!query) return;
  const parsedQuery = querystring.parse(query);
  // Decode the user JSON string
  const user = JSON.parse(decodeURIComponent(parsedQuery.user));
  // Extract the username and userId
  const username = user.username;
  const userId = user.id;
  return { username, userId };
};

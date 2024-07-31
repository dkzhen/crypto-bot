const { default: axios } = require("axios");

exports.getMission = async (token) => {
  const API_URL = "https://miniapp-api.singsing.net/mission?type=bonus_vault";
  try {
    const res = await axios.get(
      API_URL,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    throw error.response.status;
  }
};

exports.getProfile = async (token) => {
  const API_URL = "https://miniapp-api.singsing.net/user/profile?";
  try {
    const res = await axios.get(
      API_URL,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    throw error.response.status;
  }
};

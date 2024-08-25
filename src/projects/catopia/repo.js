const { default: axios } = require("axios");

exports.getUserInfo = async (token) => {
  try {
    const userInfo = await axios.get(
      "https://api.catopia.io/api/v1/user-collection?limit=3000",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return userInfo.data.data;
  } catch (error) {
    return null;
  }
};

exports.getLand = async (token) => {
  try {
    const land = await axios.get(
      "https://api.catopia.io/api/v1/players/land?limit=3000",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return land.data.data;
  } catch (error) {
    return null;
  }
};

exports.getPlantInfo = async (token) => {
  try {
    const plantInfo = await axios.get(
      "https://api.catopia.io/api/v1/players/plant?limit=3000",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return plantInfo.data.data;
  } catch (error) {
    return null;
  }
};

exports.harvestPlant = async (token) => {
  try {
    const harvest = await axios.post(
      "https://api.catopia.io/api/v1/players/plant/harvestAll",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return harvest.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

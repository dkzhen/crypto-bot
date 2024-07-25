const axios = require("axios");
const getAccount = require("../../utils/mail");
const { refferalCode } = require("../../configs/constant");

const register = async (email) => {
  const reff = refferalCode;
  try {
    const opts = {
      acceptGDPR: true,
      email: email,
      joinReferralCode: reff,
      password: "Bandulan113",
      passwordConfirmation: "Bandulan113",
    };
    const res = await axios.post(
      "https://api-spacerace.entity.global:4001/auth/register",
      opts
    );
    const data = res.data;
    console.log("Register successfull \n", {
      id: data.id,
      email: data.email,
      referralCode: data.joinReferralCode,
    });
  } catch (error) {
    console.log("ERROR on register");
  }
};

module.exports = register;

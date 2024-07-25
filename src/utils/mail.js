const MailJs = require("@cemalgnlts/mailjs");
const { default: axios } = require("axios");
const mail = new MailJs();

const getAccount = async () => {
  try {
    const account = await mail.createOneAccount();

    if (!account.status) {
      console.log("error creating account", account.status);
      return;
    }
    return account.data;
  } catch (error) {
    console.log(error);
  }
};

const getMessage = async (token) => {
  const data = await axios.get("https://api.mail.tm/messages?page=1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data["hydra:member"];
};
const getMessageById = async (id, token) => {
  const data = await axios.get(`https://api.mail.tm/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

const login = async (user, pw) => {
  const account = await mail.login(user, pw);
  return account.data.token;
};

module.exports = { getAccount, getMessage, login, getMessageById };

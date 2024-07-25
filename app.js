const { default: axios } = require("axios");
const register = require("./src/projects/entity-finance/register");
const {
  getAccount,
  getMessage,
  login,
  getMessageById,
} = require("./src/utils/mail");
const { claim } = require("./src/projects/entity-finance/claim");
const { countLoopEntity } = require("./src/configs/constant");

function extractVerificationLink(content) {
  const regex =
    /https:\/\/spacerace\.entity\.global\/email-verification\/[a-zA-Z0-9]+/;
  const match = content.match(regex);
  return match ? match[0] : null;
}

async function delayedExecution(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds || 3000));
  console.log("Delayed execution after 3 seconds");
}
async function getEmail() {
  const account = await getAccount();
  console.log(account);
  await register(account.username);
  const token = await login(account.username, account.password);
  await delayedExecution();
  const message = await getMessage(token);
  const [messageId] = message;
  const text = await getMessageById(messageId.id, token);
  await delayedExecution();
  const verificationLink = extractVerificationLink(text.text);
  console.log("Verification Link:", verificationLink);

  const { chromium } = require("playwright");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(verificationLink);
  // Wait for content that requires JavaScript
  await page.waitForSelector("button.continueBtn");
  await page.content();
  console.log("verification email successfull");

  await browser.close();

  await delayedExecution(5000);
  await claim(account.username);
}

async function fetchEmails() {
  let count = 0;
  while (count < countLoopEntity) {
    await getEmail();
    await delayedExecution(3000);
    count++;
  }
}

fetchEmails();

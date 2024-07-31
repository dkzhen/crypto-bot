const readline = require("readline");
const express = require("express");
const runningEntity = require("./src/projects/entity-finance/running");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk menampilkan pesan dan menerima input dari pengguna
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Fungsi untuk membuat aplikasi Express pada port tertentu
function startExpressApp(port) {
  const app = express();

  app.get("/", (req, res) => {
    res.send(`Hello, you are on port ${port}`);
  });

  app.listen(port, () => {
    console.log(`Express app is running on port ${port}`);
  });
}

// Fungsi utama
async function main() {
  console.log("Welcome on bot select your options!");

  let choice = await askQuestion(
    "Select your options: \n1. Jalankan pada port 3000\n2. Jalankan pada port 4000\n3. Jalankan pada port 5000\n4. Bot Entity Space\nEnter your choice [1,2,3,4]: "
  );

  switch (choice) {
    case "1":
      startExpressApp(3000);
      break;
    case "2":
      startExpressApp(4000);
      break;
    case "3":
      startExpressApp(5000);
      break;
    case "4":
      runningEntity();
      break;
    default:
      console.log("Invalid choice");
      rl.close();
      return;
  }

  rl.close();
}

main();

const fs = require("fs");
const readline = require("readline");
const path = require("path");

const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Hello! Please enter text");
rl.prompt();

rl.on("line", (line) => {
  switch (line.trim().toLowerCase()) {
    case "exit":
      console.log("Good luck!");
      process.exit(0);
    default:
      writeStream.write(line + "\n");
      rl.prompt();
      break;
  }
}).on("close", () => {
  console.log("Good luck!");
  process.exit(0);
});

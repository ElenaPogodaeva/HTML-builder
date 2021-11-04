const fs = require("fs");
const readline = require("readline");
const path = require("path");

const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"), {
  flags: "a",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
 //  prompt: "Hello! Please enter text",
  //  crlfDelay: Infinity
});

console.log("Hello! Please enter text");

//rl.prompt();
//const output = fs.createWriteStream('data.md');
rl.on("line", (line) => {
  switch (line.trim().toLowerCase()) {
    case "exit":
      console.log("Goodbye!");
      process.exit(0);

    default:
      writeStream.write(line + "\n");
      break;
  }
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});

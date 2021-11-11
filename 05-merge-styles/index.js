const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const srcDir = path.join(__dirname, "styles");
const destDir = path.join(__dirname, "project-dist");

async function mergeStyles(src, dest) {
  const styleFile = path.join(dest, "bundle.css");

  fs.writeFile(styleFile, "", (error) => {
    if (error) return console.error(error.message);
  });
  try {
    const files = await fsp.readdir(src, { withFileTypes: true });
    for (const item of files) {
      if (item.isFile() && path.extname(item.name) === ".css") {
        const filePath = path.join(src, item.name);
        const data = await readFile(filePath);

        await fsp.writeFile(styleFile, data, { flag: "a" });
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function readFile(srcFile) {
  const stream = fs.createReadStream(srcFile, "utf-8");
  const result = [];
  for await (const partData of stream) {
    result.push(partData);
  }
  return result.toString();
}

mergeStyles(srcDir, destDir);

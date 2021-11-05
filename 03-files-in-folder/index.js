const fs = require("fs").promises;
const path = require("path");

const BYTES_PER_MB = 1024 ** 2;

async function readDir() {
  try {
    
    const files = await fs.readdir(path.join(__dirname, "secret-folder"), {withFileTypes: true});
    for (const item of files) {
      if (item.isFile()) {
        const curPath = path.join(__dirname, "secret-folder", item.name);
        const name = item.name;
        const ext = path.extname(item.name).replace('.', '');

        const fileStats = await fs.stat(curPath);
        const size = fileStats.size;// / 1024;
       
        console.log(`${name} - ${ext} - ${size}b`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
readDir();

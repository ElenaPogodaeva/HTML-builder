const fs = require('fs').promises;
const path = require('path');

const srcPath = path.join(__dirname, 'secret-folder');

async function readDir(src) {
  try {
    const files = await fs.readdir(src, {withFileTypes: true});
    for (const item of files) {
      if (item.isFile()) {
        const curPath = path.join(src, item.name);
        const name = path.parse(curPath).name; 
        const ext = path.extname(item.name).replace('.', '');

        const fileStats = await fs.stat(curPath);
        const size = fileStats.size;
       
        console.log(`${name} - ${ext} - ${size}b`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
readDir(srcPath);

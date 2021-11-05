const fs = require('fs').promises;
const path = require('path');

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src, {withFileTypes: true});
    for (const item of files) {
      if (item.isFile()) {
        const srcPath = path.join(src, item.name);
        const destPath =  path.join(dest, item.name);
        await fs.copyFile(srcPath , destPath);
      }
    }
  } catch (err) {
    throw err;
  }
}
copyDir(src, dest);

const fs = require('fs').promises;
const path = require('path');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  try {
    await fs.rm(dest, {recursive: true, force: true});
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src, {withFileTypes: true});
    for (const item of files) {
      const srcPath = path.join(src, item.name);
      const destPath =  path.join(dest, item.name);
      if (item.isDirectory()) {
        await copyDir(srcPath, destPath);
      }
      else {
        await fs.copyFile(srcPath , destPath);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
copyDir(srcDir, destDir);

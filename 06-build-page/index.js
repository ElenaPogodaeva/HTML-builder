const fs = require("fs").promises;
const path = require("path");

const templateFile = path.join(__dirname, "template.html");
const stylesPath = path.join(__dirname, "styles");
const distPath = path.join(__dirname, "project-dist");
const compPath = path.join(__dirname, "components");

async function createHtml() {
  try {
    let templateData = await fs.readFile(templateFile, "utf-8");

    const re = /{{\s*\w+\s*}}/g;
    const tags = templateData.match(re);
    const filenames = tags.map((el) => el.slice(2, -2).trim());
    
    for (let i = 0; i < tags.length; i++) {
      const compFile = path.join(compPath, filenames[i] + ".html");
      const compData = await fs.readFile(compFile, "utf-8");
      templateData = templateData.replace(tags[i], compData);
    }

    await fs.mkdir(distPath, { recursive: true });
    await fs.writeFile(path.join(distPath, "index.html"), templateData);
  } catch (err) {
    console.error(err.message);
  }
}

async function mergeStyles(src, dest) {
  const styleFile = path.join(dest, "style.css");
  fs.writeFile(styleFile, "", (error) => {
    if (error) return console.error(error.message);
  });

  try {
    const files = await fs.readdir(src, { withFileTypes: true });
    for (const item of files) {
      if (item.isFile() && path.extname(item.name) === ".css") {
        const data = await fs.readFile(path.join(src, item.name), "utf-8");

        await fs.writeFile(styleFile, data, { flag: "a" });
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function copyDir(src, dest) {
  try {
    await fs.rm(dest, {recursive: true, force: true});
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src, { withFileTypes: true });
    for (const item of files) {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      if (item.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function buildPage() {
  try {
    await createHtml();
    await mergeStyles(stylesPath, distPath);
    const srcDir = path.join(__dirname, "assets");
    const destDir = path.join(distPath, "assets");
    await copyDir(srcDir, destDir);
  } catch (err) {
    console.error(err.message);
  }
}

buildPage();

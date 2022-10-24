const fs = require("fs-extra");

console.log('start init');

const makeDirs = ['../content', '../content/data', '../content/images', '../content/markdown', '../content/markdown/en']

ifExistThenCreate(0)
    .then(ifExistThenCreate)
    .then(ifExistThenCreate)
    .then(ifExistThenCreate)
    .then(ifExistThenCreate)
    .then(copyInitFiles)






function ifExistThenCreate(index) {
  return new Promise((resolve, reject) => {

    if (fs.existsSync(makeDirs[index])) {
      console.log('Directory exists!');
      resolve(index+1);
    } else {
        fs.mkdirSync(makeDirs[index]);
        resolve(index+1);
    }
  });
}

function copyInitFiles() {
  copyFiles('app/init_files/config_init.json', '../ssg_config.json')
  copyFiles('app/init_files/00_00_home.md', '../content/markdown/en/00_00_home.md')
  copyFiles('app/init_files/01_00_example.md', '../content/markdown/en/01_00_example.md')
  copyFiles('app/init_files/example_image.png', '../content/images/example_image.png')
}


function copyFiles(source, destination) {
  fs.copyFile(source, destination, (err) => {
    if (err) throw err;
  });
}

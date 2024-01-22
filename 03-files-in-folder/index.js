const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const dirSecret = path.resolve(__dirname, 'secret-folder');

const sizes = async (arr) => {
  let arr2 = [];
  arr.forEach(file => {
    return new Promise((resolve, rejects) => fs.stat(path.join(dirSecret, file), (err, stats) => {
      if (err) {
        return rejects(err.message);
      }
      
      arr2 = path.basename(file).split('.')[0]+' - '+path.extname(file).slice(1)+' - '+stats.size+'b';

      console.log(arr2);
      resolve(arr2);
    }))
  })
}

const allFileInDir = async (link) => {
  let arr = [];
  return new Promise((resolve, rejects) => fs.readdir(link, {withFileTypes: true}, (err, files) => {
    if (err) {
      return rejects(err.message);
    }
    files.forEach(data => {
      if (data.isFile()) {
        arr.push(data.name);
      }
    })
    resolve(arr);
  }))
}


allFileInDir(dirSecret)
  .then((arr) => sizes(arr))
  .catch(err => console.log(err));

const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const filesSrc = path.join(__dirname, 'files');



const createDir = async (path) => {
  return new Promise((resolve, rejects) => fs.mkdir(path, {recursive: true}, (err) => {
    if (err) {
      return rejects(err.message);
    }
    resolve(path)
  }))
}

const allFileInDir = async (link) => {
  let arr = [];
  return new Promise((resolve, rejects) => fs.readdir(link, (err, files) => {
    if (err) {
      return rejects(err.message);
    }
    files.forEach(data => {

      arr.push(data);

    })
    resolve(arr);
  }))
}


const copyFiles = async (files) => {
  files.forEach(file => {
    return new Promise((resolve, rejects) => fs.copyFile(path.join(filesSrc, file), path.join(__dirname, 'files-copy', file), (err) => {
      if(err) {
        return rejects(err.message);
      }
    }))
  })

}




createDir(path.join(__dirname, 'files-copy'))
        .then(() => allFileInDir(path.join(__dirname, 'files')))
        .then((arr) => copyFiles(arr))
        .catch(err => console.log(err))
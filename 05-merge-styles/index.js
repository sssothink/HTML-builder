const fs = require('fs');
const path = require('path');

const dirStyles = path.join(__dirname, 'styles');




const createFile = async (path) => {
  return new Promise((resolve, rejects) => fs.writeFile(path, '', (err) => {
    if (err) {
      return rejects(err.message);
    }
    resolve(path)
  }))
}

createFile(path.join(dirStyles, '..', 'project-dist', 'bundle.css'))


const appendFile = async (txt) => {
  return new Promise((resolve, rejects) => fs.appendFile(path.join(dirStyles, '..', 'project-dist', 'bundle.css'), txt, (err) => {
    if (err) {
      return rejects(err.message);
    }
    resolve(path)
  }))
}

const allFileCssInDir = async (link) => {
  let arr = [];
  return new Promise((resolve, rejects) => fs.readdir(link, {withFileTypes: true}, (err, files) => {
    if (err) {
      return rejects(err.message);
    }
    files.forEach(data => {
      if (data.isFile()) {
        if (path.extname(data.name) === '.css') {
          arr.push(data.name);
        }
      }
    })
    resolve(arr);
  }))
}


const read = async (arr) => {
  arr.forEach(file => {
    return new Promise((resolve, rejects) => fs.readFile(path.join(dirStyles, file), {encoding: 'utf-8'}, (err, data) => {
      if(err) {
        return rejects(err.message);
      }
      appendFile(data+'\n')
      resolve()
    }))
  })
}

allFileCssInDir(dirStyles)
.then((arr) => read(arr))
.catch(err => console.log(err))
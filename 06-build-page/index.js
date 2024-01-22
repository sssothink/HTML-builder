const { rejects } = require('assert');
const { dir } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');





const createDir = async (path) => {
  return new Promise((resolve, rejects) => fs.mkdir(path, {recursive: true}, (err) => {
    if (err) {
      return rejects(err.message);
    }
    resolve()
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
    console.log(arr)
    resolve(arr);
  }))
}


const copyFiles = async (files, dr) => {
  files.forEach(file => {
    return new Promise((resolve, rejects) => fs.copyFile(path.join(__dirname, 'assets', dr, file), path.join(__dirname, 'project-dist', 'assets', dr, file), (err) => {
      if(err) {
        return rejects(err.message);
      }
      resolve();
    }))
  })

}
console.log(path.join(__dirname, 'assets', 'fonts'))

createDir(path.join(__dirname, 'project-dist'));
createDir(path.join(__dirname, 'project-dist', 'assets'));

createDir(path.join(__dirname, 'project-dist', 'assets', 'fonts'))
.then(() => allFileInDir(path.join(__dirname, 'assets', 'fonts')))
.then((arr) => copyFiles(arr, 'fonts'))
.catch(err=>console.log(err))

createDir(path.join(__dirname, 'project-dist', 'assets', 'img'))
.then(() => allFileInDir(path.join(__dirname, 'assets', 'img')))
.then((arr) => copyFiles(arr, 'img'))
.catch(err=>console.log(err))

createDir(path.join(__dirname, 'project-dist', 'assets', 'svg'))
.then(() => allFileInDir(path.join(__dirname, 'assets', 'svg')))
.then((arr) => copyFiles(arr, 'svg'))
.catch(err=>console.log(err))


const createFile = async (path) => {
  return new Promise((resolve, rejects) => fs.writeFile(path, '', (err) => {
    if (err) {
      return rejects(err.message);
    }
    resolve(path)
  }))
}

createFile(path.join(__dirname, 'project-dist', 'index.html'));
createFile(path.join(__dirname, 'project-dist', 'style.css'));


let newHtml;
let header  = '';
let articles = '';
let footer = '';


const readSave = (pathFile, file) => {
  return new Promise((resolve, rejects) => fs.readFile(pathFile, 'utf8', (err, data) => {
    if (err) {
      return rejects(err.message);
    }
    if (file == header) {
      header = data;
    } else if (file == articles) {
      articles = data
    } else if (file == footer) {
      footer = data
    }
    resolve();
  })) 
}

const replaceTag = async (str) => {
  return new Promise((resolve, rejects) => fs.readFile(str, 'utf8', (err, data) => {
    if (err) {
      return rejects(err.message);
    }
    newHtml = data.replace('{{header}}', header).replace('{{articles}}', articles).replace('{{footer}}', footer)
    resolve(newHtml);
  }))
}


const writeIndex = async (pathFile, str) => {
  return new Promise((resolve, rejects) => fs.writeFile(pathFile, str, (err) => {
    if(err) {
      return rejects(err.message)
    }
    resolve()
  }))
}






const appendFile = async (txt) => {
  return new Promise((resolve, rejects) => fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), txt, (err) => {
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
    return new Promise((resolve, rejects) => fs.readFile(path.join(__dirname, 'styles', file), {encoding: 'utf-8'}, (err, data) => {
      if(err) {
        return rejects(err.message);
      }
      appendFile(data+'\n')
      resolve()
    }))
  })
}

readSave(path.join(__dirname, 'components', 'header.html'), header)
.then(() => readSave(path.join(__dirname, 'components', 'articles.html'), articles))
.then(() => readSave(path.join(__dirname, 'components', 'footer.html'), footer))
.then(() => replaceTag(path.join(__dirname, 'template.html')))
.then((newHtml) => writeIndex(path.join(__dirname, 'project-dist', 'index.html'), newHtml))
.then(() => allFileCssInDir(path.join(__dirname, 'styles')))
.then((arr) => read(arr))
.catch(err => console.log(err))
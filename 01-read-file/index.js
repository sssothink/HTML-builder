const path = require('path');
const fs = require('fs');
// const { rejects } = require('assert');

const fullPath = path.join(__dirname, 'text.txt');
const { stdout } = process;
// const splitUp = path.sep;
// console.log(path.resolve(__dirname, 'text.txt'));

// console.log(path.parse(fullPath));
// console.log('---------------------------------')
// console.log('Разделитель в ОС:' + splitUp);
// console.log('---------------------------------')

// const readFileAsync = async (path) => {
//   return new Promise((resolve, rejects) => fs.readFile(path, {encoding: 'utf-8'}), (err, data) => {
//     if (err) {
//       return rejects(err.message)
//     };
//     console.log(resolve(data));
//   })
// }


// const read = async (path) => {
//   return new Promise((resolve) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
//     resolve(data)
//   }))
// }
// read(path.resolve(__dirname, 'text.txt')).then((data) => {
//   console.log(data);
// })










// ТАК МОЖНО? ДВА РЕШЕНИЯ ВЕРНЫ?



// 1   000000000000000000000000000000000000

// fs.readFile(fullPath, {encoding: 'utf-8'}, (err, data) => {
//   if (err) {
//     return rejects(err.message)
//   };
//   console.log(data);
// })







// 2   000000000000000000000000000000000000

const readFile = fs.createReadStream(fullPath, 'utf-8');
readFile.on('data', chunk => stdout.write(chunk));
readFile.on('error', err => console.log(err.message));
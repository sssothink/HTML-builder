const fs = require('fs');
const path = require('path');


const writeFA = async (path, data) => {
  return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
    if (err) {
      return reject(err.message)
    }
    resolve()
  }))    
}

const appendFA = async (path, data) => {
  return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
    if (err) {
      return reject(err.message)
    }
    resolve()
  }))    
}





const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
writeFA(path.resolve(__dirname, 'text.txt'), '')
rl.question('-----Under what nickname to log in?\n\n', (answer) => {

  writeFA(path.resolve(__dirname, 'text.txt'), answer)
  // rl.on('SIGINT', () => {
  //     console.log('-----Exit completed-----')
  //     rl.close()
  // })
  if (answer.trim() === 'exit') {
    console.log('-----Exit completed-----');
    rl.close();
  } else {
      
    rl.setPrompt("-----You can complete the message or exit by typing 'exit'\n\n")
    rl.prompt();

    rl.on('line', (answer) => {
      appendFA(path.resolve(__dirname, 'text.txt'), '')
      .then(() => appendFA(path.resolve(__dirname, 'text.txt'), `${answer}\n`))
      if (answer.trim() == 'exit') {
        console.log('-----Exit completed-----')
        rl.close();
      }
    })

    rl.on('SIGINT', () => {
      console.log('-----Exit completed-----')
      rl.close()
    })
  }

});
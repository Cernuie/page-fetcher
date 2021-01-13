args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
let url = args[0];
let filePath = args[1];

const req = (url,filePath) => {
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      console.error(err)
      return console.log("File does not exist");
    }
  
  request(url, (error, response, body) => {
  fs.writeFile(filePath, body, 'utf8', (err) => {
    if(err){
      throw err;
    } else{
      fs.stat(filePath, (err, stats) => {
        if (err) {
          throw err;
        } else {
          console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
        }
      })
    }
  })
  })
})
}

req(url,filePath);
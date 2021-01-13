let args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
let url = args[0];
let filePath = args[1];

const req = (url,filePath) => {
  //uses fs access to check if file exists
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return console.log("File does not exist");
    } else {
      //if it does then it'll write to it using request
      request(url, (error, response, body) => {
        //checks if request returns an error
        if (error) {
          console.log("We got an error! Please try again.");
        }
        // and if status code isn't equal to 200
        if (response.statusCode !== 200) {
          console.log(`status code: ${response} ${response.statusCode}, something is wrong, try again!`);
        }
        // then writes the file to the specified file
        fs.writeFile(filePath, body, 'utf8', (err) => {
          if (err) {
            throw err;
          } else {
            //uses fs stat to find the file size.
            fs.stat(filePath, (err, stats) => {
              if (err) {
                throw err;
              } else {
                console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
              }
            });
          }
        });
      });
    }
  });
};

req(url,filePath);
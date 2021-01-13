args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
let url = args[0]

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  fs.writeFile('./index.html', body, 'utf8', (err) => {
    if(err){
      console.log(err.message);
    } else{
      console.log('data written');
    }
  })
});
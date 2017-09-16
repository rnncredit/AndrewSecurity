const express = require('express');
var app = express();
const port = process.env.PORT || 3000;

//For Heroku app deployement, it will by default will assign port number to the
// environment variable process.env.PORT

//Remove the process.env.PORT env variable from config.js  for heroku deployment

app.listen(port, ()=>{
    
          console.log('Server started at port number ', port);
    } );

 module.exports={app};   
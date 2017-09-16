const express = require('express');
var app = express();
const port = process.env.PORT;

app.listen(port, ()=>{
    
          console.log('Server started at port number ', port);
    } );

 module.exports={app};   
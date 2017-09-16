//Read all required files

require('./server/config/config');

var {app} = require('./server/config/express');
var {mongoose} = require('./server/config/mongoose');
const _ = require('lodash');
const bodyParser = require('body-parser');

//Get the controller module 
var {authenticate}= require('./server/controllers/authenticate/authenticate');


//use middleware bodyparser to parse request body
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    
 res.send('Hello Home');
});

var {User} = require('./server/models/user');
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();

    }).then( (token)=>{
          res.header('x-auth',token).send(user);
    } ).catch((e)=>{
          res.status(400).send(e);
    });

  });

  //private route and making use of controller authenticate
  app.get('/users/me', authenticate,(req,res)=>{
       res.send(req.user);
  });

module.exports = {app};


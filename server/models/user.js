const mongoose = require('mongoose');
const validator = require('validator');

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt= require('bcryptjs'); //used for hashing passwords

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            /* validator: (value)=>{
                return validator.isEmail(value);
            }, */
            //The other way of invoking validator
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    //mongoose has the syntax of supporting arrays in documents
    tokens:[{
        token:{
            type:String,
            required:true
        },
        access:{
            type:String,
            required:true
        }
    }]
});

/* Before we save user document, we check whether user password is modified
   if modiified we generate hash of the password and save it to the database
    
    For this, we use mongoose middleware 
    Mongoose has got pre middleware, which we can use to invoke middleware before any 
    event.

    next to be passed otherwise middleware will never continue and will crash.

*/

UserSchema.pre('save', function (next){

        var user=this;  //Do not use Arrow function inorder to get access to this 

        if(user.isModified('password')){

                bcrypt.genSalt(10).then( salt=>{
                       return bcrypt.hash(user.password,salt);
                }).then(hashString =>{
                        user.password= hashString;
                        next();
                }).catch( err=>{
                    console.log('Error while hasing password: ' + err);
                });

        }else{
            next();
        }
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
   // how json object is passed as result.. TODO 
    return _.pick(userObject, ['_id', 'email']);
  };

  //Instance methods
UserSchema.methods.generateAuthToken= function(){
        var user=this;

        var access= 'auth';
        var token = jwt.sign({_id:user._id.toHexString(), access}, process.env.SECRET_TOKEN).toString();

        user.tokens.push({token, access});
        //Check why we are returing user.save
        return user.save().then( ()=>{
                return token;

        } );
        /* I understood that the above we are returning the promise, The caller has to resolve it then  */
}

//model methods
UserSchema.statics.findByToken= function(token){
    var User=this;
    var decoded;

    try{
        decoded= jwt.verify(token,process.env.SECRET_TOKEN);

    }catch(e){
         /* new Promise.then((resolve,reject)=>{
               reject();
         });    */

        return Promise.reject();
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token': token,
        'tokens.access':'auth'
    
    });

}

var User=mongoose.model('User',UserSchema);

module.exports={User};

const bcrypt = require('bcryptjs');

var password='NarenBombili';
var hashString=null;

bcrypt.genSalt(10).then(salt=>{
       return bcrypt.hash(password,salt);
    }
).then( (hashStr)=>{
    
    console.log('Hash String: ' + hashStr);
} )
.catch((err)=>{
    console.log('Error while generating salt ' + err);
});


var hashString ='$2a$10$glaBM2KlUWDEkb1Y2XPcY.lb9iIvp2k4IxInuKrGhrVx7DI1RypUS';

bcrypt.compare(password,hashString).then( result=>{
        console.log(result);
}).catch(err=>{
    console.log(err);
});



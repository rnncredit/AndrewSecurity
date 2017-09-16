var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect(process.env.MONGODB_URI).then(
    ()=>{
        
        console.log('Connected to the database ');
    }
).catch((err)=>{

    console.error('Error connection to datase' + err);
});

module.exports={mongoose};


//Setup server port
process.env.PORT=3000;

//Setup MongodDB URI
process.env.MONGODB_URI = 'mongodb://dbtestuser:dbtestuser@ds133044.mlab.com:33044/narenmlab';

//Secret to hash the data
process.env.SECRET_TOKEN='RnnAss13@09#2017';
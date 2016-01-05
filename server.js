var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var cors = require('cors');

var request = require('request');


//____________________My dependencies__________________________
// var usersCtrl = require('./server/controllers/usersCtrl');
// var reportsCtrl = require('./server/controllers/reportsCtrl');


// setting status of node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var Secret = require('./server/config/Secret');


// URI is always 127.0.0.1, for both server and local computer
var mongoUri = 'mongodb://127.0.0.1/kronolearn';



var app = express();

app.use(cors());


//_____________Passport middleware________________
app.use(session({secret: 'blahblah'}));


// if we use passport later
// app.use(passport.initialize());
// app.use(passport.session());
//___________________________________________________




// serving index.html file
app.use(express.static(__dirname+'/client'));









//_________________________Mongoose Connecting__________________________

mongoose.connect(mongoUri, function(err){
	if(err) console.log(err);
});

var db = mongoose.connection;

db.on('error', function(){
	console.log('error');
});

db.once('open', function(){
	console.log('MongoDB is running!');
});












//_____________Connecting to Port_________________
var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('listening to port ', port);
})
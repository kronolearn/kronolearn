var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bcryptNodejs = require('bcrypt-nodejs');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var request = require('request');


var keys = require('./server/config/Secret');
var userCtrl = require('./server/controllers/userCtrl');
var courseCtrl = require('./server/controllers/courseCtrl');
var topicCtrl = require('./server/controllers/topicCtrl');
require('./server/config/passport')(passport);

//____________________My dependencies__________________________
// var usersCtrl = require('./server/controllers/usersCtrl');
// var reportsCtrl = require('./server/controllers/reportsCtrl');


// setting status of node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var Secret = require('./server/config/Secret');


// URI is always 127.0.0.1, for both server and local computer
var mongoUri = 'mongodb://127.0.0.1/kronolearn';



var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());




//_____________Passport middleware________________
app.use(session({ secret: keys.secret }));


// if we use passport later
app.use(passport.initialize());
app.use(passport.session());
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




app.get('/api/blah', function(req, res){
    console.log('hello');
    res.send('hello');
})

// User EndPoints
app.get('/api/users', userCtrl.getUsers);
app.get('/api/user/:id', userCtrl.getById);
app.post('/api/user', userCtrl.addUser);
app.delete('/api/user/:id', userCtrl.removeUser);
app.put('/api/user/:id', userCtrl.updateUser);

// Course EndPoints
app.get('/api/courses', courseCtrl.getCourse);
app.get('/api/course/:id', courseCtrl.getById);
app.post('/api/course', courseCtrl.addCourse);
app.delete('/api/course/:id', courseCtrl.removeCourse);
app.put('/api/course/:id', courseCtrl.updateCourse);


// Topic EndPoints
app.get('/api/topics', topicCtrl.getTopic);
app.get('/api/topic/:id', topicCtrl.getById);
app.post('/api/topic', topicCtrl.addTopic);
app.delete('/api/topic/:id', topicCtrl.removeTopic);
app.put('/api/topic/:id', topicCtrl.updateTopic);



// LocalAuth
app.get('/api/auth', userCtrl.isAuth, userCtrl.auth);

app.post('/api/signup', passport.authenticate('local-signup', { failure: '/#/authTest' }),
	function (req, res) {
		res.send(req.user);
	});

app.post('/api/login', passport.authenticate('local-login', { failure: '/#/authTest' }),
	function (req, res) {
		res.send(req.user);
        // console.log(req.user);
	});



app.get('/api/logout', function (req, res) {

    console.log('logout server js');
    req.logout();
	req.session.destroy();
    console.log(req.user);
    res.send('hello');
    console.log('getting here now!!');
    // res.redirect('/#/');
    });







//_____________Connecting to Port_________________
var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('listening to port ', port);
});
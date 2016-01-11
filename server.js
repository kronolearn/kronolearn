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
var cardCtrl = require('./server/controllers/cardCtrl');
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
app.use(express.static(__dirname + '/client'));









//_________________________Mongoose Connecting__________________________

mongoose.connect(mongoUri, function (err) {
    if (err) console.log(err);
});

var db = mongoose.connection;

db.on('error', function () {
    console.log('error');
});

db.once('open', function () {
    console.log('MongoDB is running!');
});





// User EndPoints
app.get('/api/users', userCtrl.getUsers);
app.get('/api/user/:id', userCtrl.getById);
app.post('/api/user', userCtrl.addUser);
app.delete('/api/user/:id', userCtrl.removeUser);
app.put('/api/user/:id', userCtrl.updateUser);

// Course EndPoints
app.get('/api/courses', courseCtrl.getCourses);
app.get('/api/course/:id', courseCtrl.getById);
app.post('/api/course', courseCtrl.addCourse);
app.delete('/api/course/:id', courseCtrl.removeCourse);
app.put('/api/course/:id', courseCtrl.updateCourse);


// Topic EndPoints
app.get('/api/topics', topicCtrl.getTopics);
app.get('/api/topic/:id', topicCtrl.getById);
app.post('/api/topic', topicCtrl.addTopic);
app.delete('/api/topic/:id', topicCtrl.removeTopic);
app.put('/api/topic/:id', topicCtrl.updateTopic);

// Card EndPionts
app.get('/api/cards', cardCtrl.getCards);
app.get('/api/card/:id', cardCtrl.getById);
app.post('/api/card', cardCtrl.addCard);
app.delete('/api/card/:id', cardCtrl.removeCard);
app.put('/api/card/:id', cardCtrl.updateCard);


// LocalAuth, check if user is logged in (if on req.session.passport.user)
app.get('/api/auth', userCtrl.isAuth);





app.post('/api/signup', passport.authenticate('local-signup', { failure: '/#/authTest' }),
    function (req, res) {
        res.send(req.user);
    });


app.post('/api/login', passport.authenticate('local-login'),
	function (req, res) {
        // console.log("server.js" + message);
		res.send(req.user);
	});

app.get('/api/logout', function (req, res) {

    req.logout();
    // req.session.destroy();
    res.redirect('/');
    // res.send('hello');
});

// app.get('/api/checkUserLogin', function(req, res){});








//_____________Connecting to Port_________________
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('listening to port ', port);
});
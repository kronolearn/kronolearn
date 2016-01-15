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
var imageCtrl = require('./server/controllers/imageCtrl');
require('./server/config/passport')(passport);

var Random = require('./server/models/Random');

//____________________My dependencies__________________________
// var usersCtrl = require('./server/controllers/usersCtrl');
// var reportsCtrl = require('./server/controllers/reportsCtrl');


// setting status of node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var Secret = require('./server/config/Secret');


// URI is always 127.0.0.1, for both server and local computer
var mongoUri = 'mongodb://127.0.0.1/kronolearn';



var app = express();

// make node be able to handle big file sizes
app.use(bodyParser.json({limit: '50mb'}));
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

app.get('/api/userAndCourses', userCtrl.getUserAndCourses);
app.put('/api/usercard', userCtrl.updateUserCard);





// Course EndPoints
app.get('/api/courses', courseCtrl.getCourses);
app.get('/api/course/:id', courseCtrl.getById);
app.post('/api/course', imageCtrl.saveCourseImage, courseCtrl.addCourse);
app.post('/api/coursetesting', courseCtrl.addTestCourse);
app.delete('/api/course/:id', courseCtrl.removeCourse);
app.put('/api/course/:id', courseCtrl.updateCourse);

app.put('/api/enrollInCourse', userCtrl.enrollInCourse);
app.put('/api/leaveCourse', userCtrl.leaveCourse);



// Topic EndPoints
app.get('/api/topics', topicCtrl.getTopics);
app.get('/api/topic/:id', topicCtrl.getById);
app.post('/api/topic', topicCtrl.addTopic);
app.delete('/api/topic/:id', topicCtrl.removeTopic);
app.put('/api/topic/:id', topicCtrl.updateTopic);
app.post('/api/topic/material', topicCtrl.addMaterial);

// app.post('/api/course/addCourseImage', function(req, res, next){
// 	// console.log('\n req.body: ', req.body);
// 	console.log('\n\n body length is: \n', req.body.value.length );
// })






// Card EndPionts
app.get('/api/cards', cardCtrl.getCards);
app.get('/api/card/:id', cardCtrl.getById);
app.post('/api/card', cardCtrl.addCard);
app.delete('/api/card/:id', cardCtrl.removeCard);
app.put('/api/card/:id', cardCtrl.updateCard);


// LocalAuth, check if user is logged in (if on req.session.passport.user)
app.get('/api/auth', userCtrl.isAuth);

// Image upload, Amazon S3
app.post('/api/course/addimage', imageCtrl.saveCourseImage);
app.post('/api/user/addimage', imageCtrl.saveUserAvatar);
app.post('/api/topic/addimage', imageCtrl.saveTopicImage);





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


app.post('/api/initializeRandom', function(req, res){
	// res.send({hello: 'hello'});



	new Random().save(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	})



})








//_____________Connecting to Port_________________
// var port = process.env.PORT || 3000;

// making port 3000, just so that it doesn't look at process.env.PORT
var port = 3000;

app.listen(port, function () {
    console.log('listening to port ', port);
});
var LocalStrategy = require('passport-local').Strategy,
	User = require('../models/User');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(null, user);
		});
	});
	
	
	// Local Signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {

			User.findOne({ 'email': email }, function (err, user) {
				if (err)
					return done(err);
				if (user) {
                    console.log(done);
					return done(null, false);
				} else {
					var newUser = new User();
					newUser.name = req.body.name;
					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					console.log(newUser);

					newUser.save(function (err) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});

		}));


	// Local Login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {
			User.findOne({ 'email': email }, function (err, user) {
            console.log("Our user!!!!!!!!" + err);
				if (err){
                console.log('hit1');
					return done(err);};
				if (user === null) {
                console.log('hit2');
                // user.message = "Incorrect";
				// 	return done(null, user);
					return done(null, false);
                };
				if (!user.validPassword(password)){
                console.log('hit3');
					return done(null, false);
                }
				return done(null, user);
			});
                // console.log(req.body);
		}));

};	

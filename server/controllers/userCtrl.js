var User = require('../models/User');

module.exports = {

	getUserAndCourses: function(req, res){
		console.log('getting to get user andc ourses back end');
		if(req.session.passport.user){
			var userId = req.session.passport.user._id;
			User.findById(userId)
			.populate('coursesEnrolledIn')
			.populate('coursesAdminFor')
			// populate all cards-- array of card objects, and object ID is nested object card proprety
			.populate('cards.card')


			.exec(function(err, data){
				if(err){
					console.log(err);
					res.status(500).send(err);
				}
				else{
                    User.populate(data, {
                        path: 'coursesEnrolledIn.topics', 
                        model: 'Topic'
                    }, function(){
                        // res.send(data);
                        
                        User.populate(data, {
                            path: 'coursesAdminFor.topics', 
                            model: 'Topic'
                        }, function(){
                            res.send(data);
                        });
                        
                        
                        
                        
                        
                        
                    });
                    
                };
			});
                
            //    .exec(function(err, data) {
            //        if(err) {
            //            res.status(500).send(err);
            //        }
            //        else{
            //         User.populate(data, {
            //             path: 'coursesAdminFor.topics', 
            //             model: 'Topic'
            //         }, function(){
            //             res.send(data);
            //         });
            //         }
            //    }); 
                    
				

		}


	},



	
	
	getUsers: function(req, res) {
		User.find().then(function (response) {
			res.send(response);
		});
	},
	
	addUser: function(req, res) {
		new User(req.body).save(function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(data);
			}
		});
	},
	
	getById: function(req, res) {
		User.findById(req.params.id, req.body, function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	removeUser: function(req, res) {
		User.findByIdAndRemove(req.params.id, function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	updateUser: function (req, res) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
    
    updateUserCard: function (req, res) {
        var userId = req.body._id;
        var query = {_id: userId};
        User.findOneAndUpdate(query, {$push: {cards: req.body.cardObj}}, {upsert:true, new:true}, function(err, doc) {
            if (err) return res.status(500).send(err);
            else {
                return res.send(doc);
            }
        });
    },
	
	
	isAuth: function(req, res, next) {
		if(req){
			if(req.session){
				if(req.session.passport){
					if(req.session.passport.user){
						return res.send(req.session.passport.user);
					}
					return res.send('no user logged in');
				}
				else{
					return res.send('no req.session.passport')
				}
			}
			else{
				return res.send('no req.session');
			}
		}
		else {
			return res.send('No request');
		}
	},
	
	
	auth: function(req, res) {
		res.send(req.user);
	}
};
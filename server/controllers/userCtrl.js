var User = require('../models/User');
var Course = require('../models/Course');

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


enrollInCourse: function(req, res){
	console.log('getting here course blah');
	// console.log(req.query);
	var courseId = req.query.courseId;
	var userId = req.query.userId;
	// console.log(courseId, userId);



	// first put userId into courses list of students
	Course.findById(courseId)
	.exec(function(err, course){
		course.students.push(userId);
		course.save();
	});

	// // find User and add course to enrolled courses
	User.findById(userId)
	.exec(function(err, user){
		user.coursesEnrolledIn.push(courseId);
		user.save();
	});


},

leaveCourse: function(req, res){
	var courseId = req.query.courseId;
	var userId = req.query.userId;

	console.log('leave course');

	// Course.findById(courseId)
	// .exec(function(err, course){
	// 	for(var i=0; i<course.students.length; i++){
	// 		var studentId = course.students[i];
	// 		if(studentId===userId){
	// 			course.students.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// 	course.save();
	// });

	// User.findById(userId)
	// .exec(function(err, user){
	// 	for(var i=0; i<user.coursesEnrolledIn; i++){
	// 		var course_id = user.coursesEnrolledIn[i];
	// 		if(course_id===courseId){
	// 			user.coursesEnrolledIn.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// 	user.save();
	// })








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
			return res.send('no req.session')
		}
	}
	else{
		return res.send('no req');
	}
},


auth: function(req, res) {
	res.send(req.user);
}
};
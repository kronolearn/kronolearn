var Course = require('../models/Course');
var Random = require('../models/Random');
var User = require('../models/User');



module.exports = {

	getCourses: function(req, res) {
		Course.find()
        .populate('topics')
        .exec(function(err, response) {
            if (err) res.status(500).send(err);
            else {
			     res.send(response);
            }
		});
	},
	
	
	
	addCourse: function(req, res) {
		var userId = req.query.userId;
		var newCourse = req.body;
		var imageUrl = req.imageUrl;
		newCourse.picture = imageUrl;

		delete newCourse.imageObj;

		// need to just grab Ids from admin objects, to store on backend
		var admins = newCourse.admins;
		var adminIds = admins.map(function(admin){
			return admin.id;
		})
		// now remove the old admins on new course, and attach admin id array
		delete newCourse.admins;
		newCourse.admins = adminIds;

		// put creator(s) of course as student(s)
		delete newCourse.students;
		newCourse.students = adminIds;


		console.log('\n\ncourse to add is:', newCourse, '\n\n');

		Random.find().exec(function(err, randomArr){
			var newCourseNumber = randomArr[0].highestCourseNumber+1;
			randomArr[0].highestCourseNumber+=1;
			randomArr[0].save()
			newCourse.courseNumber = newCourseNumber;
			new Course(newCourse).save(function(err, course){
				if(err){
					res.status(500).send(err);
				}
				else{
					// need to add courseId to courseadmin for on user
					User.findById(userId)
					.exec(function(err, user){
						// since user has created course, need to put course Id in user's
						// coursesAdminFor and coursesEnrolledIn
						user.coursesAdminFor.push(course._id);
						user.coursesEnrolledIn.push(course._id);
						user.save();
						
						// just send course number, now the front end goes to new course page
						res.send({courseNumber: newCourseNumber});
					})



				}
			})

		})

	}, // add course
	
	addTestCourse: function(req, res) {

		new Course(req.body).save(function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(data);
			}
		});
	},
	
	getById: function(req, res) {

		Course.findOne({ courseNumber: Number(req.params.id )})
		.populate('admins')
		.populate('topics')

		.exec(function(err, data) {

			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	removeCourse: function(req, res) {
		Course.findByIdAndRemove(req.params.id, function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	updateCourse: function (req, res) {
		Course.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},

};
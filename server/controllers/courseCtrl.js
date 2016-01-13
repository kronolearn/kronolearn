var Course = require('../models/Course');
var Random = require('../models/Random');


module.exports = {

	getCourses: function(req, res) {
		Course.find()

		.then(function (response) {
			res.send(response);
		});
	},
	
	addCourse: function(req, res) {
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


		console.log('\n\ncourse to add is:', newCourse, '\n\n');

		Random.find().exec(function(err, randomArr){
			var newCourseNumber = randomArr[0].highestCourseNumber+1;
			randomArr[0].highestCourseNumber+=1;
			randomArr[0].save()
			newCourse.courseNumber = newCourseNumber;
			new Course(newCourse).save(function(err, data){
				if(err){
					res.status(500).send(err);
				}
				else{
					// just send course number, now the front end goes to new course page
					res.send({courseNumber: newCourseNumber});
				}
			})

		})

	}, // add course
	
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
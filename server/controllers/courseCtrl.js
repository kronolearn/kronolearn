var Course = require('../models/Course');

module.exports = {
    
    getCourse: function(req, res) {
		Course.find().then(function (response) {
			res.send(response);
		});
	},
	
	addCourse: function(req, res) {
		new Course(req.body).save(function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(data);
			}
		});
	},
	
	getById: function(req, res) {
		Course.findById(req.params.id, req.body, function(err, data) {
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
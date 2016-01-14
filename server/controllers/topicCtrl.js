var Topic = require('../models/Topic');
var Course = require('../models/Course');

module.exports = {
    
    getTopics: function(req, res) {
		Topic.find().then(function (response) {
			return res.send(response);
		});
	},
	
	addTopic: function(req, res) {
		new Topic(req.body).save(function (err, topic) {
			if (err) {
				return res.status(500).send(err);
			} else {
                var courseId = req.query.courseId;
                console.log(courseId);
                Course.findOne({courseNumber: courseId})
                .exec(function(err, course){
                    if(err){
                        return res.status(500).send(err)
                    }
                    else{
                        course.topics.push(topic._id);
                        console.log(topic._id);
                        console.log(course);
                        course.save(function(err, course){
                            if(err){
                                return res.status(500).send(err);
                            }
                            console.log(course);
                            return res.send(topic);
                        })
                        
                    }
                })
                
                
                
                
			}
		});
	},
	
	getById: function(req, res) {
		Topic.findById(req.params.id, req.body) 
        .populate('cards')
        .exec(function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	removeTopic: function(req, res) {
		Topic.findByIdAndRemove(req.params.id, function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	updateTopic: function (req, res) {
        Topic.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
	},
    
};
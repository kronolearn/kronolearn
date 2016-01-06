var User = require('../models/User');

module.exports = {
	
	
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
	
	
	isAuth: function(req, res, next) {
		if(req.user) {
			next(); 
		} else {
			res.status(403).send('Not Allowed');
		}
	},
	
	
	auth: function(req, res) {
		res.send(req.user);
	}
};
var Card = require('../models/Card');

module.exports = {
	
    
    
	getCards: function(req, res) {
		Card.find().then(function (response) {
			res.send(response);
		});
	},
	
	addCard: function(req, res) {
		new Card(req.body).save(function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(data);
			}
		});
	},
	
	getById: function(req, res) {
		Card.findById(req.params.id, req.body, function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	removeCard: function(req, res) {
		Card.findByIdAndRemove(req.params.id, function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
	updateCard: function (req, res) {
		Card.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		});
	},
	
};
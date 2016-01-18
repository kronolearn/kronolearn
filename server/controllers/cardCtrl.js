var Card = require('../models/Card');
var Topic = require('../models/Topic');

module.exports = {
	
	getCards: function(req, res) {
		Card.find().populate('topic').exec().then(function (response) {
			res.send(response);
		});
	},
	
	addCard: function(req, res) {
		console.log(req.body);
		new Card(req.body).save(function (err, card) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
                Topic.findById(card.topicId, function(err, topic) { 
                    if (err) {
                    	console.log(err);
                        res.status(500).send(err);
                    } else {
                        topic.cards.push(card._id);
                        topic.save(function(err, topic) {
                            if (err) {
                            		console.log(err);
                                res.status(500).send(err);
                            } else {
                                res.json(topic);
                            }
                        })
                    }
                })
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
	}
	
};
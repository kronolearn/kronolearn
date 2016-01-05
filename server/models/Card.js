var mongoose = require('mongoose'),
	TopicSchema = require('./topic'),
	Schema = mongoose.Schema;
	
var	CardSchema = Schema ({
	question: { type: String, required: true },
	answers: [{
	    text: { type: String, required: true },
	    correctAnswer: { type: Boolean, required: true }
	}],
	tags: [{ type: String, enum: TopicSchema.tags }], // Array of Strings, Enum.
	QuestionType: { type: String, default: 'MultipleAnswer'},
	numReviews: { type: Number },
	numWrong: { type: Number }
	});
	
module.exports = mongoose.model('Card', CardSchema);
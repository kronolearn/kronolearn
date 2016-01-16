var mongoose = require('mongoose'),
	TopicSchema = require('./Topic'),
	Schema = mongoose.Schema;
	
var	CardSchema = Schema ({
	question: { type: String, required: true },
	answers: [{
	    text: { type: String, required: true },
	    correctAnswer: { type: Boolean, required: true, default: false }
	}],
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
	tags: [{ type: String }],
	QuestionType: { type: String, default: 'MultipleAnswer'},
	numReviews: { type: Number, default: 0, required: true },
	numWrong: { type: Number, default: 0, required: true }
	});
	
module.exports = mongoose.model('Card', CardSchema);
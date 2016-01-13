var mongoose = require('mongoose'),
	TopicSchema = require('./Topic'),
	Schema = mongoose.Schema;

	// strict: false means you can add stuff not defined in schema here, and
	// will get saved to db, by default, mongoose has strict set to true

var RandomSchema = Schema({
	highestCourseNumber: {type: Number, default: 0}

}, {strict: false});

module.exports = mongoose.model('Random', RandomSchema);

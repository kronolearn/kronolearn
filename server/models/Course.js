var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var	CourseSchema = Schema ({
	name: { type: String },
	description: { type: String },
	subjects: [{ type: String }],
	topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
	admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    courseNumber: {type: Number},
	picture: { type: String, default: 'http://ak2.polyvoreimg.com/cgi/img-thing/size/l/tid/41166716.jpg' }
	});
	
	module.exports = mongoose.model('Course', CourseSchema);
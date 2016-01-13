var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var	CourseSchema = Schema ({
	name: { type: String, required: true },
	description: { type: String, required: true  },
	subjects: [{ type: String, required: true  }],
	topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
	admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    courseNumber: {type: Number},
	picture: { type: String, default: 'http://ak2.polyvoreimg.com/cgi/img-thing/size/l/tid/41166716.jpg' }
	});
	
	module.exports = mongoose.model('Course', CourseSchema);
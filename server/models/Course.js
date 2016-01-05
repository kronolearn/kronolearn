var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var	CourseSchema = Schema ({
	name: { type: String },
	description: { type: String },
	subjects: [{ type: String }],
	topics: [{ type: Schema.Types.ObjectId, ref: 'Topics' }],
	admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	picture: { type: String, default: 'http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg' }
	});
	
	module.exports = mongoose.model('Course', CourseSchema);
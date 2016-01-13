var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Mixed = Schema.Types.Mixed,
	bcrypt = require('bcrypt-nodejs');

var UserSchema = Schema({
		name: { type: String, required: true },
		email: { type: String, required: true },
		avatar: { type: String },
		password: { type: String, required: true },
		coursesEnrolledIn: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
		coursesAdminFor: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
		myNotifications: { type: Mixed },
		cards: [{
			card: { type: Schema.Types.ObjectId, ref: 'Card' },
			reviews: [{
				date: { type: Date },
				qResponse: { type: Number, default: 3, required: true },
				ef: { type: Number, default: 2.5, required: true }
			}],
		     ef: { type: Number, default: 2.5 },
		     dateNextReview: { type: Date },
		}]
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);	
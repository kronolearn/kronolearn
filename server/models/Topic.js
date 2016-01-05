var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var	TopicSchema = Schema ({
	name: { type: String },
	tags: [{ type: String }],
	description: { type: String },
	picture: { type: String },
	reviewMaterials: [{
	    material: { type: String },
        reviewTags: [{ type: String, enum: TopicSchema.tags }],
		// Array of Strings, enum to tags of topic (dropdown)
}],
	cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
	// Array of objectIds, referencing cards
	});
	
module.exports = mongoose.model('Topic', TopicSchema);
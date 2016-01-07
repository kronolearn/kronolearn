var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
    
// var tags = ['tag1', 'tag2'];

// var tags = 


	
var	TopicSchema = Schema ({
	name: { type: String },
	tags: [{ type: String, default: 'tag' }],
	description: { type: String },
	picture: { type: String },
	reviewMaterials: [{
	    material: { type: String },
        // reviewTags: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
        reviewTags: [{ type: String }]
        //, this line gives this error. "reviewTags: [{ type: String, enum: TopicSchema.tags }], TypeError: Cannot read property 'tags' of undefined" We are going to use Ref until Peter gets back tomorrow!
                                                      
		// Array of Strings, enum to tags of topic (dropdown)
}],
	cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
	// Array of objectIds, referencing cards
	});
	
module.exports = mongoose.model('Topic', TopicSchema);
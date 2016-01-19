var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// var tags = ['tag1', 'tag2'];

// var tags = 


	
var TopicSchema = Schema({
    name: { type: String, required: true },
    tags: [{ type: String, default: 'tag', required: true }],
    description: { type: String, required: true },
    picture: { type: String, required: true, default: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=28592329" },
    reviewMaterials: [{
        material: { type: String },
        reviewTags: [{ type: String }],
        materialUrl: { type: String }
    }],
    courseNumber: {type: Number, required: true},
    course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

module.exports = mongoose.model('Topic', TopicSchema);


























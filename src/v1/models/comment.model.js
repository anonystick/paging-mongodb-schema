const { Schema, model} = require('mongoose')

const stackOverFlowSchema = new Schema({
    blogId: { type: Number, required: true},
    commentId: { type: Number, required: true},
    email: { type: String, default: ''},
    body: { type: String, default: ''},
    name: { type: String, default: ''},
},{
    collection: 'stackoverflow',
    timestamps: true
})


const hacknewsSchema = new Schema({
    blogId: { type: Number, required: true},
    commentId: { type: Number, required: true},
    email: { type: String, default: ''},
    body: { type: String, default: ''},
    name: { type: String, default: ''},
    time: { type: Date, default: Date.now }
},{
    collection: 'hacknews',
    timestamps: true
})

const eventShema = new Schema({
    userId: { type: Number, required: true},
    time: { type: Date, default: Date.now }
},{
    collection: 'events',
    timestamps: true
})

const bucketSchema = new Schema({
    blogId: { type: String, default: ''},
    count: {type: Number, required: true}, // 10
    comments: { type: Array, default: [{
        commentId: { type: Number, required: true},
        userid: { type: Number, required: true},
        email: { type: String, default: ''},
        body: { type: String, default: ''},
        name: { type: String, default: ''},
    }]}
},{
    collections: "buckets",
    timestamps: true
})

module.exports = {
    _StackModel: model('stackoverflow', stackOverFlowSchema),
    _HackNewsModel: model('hacknews', hacknewsSchema),
    _EventModel: model('events', eventShema),
    _BucketModel: model('buckets', bucketSchema)
}
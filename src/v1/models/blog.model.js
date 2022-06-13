const { Schema , model} = require('mongoose')

const blogSchema = new Schema({
    blogId: { type: Number, required: true},
    title: { type: String, required: true},
}, {
    collection: 'blogs',
    timestamps: true
})

module.exports = model('blogs', blogSchema)
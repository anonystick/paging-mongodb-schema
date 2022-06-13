'use strict';

const { _BucketModel } = require('../models/comment.model')

var that = module.exports = {
    // count = 10
    insertBucket: async({
        blogId,
        commentId, 
        name, 
        body, 
        email
    }) => {
        try {
            const _blogId = new RegExp(`^${blogId}_`)
            return await _BucketModel.findOneAndUpdate({
                blogId: _blogId,
                count: {$lt: 10}
            },{
                $push: {
                    comments: {
                        email,
                        body,
                        name,
                        commentId
                    }
                },
                $inc: { count: 1},
                $setOnInsert: {
                    blogId: `${blogId}_${new Date().getTime()}`
                }
            },{
                new: true, 
                upsert: true
            })
        } catch (error) {
            console.error(`Error insertBucket:::`, error);
        }
    },
    listPaging: async( { blogId, page = 1, pagesize = 1}) => {
        const _blogId = new RegExp(`^${blogId}_`)
        return await _BucketModel.find({
            blogId: _blogId
        }).sort({ _id: 1 }).skip(( page - 1) * pagesize).limit(pagesize)
    }
}
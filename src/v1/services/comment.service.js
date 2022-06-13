'use strict';
const {
    _StackModel,
    _HackNewsModel
} = require('../models/comment.model')

var that = module.exports = {
    insertComments: async ({
        blogId,
        commentId,
        name,
        body,
        email
    }) => {
        try {
            return await _StackModel.create({
                blogId,
                commentId,
                name,
                body,
                email
            })
        } catch (error) {
            console.error(`insertComments::`, error.message);
        }
    },
    //insertmany
    insertManyComments: async(arrItems) => {
        return await _HackNewsModel.insertMany(arrItems)
    },
    list: async({
        blogId,
        page = 1,
        pagesize = 50
    }) => {
        /*
            page skip limit
            1     0      50
            2     50      50
            3      100     50
            SKIP = ( page -1 ) * limit

            4       150        50



            500 -> 50 
        */
        return await _StackModel.find({
            blogId
        }).skip( ( page - 1) * pagesize).limit(pagesize);
        // skip = 200.000.000 , limit 50 => 200.000.050
    },
    listHacknews: async({blogId, commentId, pagesize}) => {
        return await _HackNewsModel.find({
            blogId: blogId,
            commentId: {$gt: commentId}
        }).select({ commentId: 1}).limit(pagesize)
    }
}
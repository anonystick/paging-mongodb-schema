'use strict';

// import services

const {
    insertComments,
    insertManyComments,
    listHacknews,
    list
} = require('../services/comment.service')

const { insertEvent, atomicInsert } = require('../services/event.service')

const {insertBucket, listPaging} = require('../services/bucket.service') 

var that = module.exports = {
    listPageUsingBucket: async (req, res, next) => {
        const { blogId, page = 1, pagesize = 1} = req.query;
        const listComments = await listPaging({blogId, page, pagesize})
        return res.status(200).json({
            status: 'success',
            elements: listComments[0].comments,
            meta: {
                pagesize,
                count: listComments[0].count
            }
        })
    },
    insertBucket: async (req, res, next) => {
        try {
            const {blogId, commentId, name, email, body} = req.body;
            return res.status(200).json(await insertBucket({blogId, commentId, name, email, body}))
        } catch (error) {
            console.error(`insertComments Controller::`, error.message)
            next(error)
        }
    },
    insertEvent: async (req, res, next) => {
        try {
            
            const {userId} = req.body;
            return res.status(200).json(await insertEvent({userId}))
        } catch (error) {
            console.error(`insertComments Controller::`, error.message)
            next(error)
        }
    },
    atomicInsert: async (req, res, next) => {
        try {
            
            const {userId} = req.body;
            return res.status(200).json(await atomicInsert({userId}))
        } catch (error) {
            console.error(`insertComments Controller::`, error.message)
            next(error)
        }
    },
    insertComments: async (req, res, next) => {
        try {
            
            const {blogId, commentId, name, emai, body} = req.body;
            return res.status(200).json({
                status: 'success',
                elements: await insertComments({blogId, commentId, name, emai, body})
            })
        } catch (error) {
            console.error(`insertComments Controller::`, error.message)
            next(error)
        }
    },
    insertManyComments: async( req, res, next) => {
        try {
            // node js 18
            const resp = await (await fetch(`https://jsonplaceholder.typicode.com/comments`)).json();
            const newArray = resp.map( comment => {
                return {
                    blogId: 1,
                    commentId: +comment.id,
                    name: comment.name,
                    body: comment.body,
                    email: comment.email
                }
            })
            await insertManyComments(newArray)
            res.status(200).json({
                status: "success",
                elements: 1
            })
        } catch (error) {
            console.error(`insertManyComments Controller::`, error.message)
            next(error)
        }
    },
    list: async (req, res, next) => {
        const {page = 1, blogId, pagezise = 50} = req.query;
        res.status(200).json({
            status: "success",
            elements: await list({
                page: +page,
                pagesize: +pagezise,
                blogId: +blogId
            }),
            meta: {
                pagezise,
                page
            }
        })
    },
    listHacknews: async(req, res, next) => {
        const {commentId = 0, blogId = 1, pagesize = 30} = req.query;
        res.status(200).json({
            status: "success",
            elements: await listHacknews({
                commentId: +commentId,
                blogId: +blogId,
                pagesize: +pagesize
            }),
            meta: {
                pagesize,
                blogId
            }
        })
    }
}
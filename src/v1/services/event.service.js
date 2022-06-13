'use strict';

const { _EventModel } = require('../models/comment.model')

var that = module.exports = {
    // get phieu giam gia
    insertEvent: async({
        userId
    }) => {
        // check
        const isEvent = await _EventModel.findOne({
            userId
        })
        if(isEvent){
            return {
                code: 201,
                message: 'User already!'
            }
        }

        // insert 
        const event = await _EventModel.create({
            userId
        })

        return {
            code: 200,
            message: 'User ok!'
        }
    },
    atomicInsert: async({ userId }) => {

        const event = await _EventModel.findOneAndUpdate({
            userId
        },{
            $set: {
                time: new Date()
            }
        },{
            new: false, // return ve document update, thay vi document original
            upsert: true // Neu khong tim duoc thi se insert
        })

        return {
            code: 200,
            message: !event ? 'User ok!' : 'User already!'
        }
    }
}
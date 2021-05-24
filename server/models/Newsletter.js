const mongoose = require("mongoose")
const Schema = mongoose.Schema
const file = new Schema({
    mime: {
        type: String,
        default: 'file',
        _id: false,
        required: true
    },
    encoded_64: {
        type: String,
        default: '',
        _id: false,
        required: false
    },
    filename: {
        type: String,
        _id: false,
        required: true
    }
})

const newsletter = new Schema({
    subject: {
        type: String,
        required: true,
        _id: false
    },

    content: {
        type: String,
        required: true,
        _id: false,
        default: ""
    },

    content_type: {
        type: String,
        enum: ['plaintext', 'html', 'link'],
        default: 'plaintext'
    },

    attachments: {
        type: [file],
        default: []
    }
    
}, {timestamps: true})

module.exports = newsletter
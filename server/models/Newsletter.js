const mongoose = require("mongoose")
const Schema = mongoose.Schema

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

    uploader: {
        type: String,
        required: true,
        _id: false,
        default: "DEFAULT UPLOAD"
    },

    content_type: {
        type: String,
        enum: ['plaintext', 'html', 'link'],
        default: 'plaintext'
    }
    
}, {timestamps: true})

module.exports = newsletter
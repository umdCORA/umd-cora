const mongoose = require('mongoose');
const ResourceSchema = require('../models/Resource');

ResourceSchema.statics = {
    create: function(data, cb){
        var created = new this(data);
        created.save();
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query, cb);
    }
}

module.exports = mongoose.model('Resource', ResourceSchema);
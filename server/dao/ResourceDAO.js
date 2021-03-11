const mongoose = require('mongoose');
const ResourceSchema = require('../models/Resource');
const properties = require('../config/properties.js')

ResourceSchema.index({'location.geo': "2dsphere"})

ResourceSchema.methods.pruneTags = function(){
    let arr = this.tags;
    this.tags = arr.filter(function(element){
        return properties.DB_TAGS.includes(element)
    })
}

module.exports = mongoose.model('Resource', ResourceSchema);
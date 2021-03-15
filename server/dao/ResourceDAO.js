const mongoose = require('mongoose');
const ResourceSchema = require('../models/Resource');
const properties = require('../config/properties.js')

ResourceSchema.index({'location.geo': "2dsphere"})

ResourceSchema.methods.pruneTags = function(){
    let arr = this.tags;
    this.tags = arr.filter(function(element){
        return properties.DB_TAGS.includes(element)
    })
    return this
}

ResourceSchema.statics.searchRadius = function(constr, cb){
    let val = this.find({
        "location.geo": {
            $near: {
              $geometry: {
                 type: "Point" ,
                 coordinates: [ constr.long , constr.lat ]
              },
              $maxDistance: constr.radius*1609.34
            }
          }
    }, cb)
   
    return val
}

module.exports = mongoose.model('Resource', ResourceSchema);
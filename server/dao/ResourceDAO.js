const mongoose = require('mongoose');
const ResourceSchema = require('../models/Resource');
ResourceSchema.index({'location.geo': "2dsphere"})
module.exports = mongoose.model('Resource', ResourceSchema);
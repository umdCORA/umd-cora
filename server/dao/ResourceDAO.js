const mongoose = require('mongoose');
const ResourceSchema = require('../models/Resource');

module.exports = mongoose.model('Resource', ResourceSchema);
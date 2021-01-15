const mongoose = require("mongoose");
const UserSchema = require("../models/User");
var uniqueValidator = require("mongoose-unique-validator");

UserSchema.plugin(uniqueValidator, {message: "Taken"});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require("mongoose");
const UserSchema = require("../models/User");
var uniqueValidator = require("mongoose-unique-validator");

UserSchema.plugin(uniqueValidator, {message: "Taken"});

UserSchema.statics.findMailList = async function(){
    return (await this.find({newsletter: true})).map(elm => elm.email)
}

module.exports = mongoose.model('User', UserSchema);
const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt")
var uniqueValidator = require("mongoose-unique-validator");
const properties = require("../config/properties");

UserSchema.plugin(uniqueValidator, {message: "Taken"});

UserSchema.statics.findMailList = async function(){
    return (await this.find({newsletter: true})).map(elm => elm.email)
}

UserSchema.methods.generateHash = async function(psw){
    let salt = properties.BCRYPT_SALT_ROUNDS
    let hash = await bcrypt.hash(psw, salt)
    this.salt = salt
    this.hash = hash
    return this
}

module.exports = mongoose.model('User', UserSchema);
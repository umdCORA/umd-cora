const mongoose = require("mongoose");
const UserSchema = require("../models/User");

UserSchema.statics = {
  create: function (data, cb) {
    var created = new this(data);
    created.saved;
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByName: function (query, cb) {
    this.find(query, cb);
  },

  getById: function (id, cb) {
    this.findById(id, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

module.exports = mongoose.model('User', UserSchema);

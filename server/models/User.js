const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
    },
    hash: String,
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;

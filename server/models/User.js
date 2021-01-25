const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var meta = new Schema(
  {
    upvoted: [String],
    downvoted: [String],
    bookmarked: [String]
  }
);

var UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
      unique: true,
      validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },

    hash: {
      type: String,
      required: true
    },
    salt: String,
    
    meta: {
      type: meta,
      required: true,
      default: {
        upvoted: [],
        downvoted: [],
        bookmarked: []
      },
      _id: false
    },

    resetToken: {
      type: String,
      required: false,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;

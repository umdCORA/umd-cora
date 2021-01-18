const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const point = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const location = new Schema({
  _id: false,
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zipcode: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  geo: {
    type: point,
    index: '2dsphere'
  }
});

const contact = new Schema({
  _id: false,
  coordinater: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  website: {
    type: String, 
    default: "",
  },
});

const meta = new Schema({
  _id: false,
  votes: {
    type: Number,
    default: 0,
  },
  votes_positve: {
    type: Number,
    default: 0,
  },
  votes_negative: {
    type: Number,
    default: 0,
  },
});

const ResourceSchema = new Schema(
  {
    name: {
      _id: false,
      type: String,
      required: true,
    },

    location: {
      _id: false,
      type: location,
      required: true,
      default: {},
    },

    contact: {
      _id: false,
      type: contact,
      default: {},
    },

    services: [String],

    description: {
      _id: false,
      type: String,
      default: "",
    },

    meta: {
      _id: false,
      type: meta,
      default: {},
    },

    tags: [String],
  }
);

module.exports = ResourceSchema;

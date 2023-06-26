const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    default: "male", //male/femalte
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updated: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("user", user);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
    min: 1,
  },
  firstName: {
    type: String,
    required: true,
    min: 1,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    min: 255,
  },
  registered: {
    type: Date,
    default: Date.now,
  },
  lastVisit: {
    type: Date,
    default: null,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  login: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
});

module.exports = mongoose.model('User', userSchema);

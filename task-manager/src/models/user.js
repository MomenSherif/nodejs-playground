const mongoose = require('mongoose');
const validator = require('validator');
// Define User Model
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate: {
      validator(v) {
        return !v.match(/\bpassword\b/gi);
      },
      message: props => `Password can not contain password`
    }
  },
  age: {
    type: Number,
    default: 16,
    validate: {
      validator(v) {
        return v >= 16;
      },
      message: props => `${props.value} is to Young `
    }
  }
});

module.exports = User;

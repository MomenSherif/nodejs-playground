const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Define User Model
const User = mongoose.model('User', userSchema);

module.exports = User;

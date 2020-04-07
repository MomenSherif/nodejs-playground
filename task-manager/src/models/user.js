const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,

      unique: true,

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
    },
    avatar: {
      type: Buffer
    },
    tokens: [
      {
        token: {
          type: 'string',
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
});

// Add new method to the instance
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// Add new method to the model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');

  return user;
};

// Hashing the plain text password
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks
userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// Define User Model
const User = mongoose.model('User', userSchema);

module.exports = User;

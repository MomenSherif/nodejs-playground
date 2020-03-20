const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

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

// const me = new User({
//   name: 'Momen',
//   email: 'momensherif.2019@gmail.com',
//   password: '1234567',
//   age: 23
// });

// me.save()
//   .then(() => console.log(me))
//   .catch(error => console.log(error.message));

// Define Task Model
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// const newTask = new Task({
//   description: 'Task 20/3/2020'
// });

// newTask
//   .save()
//   .then(() => console.log(newTask))
//   .catch(err => console.log(err.message));

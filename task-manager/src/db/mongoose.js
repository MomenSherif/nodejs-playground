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

const me = new User({
  name: 'Momen',
  email: 'momensherif.2019@gmail.com',
  age: 23
});

me.save()
  .then(() => console.log(me))
  .catch(error => console.log(error.message));

// Define Task Modle
// const Task = mongoose.model('Task', {
//   description: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   }
// });

// const newTask = new Task({
//   description: 'A mongoose task',
//   completed: false
// });

// newTask
//   .save()
//   .then(() => console.log(newTask))
//   .catch(err => console.log(err));

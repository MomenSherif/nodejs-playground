const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Define User Model
const User = mongoose.model('User', {
  name: {
    type: String
  },

  age: {
    type: Number
  }
});

/*
const me = new User({
  name: `Mo'men Sherif`,
  age: 23
});

me.save()
  .then(() => console.log(me))
  .catch(err => console.log('error', err));
  */

// Define Task Modle
const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const newTask = new Task({
  description: 'A mongoose task',
  completed: false
});

newTask
  .save()
  .then(() => console.log(newTask))
  .catch(err => console.log(err));

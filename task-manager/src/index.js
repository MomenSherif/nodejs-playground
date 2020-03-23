const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create User EndPoint
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// Read Users EndPoint
app.get('/users', (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(e => res.sendStatus(500));
});

// Read User EndPoint
app.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      user ? res.send(user) : res.sendStatus(404);
    })
    .catch(e => res.sendStatus(404));
});

// Create Post EndPoint
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(e => res.status(400).send(e));
});

// Read Tasks EndPoint
app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => res.send(tasks))
    .catch(e => res.sendStatus(500));
});

// Read Task EndPoit
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then(task => {
      task ? res.send(task) : res.sendStatus(404);
    })
    .catch(e => res.sendStatus(404));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

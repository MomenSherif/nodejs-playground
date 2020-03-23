const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create User EndPoint
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read Users EndPoint
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Read User EndPoint
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    user ? res.send(user) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Update User EndPoint
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperaion = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperaion)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    user ? res.send(user) : res.sendStatus(404);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Create Task EndPoint
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read Tasks EndPoint
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Read Task EndPoit
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    task ? res.send(task) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Update Task EngPoint
app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOpertaion = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOpertaion)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    task ? res.send(task) : res.sendStatus(404);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

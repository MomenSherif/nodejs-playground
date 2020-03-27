const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Task EndPoint
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read Tasks EndPoint
router.get('/tasks', auth, async (req, res) => {
  try {
    await req.user.populate('tasks').execPopulate(); // const tasks = await Task.find({owner: req.user._id})
    res.send(req.user.tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Read Task EndPoit
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    task ? res.send(task) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Update Task EngPoint
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOpertaion = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOpertaion)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) return res.sendStatus(404);

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Task EndPoint
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    task ? res.send(task) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;

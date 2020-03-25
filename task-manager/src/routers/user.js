const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Create User EndPoint
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read Users EndPoint
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Read User EndPoint
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    user ? res.send(user) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Update User EndPoint
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperaion = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperaion)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete User EndPoint
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    user ? res.send(user) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;

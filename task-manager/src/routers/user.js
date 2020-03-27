const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// Create User EndPoint
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });

  } catch (e) {
    res.status(400).send(e);
  }
});


// Login User EndPoint
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.sendStatus(400);
  }
});

// Logout User EndPoint
router.post('/users/logout', auth, async (req, res) => {
  try {
    // remove auth token
    req.user.tokens = req.user.tokens.filter(
      ({ token }) => token !== req.token
    );
    await req.user.save();

    res.sendStatus(200);

  } catch (e) {
    res.sendStatus(500);
  }
});

// Logout User of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.sendStatus(200);

  } catch (e) {
    res.sendStatus(500);
  }
});


// Read User Profile when authenticated EndPoint
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// Update User EndPoint
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'age', 'password'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid Updates' });

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send({ user: req.user });

  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete User EndPoint

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);

  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;

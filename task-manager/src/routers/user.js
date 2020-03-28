const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png})$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(null, true);
  }
});

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

router.post(
  '/users/me/avatar',
  upload.single('avatar'),
  (req, res) => {
    res.sendStatus(200);
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

module.exports = router;

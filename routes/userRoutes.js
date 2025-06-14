const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register (commented by @mdhrk2001)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User successfully registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login (commented by @mdhrk2001)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const UserService = require('../users/usersService');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

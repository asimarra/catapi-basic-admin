const express = require('express');
const router = express.Router();
const notifyService = require('./notifyService');
const notifyHelper = require('../../helpers/notify');
const notifySchemas = require('./notifySchemas');
const joiValidator = require('../../middleware/joiValidator');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const notifies = await notifyService.getAll();
    res.status(200).json(notifies);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

router.post('/', auth, joiValidator(notifySchemas.add), async (req, res) => {
  try {
    const notifyData = req.body;

    await notifyService.add(req.body);
    await notifyHelper.emitNotify(notifyData);

    res.status(201).json({ success: true, message: 'OK' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

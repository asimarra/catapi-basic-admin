const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
  res.json({ message: 'API is working properly!' })
);

router.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  res.json(healthcheck);
});

module.exports = router;

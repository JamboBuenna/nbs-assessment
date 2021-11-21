// /routes/health.js

const express = require('express');
const router = express.Router();

/**
 * Simple health check
 * @route GET /health
 */
router.get('/', (req, res, next) => {
  res.send('REST service working normally');
});

module.exports = router;

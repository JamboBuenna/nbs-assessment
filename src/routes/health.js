// /routes/health.js

const express = require('express');
const router = express.Router();

/**
 * @openapi
 * @swagger
 * /health:
 *   get:
 *     summary: Simple health check
 *     description: This is a hello world endpoint
 */
router.get('/', (req, res, next) => {
  res.send('REST service working normally');
});

module.exports = router;

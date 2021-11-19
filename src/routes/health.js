// /routes/posts.js
const express = require('express');
const router = express.Router();


var a = "b" // this will yield eslint error
router.get('/', (req, res, next) => {
  res.send('REST service working normally');
});

module.exports = router;

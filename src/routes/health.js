// /routes/posts.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
          res.send('REST service working normally');
});

module.exports = router;

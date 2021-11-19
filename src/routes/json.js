const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
    console.log(req.body);      // your JSON
    res.send(req.body);    // echo the result back
})

module.exports = router

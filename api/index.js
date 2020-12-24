var express = require('express');
var router = express.Router();

router.use('/users', require('./users.api'));

module.exports = router;
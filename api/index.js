var express = require('express');
var router = express.Router();

router.use('/users', require('./users.api'));
router.use('/problem', require('./problem.api'));
router.use('/feedback', require('./feedback.api'));

module.exports = router;
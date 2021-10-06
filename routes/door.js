var express = require('express');
var router = express.Router();
var door = require('../api/door');

/* GET users listing. */
router.all('/open', door.open);

module.exports = router;

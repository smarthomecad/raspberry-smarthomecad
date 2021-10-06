var express = require('express');
var camera = require("../lib/sh-camera");
var lock = require("../lib/sh-lock");
var push = require("../lib/sh-push");

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.all('/telegramm', function (req, res, next) {
  if (!req.body) {
    return res.end('ok1');
  }
  if (!req.body.message) {
    return res.end('ok2');
  }
  if (!req.body.message.text) {
    return res.end('ok3');
  }
  if (req.body.message.text.toLowerCase() == "open") {
    lock.open(function () {
      camera.save("photo", function (newFileName, res1) {
        push.send('lets open...', 'door', newFileName);
      });
      camera.saveONVIF("photo", function (newFileName, res1) {
        push.send('ets open...', 'door', newFileName);
      });
    });
  }
  if (req.body.message.text.toLowerCase() == "photo") {
    camera.save("photo", function (newFileName, res1) {
      push.send('photo', 'door', newFileName);
    });
    camera.saveONVIF("photo", function (newFileName, res1) {
      push.send('photo', 'door', newFileName);
    });
  }
  res.end('ok');
});

module.exports = router;

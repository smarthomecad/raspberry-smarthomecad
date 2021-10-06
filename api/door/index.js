var shLock = require('../../lib/sh-lock');
var shPush = require('../../lib/sh-push');
var shCamera = require('../../lib/sh-camera');
exports.open = open;

function open(req, res, next) {
    //console.log(req.body);
    shLock.open(function () {
        shPush.send('Door call', 'is there anybody?');
        res.send('respond with a resource');
    });
}
var Sound = require('aplay');
exports.playBell = playBell;

function playBell() {
console.log("play");
new Sound().play('assets/bell.wav');
 };

var gpio = require("gpio");
var speaker = require("./sh-speaker");
var camera = require("./sh-camera");
var push = require("./sh-push");
var lock = require("../lib/sh-lock");

exports.start = start;
exports.turnOnLightTimer = turnOnLightTimer;
var gpio16;
var gpio20;

function start(next) {
  console.log("starting bell service");
  gpio16 = gpio.export(16, {
    direction: 'in',
    ready: function () {
      gpio16.on("change", function (val) {
        console.log("bell", val);
        if (val == 1) {
          camera.save("bell", function (newFileName, res) {
            push.send('Door Alarm', 'we have quests', newFileName);
          });
          camera.saveONVIF("bell", function (newFileName, res) {
            push.send('Door Alarm', 'we have quests', newFileName);
          });
        }
      });
      //next();
    }
  });

  gpio20 = gpio.export(20, {
    direction: 'out',
    interval: 200,
    ready: function () {
      gpio20.set(1);
    }
  });

}

function turnOnLightTimer(next) {
  gpio20.set(1);
  setTimeout(function () {
    gpio21.set(0);
    console.log("bell light on");
    next();
  }, 5000);

}

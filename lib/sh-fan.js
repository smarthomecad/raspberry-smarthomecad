var push = require("./sh-push");
var temp = require("pi-temperature");
var gpio = require("gpio");
var gpio26;
exports.start = start;

function start(next) {
   temp.measure(function (err, temp) {
      if (err) {
         console.error(err);
      } else {
         console.log("starting fan service", temp);
      }
   });
   gpio26 = gpio.export(26, {
      direction: 'out',
      interval: 200,
      ready: function () {
         gpio26.set(0);
         setTimeout(read, 1000);
      }
   });
}

function read() {
   temp.measure(function (err, temp) {
      if (err) {
         console.error(err);
      } else {
         if (temp > 60) {
            console.log("fan started", temp);
            gpio26.set(1);
            setTimeout(read, 120000);
         } else {
            gpio26.set(0);
            setTimeout(read, 60000);
         }
      }
   });
};


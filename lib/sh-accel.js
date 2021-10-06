var push = require("./sh-push");
var HMC5883L = require('compass-hmc5883l');
var camera = require("./sh-camera");
var min = 400;
var skipInit = 20;
var skip = skipInit;
var avrg = 0;
var compass = new HMC5883L(1);
exports.start = start;

function start(next) {
  //var compass = new HMC5883L(1);
  //console.log("starting accel service");
  //setTimeout(read, 4000);
  //compass.getHeadingDegrees('x', 'z', function (err, data) {
  //min = parseFloat(data);
  //console.log("starting accel service:", min);
  //setTimeout(read, 1000);
  //});
  read();
}
function read() {
  compass.getHeadingDegrees('x', 'z', function (err, data) {
    if (err) throw err;
    //console.log(data, min);
    value = parseFloat(data);
    if (value < 180) return;
    if (skip > 0) {
      skip--;
      avrg += value;
      if (skip == 0) {
        min = avrg / skipInit;
        console.log("starting accel service:", min);
      }
      setTimeout(read, 1000);
      return;
    }
    if (value < min) min = value;
    if (value > min + 3) {
      console.log("alert door opened:", min, value);
      setTimeout(read, 60000);
    } else {
      setTimeout(read, 1000);
    }
  });

};

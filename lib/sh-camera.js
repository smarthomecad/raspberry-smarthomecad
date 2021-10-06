
const PiCamera = require('pi-camera');
const onvif = require('node-onvif');
const fs = require('fs');

exports.save = save;
exports.saveONVIF = saveONVIF;
var directory = "public/door/photo/";

function save(event, next) {
  var newFileName = event + "_" + new Date().toISOString() + ".jpg";
  capture(directory + newFileName, function (res) {
    next(directory + newFileName, res);
  });
}
function saveONVIF(event, next) {
  var newFileName = event + "_" + new Date().toISOString() + ".jpg";
  captureOVIF(directory + newFileName, function (res) {
    next(directory + newFileName, res);
  });

}

function captureOVIF(fileName, next) {
  // Create an OnvifDevice object
  let device = new onvif.OnvifDevice({
    xaddr: 'http://192.168.0.248:8080/onvif/device_service',  //door camera
    user: 'admin',
    pass: 'admin'
  });

  // Initialize the OnvifDevice object
  device.init().then(() => {
    // Get the data of the snapshot
    console.log('fetching the data of the snapshot...');
    return device.fetchSnapshot();
  }).then((res) => {
    // Save the data to a file
    fs.writeFileSync(fileName, res.body, { encoding: 'binary' });
    next();
  }).catch((error) => {
    next();
  });
}

function capture(fileName, next) {
  const myCamera = new PiCamera({
    mode: 'photo',
    output: fileName,
    width: 1200,
    height: 800,
    rotation: 180,
    nopreview: true,
  });

  myCamera.snap()
    .then((result) => {
      next();
    })
    .catch((error) => {
      next();
    });


}


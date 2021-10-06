var cv = require('opencv');

exports.detect = detect;

function detect(filename) {
  cv.readImage(filename, function (err, im) {
    if (err) throw err;
    if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

    im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) {
      if (err) throw err;

      return faces.length > 0;
    });
  });
}

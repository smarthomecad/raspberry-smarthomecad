var nfc = require('nfc').nfc
    , util = require('util')
    , shLock = require('./sh-lock')
    , md5 = require('md5')

    ;

var device = new nfc.NFC();
device.on('read', function (tag) {
    if (tag.uid == 'cardid') { // RED TAG
        shLock.open(function () {
            console.log('opened red tag nfc');
        });
    } else {
        if ((!!tag.data) && (!!tag.offset)) {
            var data = nfc.parse(tag.data.slice(tag.offset));
            //console.log(JSON.stringify(data));        
            if ((data) && (data[1]) && (data[1].ndef) && (data[1].ndef[0]) && (data[1].ndef[1])) {
                var name = data[1].ndef[0].value;
                var hash = data[1].ndef[1].value;
                var key = "Ssb8734s;;d;f";
                if (md5(name + tag.uid + key).substring(0, 24) == hash.substring(0, 24)) {
                    shLock.open(function () {
                        console.log('opened nfc');
                    });
                } else {
                    console.log('fail', md5(name + tag.uid + key), '---', hash);
                }
            }
        }
    }
}).on('error', function (err) {
    // handle background error;
}).start();
// optionally the start function may include the deviceID (e.g., 'pn53x_usb:160:012')

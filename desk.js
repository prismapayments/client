
const HID = require('node-hid');

// console.log(HID.devices());

const device = new HID.HID(8208, 30264);

let buffs = [];
let timer = null;

function read(buff) {
    if (timer)
        timer = clearTimeout(timer);

    buffs.push(buff);

    timer = setTimeout(function() {

        const b = Buffer.concat(buffs);

        buffs = [];
        // console.log(b);

        console.log(b.toString('ascii'));

    }, 100)
}

device.on('data', function (data) {
    // console.log(data.toString('ascii'));
    read(data);
});

const HID = require('node-hid');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
const driver = require('printer');

window.printers = {
    printers: {},

    print(content, _id) {
        const printer = this.printers[_id];
        if (!printer) {
            return;
        }
        printer.print(content);
        printer.cut();
        printer.execute();
        printer.clear();
    },

    add(config) {
        delete this.printers[config._id];

        const printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: config.interface,
            driver,
            options: {
                timeout: 1000
            },
            width: 48
        });

        return new Promise(resolve => {
            printer.isPrinterConnected().then(connected => {
                resolve(connected);
                if (connected) {
                    this.printers[config._id] = printer;
                }
            })
            .catch(() => {
                resolve(false);
            });
        });
    }
};

// console.log(HID.devices());

/*
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
*/
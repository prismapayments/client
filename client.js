
const HID = require('node-hid');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

let printer;

try {
    printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: 'printer:EPSON TM-T20X Receipt',
        driver: require('printer'),
        options: {
            timeout: 1000
        },
        width: 48
    });
    
    printer.isPrinterConnected().then(isConnected => {
        console.log('Printer connected:', isConnected);
    });
}
catch (e) {
    console.log('printer error', e);
}



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

window.thermalPrinter = {
    activate() {
        
    },
    print(content) {
        printer.print(content);
        printer.cut();
        printer.execute();
        printer.clear();
    }
};

window.commonPrinter = {
    activate() {
        throw 'Impressora comum desabilitada';
    }
};
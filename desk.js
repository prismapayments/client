
const HID = require('node-hid');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

let printer;

try {
    printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: 'printer:EPSON TM-T20X Receipt',
        // driver: require('electron-printer'),
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
    console.log('printer error');
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

const e = angular.element(document.body);

e.ready(function () {

    console.log('angular ready');
    
    const scope = e.scope();

    scope.$on('print:order', async function (order) {
        console.log('print order:', order);

        try {
            printer.println('Novo pedido');
            printer.upsideDown(true);
            printer.cut();

            try {
                await printer.execute();
                console.log('Print success.');
            }
            catch (e) {
                console.log('Print error:', error);
            }
        }
        catch (e) {
            console.log('Print main error:', error);
        }

    });
})

    



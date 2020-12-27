const { app, BrowserWindow } = require('electron');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({ 
        width: 1400, 
        height: 800, 
        webPreferences: { 
            nodeIntegration: false, 
            enableRemoteModule: true,
            //webSecurity: false,
            preload: path.join(app.getAppPath(), 'desk.js'),
        } 
    });
    win.loadURL('http://192.168.15.68:8080/manager');
    // win.loadFile('index.html');
    win.webContents.openDevTools();
    win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);
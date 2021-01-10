const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({ 
        width: 1400, 
        height: 900,
        fullscreen: true,
        webPreferences: { 
            nodeIntegration: false, 
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), 'client.js'),
        } 
    });
    win.loadURL('https://prismapayments.com/manager');
    // win.webContents.openDevTools();
    win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);
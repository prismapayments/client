const { app, BrowserWindow } = require('electron');
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
            preload: path.join(app.getAppPath(), 'client.js'),
        } 
    });
    win.loadURL('http://localhost:8080/manager');
    win.webContents.openDevTools();
    win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);
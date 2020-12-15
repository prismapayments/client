const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({ 
        width: 1400, 
        height: 800, 
        webPreferences: { 
            nodeIntegration: true, 
            enableRemoteModule: false,
            webSecurity: false
        } 
    });
    win.loadURL('http://localhost:8080/manager');
    // win.loadFile('index.html');
    win.webContents.openDevTools();
    win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);
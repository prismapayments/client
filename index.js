const { app, BrowserWindow } = require('electron');
const http = require('http');
const fs = require('fs');

// const req = http.request({
//     host: 'localhost', 
//     port: 8080, 
//     path: '/static/manager.html'
// }, function (res) {
//     res.setEncoding('utf-8'); 
    
//     let content = '';
    
//     res.on('data', function (chunk) { content += chunk; });

//     const HOST = 'http://localhost:8080';
    
//     res.on('end', function () {
//         const erase = ` 
//         <script> 
        
//         window.HOST = '${HOST}';
//         </script> 
//         `;

//         content = content.replace('<head>', '<head>' + erase);

//         content = content.replace(/(href|src)="\//g, '$1="' + HOST + '/');
//         console.log(content);

//         fs.writeFileSync('./index.html', content);
//         createWindow();
//     })
// });

// req.end();

let win;

function createWindow() {
    win = new BrowserWindow({ 
        width: 1400, 
        height: 600, 
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
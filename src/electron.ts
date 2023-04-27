// src/electron.js
const { app, BrowserWindow } = require('electron');

try {
  console.log('__dirname');
  require('electron-reloader')(__dirname, {
    ignore: ['./src/app'],
    watchRenderer: false,
    debug: true,
  });
} catch (error) {
  console.log(error);
}

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadURL('http://localhost:8080');
}

app.on('ready', createWindow);

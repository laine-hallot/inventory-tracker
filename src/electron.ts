// src/electron.js
const { app, BrowserWindow } = require('electron');
const reloader = require('electron-reloader');

/* try {
  console.log('__dirname');
  console.log(typeof __dirname);
  reloader(__dirname, {
    ignore: ['./src/app'],
    watchRenderer: false,
    debug: true,
  });
} catch (error) {
  console.log('FLAG 1');
  console.log(error);
  console.log('FLAG 2');
} */

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

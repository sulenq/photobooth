// electron/main.ts
var _a = require("electron"),
  app = _a.app,
  BrowserWindow = _a.BrowserWindow,
  ipcMain = _a.ipcMain;
var path = require("path");
function createWindow() {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadURL("http://localhost:5173"); // saat dev
  // win.loadFile('dist/index.html'); // saat production
}
app.whenReady().then(createWindow);

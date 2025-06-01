const path = require("path");
const { app, BrowserWindow } = require("electron");
const { ipcMain, nativeImage } = require("electron");
const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    resizable: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    //mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  app.commandLine.appendSwitch("overscroll-history-navigation", "0");

  createWindow();

  // Handle print photo
  ipcMain.handle("print-photo", async (event, base64Image, copies) => {
    try {
      const image = nativeImage.createFromDataURL(base64Image);
      const tempPath = path.join(os.tmpdir(), `photobooth_print.png`);
      fs.writeFileSync(tempPath, image.toPNG());

      for (let i = 0; i < copies; i++) {
        // Ganti command ini sesuai OS. Di Windows bisa pakai `print` atau `start`
        exec(`start /min "" "${tempPath}"`, (err, stdout, stderr) => {
          if (err) {
            console.error("Print error:", err);
          }
        });
      }

      return "ok";
    } catch (err) {
      console.error("Print failed:", err);
      return "error";
    }
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

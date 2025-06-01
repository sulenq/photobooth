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
      contextIsolation: true,
      nodeIntegration: false,
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
  // ipcMain.handle("print-photo", async (event, base64Image, copies) => {
  //   try {
  //     console.log("[print-photo] invoked");
  //     const image = nativeImage.createFromDataURL(base64Image);
  //     const tempPath = path.join(os.tmpdir(), `photobooth_print.png`);
  //     console.log("[print-photo] saving image to:", tempPath);
  //     fs.writeFileSync(tempPath, image.toPNG());

  //     for (let i = 0; i < copies; i++) {
  //       console.log(`[print-photo] printing copy ${i + 1}`);
  //       // exec(`start /min "" "${tempPath}"`, (err, stdout, stderr) => {
  //       //   if (err) {
  //       //     console.error("[print-photo] exec error:", err);
  //       //   }
  //       //   if (stderr) {
  //       //     console.error("[print-photo] stderr:", stderr);
  //       //   }
  //       //   if (stdout) {
  //       //     console.log("[print-photo] stdout:", stdout);
  //       //   }
  //       // });
  //       exec(`mspaint /pt "${tempPath}"`, (err, stdout, stderr) => {
  //         if (err) {
  //           console.error("[print-photo] exec error:", err);
  //         }
  //         if (stderr) {
  //           console.error("[print-photo] stderr:", stderr);
  //         }
  //         if (stdout) {
  //           console.log("[print-photo] stdout:", stdout);
  //         }
  //       });
  //     }

  //     return "ok";
  //   } catch (err) {
  //     console.error("[print-photo] exception:", err);
  //     return "error";
  //   }
  // });

  ipcMain.handle("print-photo", async (_event, base64, qty) => {
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(app.getPath("temp"), `photo.png`);
    fs.writeFileSync(filePath, base64Data, "base64");

    for (let i = 0; i < qty; i++) {
      // ini akan munculin dialog seperti gambar lo
      exec(
        `rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_PrintTo "${filePath}" "DS-RX1"`
      );
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

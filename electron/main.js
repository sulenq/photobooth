const path = require("path");
const { app, BrowserWindow, shell } = require("electron"); // tambahkan shell
const { ipcMain } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");
const {
  generateVideoFromBase64Images,
} = require("./utils/generateVideoFromBase64Images");

const isDev = process.env.IS_DEV === "true";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    resizable: true,
    frame: true,
    fullscreen: true,
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

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    // path ke index.html hasil build vite di build/renderer/index.html
    const indexPath = path.resolve(__dirname, "../renderer/index.html");
    mainWindow.loadFile(indexPath);
  }

  if (isDev) {
    // Uncomment kalau mau buka devtools otomatis
    // mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  app.commandLine.appendSwitch("overscroll-history-navigation", "0");

  createWindow();

  // Handle print photo
  ipcMain.handle("print-photo", async (_event, base64, qty) => {
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(app.getPath("temp"), `photo.png`);
    fs.writeFileSync(filePath, base64Data, "base64");

    for (let i = 0; i < qty; i++) {
      exec(
        `rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_PrintTo "${filePath}" "DS-RX1"`
      );
    }
  });

  // Handle generate video from images (return base64)
  ipcMain.handle("generate-video", async (_event, base64Images) => {
    const outputPath = path.join(app.getPath("temp"), "output.mp4");

    try {
      await generateVideoFromBase64Images(base64Images, outputPath);

      const videoBuffer = fs.readFileSync(outputPath);
      const videoBase64 = videoBuffer.toString("base64");

      fs.unlinkSync(outputPath);

      return videoBase64;
    } catch (error) {
      console.error("Generate video error:", error);
      throw error;
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

const path = require("path");
const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");
const {
  generateVideoFromBase64Images,
} = require("./utils/generateVideoFromBase64Images");

const isDev = process.env.IS_DEV == "true" ? true : false;

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

  // Handle pdf to img
  ipcMain.handle("convert-pdf-to-image", async (_, base64) => {
    const tempDir = require("os").tmpdir();
    const pdfPath = path.join(tempDir, "temp_input.pdf");
    const imagePath = path.join(tempDir, "output.jpg");

    fs.writeFileSync(pdfPath, Buffer.from(base64, "base64"));

    return new Promise((resolve, reject) => {
      const cmd = `magick -density 300 "${pdfPath}" -quality 100 "${imagePath}"`;

      exec(cmd, (error) => {
        if (error) return reject(error);
        const imageBuffer = fs.readFileSync(imagePath);
        resolve(imageBuffer.toString("base64"));
      });
    });                      
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

const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { app, BrowserWindow, shell, ipcMain, session } = require("electron");
const {
  generateVideoFromBase64Images,
} = require("./utils/generateVideoFromBase64Images");

const isDev = process.env.IS_DEV === "true";
const resolvePath = (...args) => path.join(app.getAppPath(), ...args);

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

  // ⛔ Blok semua download
  session.defaultSession.on("will-download", (event, item) => {
    event.preventDefault();
    console.log("Download diblokir:", item.getURL());
  });

  // ⛔ Cegah navigasi ke file download (misalnya PDF, image)
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const fileExtensionsToBlock = [
      ".pdf",
      ".zip",
      ".png",
      ".jpg",
      ".docx",
      ".xlsx",
      ".mp4",
    ];
    if (fileExtensionsToBlock.some((ext) => url.toLowerCase().endsWith(ext))) {
      console.log("Blokir navigasi ke file:", url);
      event.preventDefault();
    }
  });

  // ⛔ Blok buka tab baru (misalnya dari <a target="_blank">)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const blocked = /\.(pdf|zip|jpg|png|docx|xlsx|mp4)$/i.test(url);
    if (blocked) {
      console.log("Blokir openExternal:", url);
      return { action: "deny" };
    }

    shell.openExternal(url); // masih bisa buka link biasa
    return { action: "deny" };
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    // mainWindow.webContents.openDevTools({ mode: "detach" }); // optional
  } else {
    const indexPath = resolvePath("dist", "index.html");
    mainWindow.loadFile(indexPath);
  }
}

app.whenReady().then(() => {
  app.commandLine.appendSwitch("overscroll-history-navigation", "0");

  createWindow();

  ipcMain.handle("print-photo", async (_event, base64, qty) => {
    if (!base64 || !qty) return;

    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(app.getPath("temp"), "photo.png");
    fs.writeFileSync(filePath, base64Data, "base64");

    for (let i = 0; i < qty; i++) {
      exec(
        `rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_PrintTo "${filePath}" "DS-RX1"`,
        (err) => {
          if (err) console.error("Print failed:", err);
        }
      );
    }
  });

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

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

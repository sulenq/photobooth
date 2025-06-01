const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../build/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Print handler
ipcMain.handle("print-photo", async (event, base64Image, copies = 1) => {
  return new Promise((resolve, reject) => {
    const printWin = new BrowserWindow({
      show: false,
      webPreferences: { offscreen: true },
    });

    const html = `
      <html>
        <body style="margin:0; padding:0;">
          <img src="${base64Image}" style="width:100%; height:auto;" />
        </body>
      </html>
    `;

    printWin.loadURL(
      `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
    );

    printWin.webContents.on("did-finish-load", () => {
      let printedCount = 0;

      function printNext() {
        if (printedCount >= copies) {
          printWin.close();
          resolve(true);
          return;
        }

        printWin.webContents.print(
          {
            silent: true,
            deviceName: "DNP DS-RX1 HS",
            printBackground: true,
          },
          (success, errorType) => {
            if (!success) {
              reject(new Error(errorType));
              printWin.close();
              return;
            }
            printedCount++;
            printNext();
          }
        );
      }

      printNext();
    });

    printWin.webContents.on("did-fail-load", () => {
      printWin.close();
      reject(new Error("Failed to load print window"));
    });
  });
});

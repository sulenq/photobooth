const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  printPhoto: (base64, qty) => ipcRenderer.invoke("print-photo", base64, qty),
});

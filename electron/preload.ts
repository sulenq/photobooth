import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  print: (data: string) => ipcRenderer.send("print", data),
  sendPhoto: (data: string) => ipcRenderer.send("send-photo", data),
});

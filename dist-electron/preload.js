"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    print: (data) => electron_1.ipcRenderer.send("print", data),
    sendPhoto: (data) => electron_1.ipcRenderer.send("send-photo", data),
});

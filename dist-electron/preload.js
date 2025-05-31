"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    print: function (data) { return electron_1.ipcRenderer.send("print", data); },
    sendPhoto: function (data) { return electron_1.ipcRenderer.send("send-photo", data); },
});

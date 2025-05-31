"use strict";
const { app, BrowserWindow } = require("electron");
const path = require("path");
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadFile("index.html"); // placeholder, bisa diganti nanti
}
app.whenReady().then(createWindow);

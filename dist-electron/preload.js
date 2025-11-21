"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    readImage: (path) => electron_1.ipcRenderer.invoke('read-image', path)
});

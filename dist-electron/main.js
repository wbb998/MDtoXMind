"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    }
    else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
};
const electron_2 = require("electron");
const fs = require("fs");
electron_2.ipcMain.handle('read-image', async (_event, filePath) => {
    try {
        // Check if it's a URL
        if (filePath.startsWith('http')) {
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            return Buffer.from(arrayBuffer);
        }
        // Assume local path
        // Remove file:// prefix if present
        const cleanPath = filePath.replace('file://', '');
        return fs.readFileSync(cleanPath);
    }
    catch (error) {
        console.error('Failed to read image:', filePath, error);
        return null;
    }
});
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});

import { app, BrowserWindow } from 'electron'
import * as path from 'path'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

import { ipcMain } from 'electron'
import * as fs from 'fs'

ipcMain.handle('read-image', async (_event, filePath: string) => {
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
    } catch (error) {
        console.error('Failed to read image:', filePath, error);
        return null;
    }
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

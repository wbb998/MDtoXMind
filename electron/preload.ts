import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
    readImage: (path: string) => ipcRenderer.invoke('read-image', path)
})

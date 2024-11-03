import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'url'
import {GlobalKeyboardListener} from 'node-global-key-listener'
import { spawn } from 'child_process'
import processWindows from 'node-process-windows'
const v = new GlobalKeyboardListener()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
  })

  mainWindow.loadFile('./public/html/index.html')

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1)
  mainWindow.setIgnoreMouseEvents(true, { forward: true })
  mainWindow.setFocusable(false)
  mainWindow.maximize()

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('toMain', (event, data) => {
  if(data == 'hovered'){
    mainWindow.setIgnoreMouseEvents(false)
  }
  if(data == 'left'){
    mainWindow.setIgnoreMouseEvents(true, { forward: true })
  }
  console.log(data)
})
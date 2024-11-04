window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
      ipcRenderer.send(channel, data)
    },
    receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    onSplit: (callback) => ipcRenderer.on('split', (event, data) => callback(data)),
    lowerOpacity: (callback) => ipcRenderer.on('opacityMinus', (event, data) => callback(data)),
    raiseOpacity: (callback) => ipcRenderer.on('opacityPlus', (event, data) => callback(data))
})
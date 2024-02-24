
const {
    contextBridge,
    ipcRenderer
  } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })


  contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (channel, data) => {
      // whitelist channels
      let validChannels = ['show-dialog','database-function'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = ['sync-status','subscription-message'] 
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
  remove: (channel, func) => {
    let validChannels = ['sync-status','subscription-message'] 
    if (validChannels.includes(channel)) {
      ipcRenderer.off(channel, (event, ...args) => func(...args))
    }
  },
  once: (channel, func) => {
    let validChannels = ['sync-status'] // <-- Array of all ipcMain Channels used in the electron
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args))
    }
  },
  })
  
  contextBridge.exposeInMainWorld('envVars', {
    isDev: process.env.IS_DEV == "true" ? true : false,
  });
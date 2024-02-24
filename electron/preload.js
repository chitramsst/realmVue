
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
  })
  
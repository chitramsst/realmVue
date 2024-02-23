
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
      let validChannels = ['show-dialog'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    }
  })
  
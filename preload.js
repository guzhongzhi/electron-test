const { contextBridge, ipcRenderer } = require('electron');

// 安全地向渲染器进程暴露特定的API
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // 定义允许的通道（白名单）
    const validChannels = ['exampleChannel'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ['exampleChannel'];
    if (validChannels.includes(channel)) {
      // Strip out event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile')
});
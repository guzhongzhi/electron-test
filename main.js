const { app, BrowserWindow,protocol,session  } = require('electron')
const path = require('path');
const fs = require("fs")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1620,
    height: 600
  })

  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  const mySession = session.defaultSession;
  mySession.protocol.registerFileProtocol("myapp",(request,callback)=>{
        console.log(request)
      // Parse the URL to get a relative path
      const url = request.url.substr(7); // Remove 'myapp://' from the start of the URL
      const filePath = path.join(__dirname, url); // Resolve the full path
      console.log(filePath);
      // Callback with the resolved file path
      callback({ path: filePath });
  },(error)=>{
    console.log(error)
  })
  createWindow()
})
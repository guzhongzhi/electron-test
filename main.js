const { app, BrowserWindow,protocol,session,ipcMain,dialog  } = require('electron')
const path = require('path');
const fs = require("fs")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1620,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation:true,
      nodeIntegration:false,
    }
  })

  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools();
}


// Listen for IPC call to open dialog
ipcMain.handle('dialog:openFile', async () => {
  // Show a dialog to select image files
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp', 'jpeg'] }
    ]
  });

  const tmpPath = path.join(__dirname, 'tmp')

  result.filePaths.map((item)=>{
    console.log("selected:",item)
    const fileName = path.basename(item);
    const destPath = path.join(tmpPath, fileName);
    fs.copyFileSync(item, destPath);
  })

  // Return the file paths as array
  return result.filePaths.map((item)=>{
    if(item.charAt(0) != '/') {
      item = "/"+item
    }
    return "myapp://" + item;
    const fileName = path.basename(item);
    return "myapp:///tmp/"+fileName
  });
});


app.whenReady().then(() => {
  const mySession = session.defaultSession;
  const reg = /^\/([A-Z]):/i
  mySession.protocol.registerFileProtocol("myapp",(request,callback)=>{
        console.log(request)
      // Parse the URL to get a relative path
      let url = request.url.substr(8); // Remove 'myapp://' from the start of the URL
      console.log("url",url);
      let filePath = "";

      if(reg.test(url)) {
        url = url.substring(1)
        console.log("window file url",url)
        filePath = url
      } else {
        if(url.charAt(0) != "/") {
          filePath = path.join(__dirname, url); // Resolve the full path
        } else {
          filePath = url
        }
      }
                  
      const realPath = decodeURIComponent(filePath)
      console.log("real path:",realPath);
      // Callback with the resolved file path
      callback({ path: realPath });
  },(error)=>{
    console.log(error)
  })
  createWindow()
})
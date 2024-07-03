const { app, BrowserWindow } = require('electron')
// 这个函数用于创建窗口对象并加载html
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
  }
  // 这个主要用于当程序启动完成后,创建窗口对象并渲染
  app.whenReady().then(() => {
    createWindow()
   
  })

   //监听 当激活的时候 判断一下是否要继续创建窗口
   //这个是macos下的逻辑
   app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  //监听
  app.on('window-all-closed', () => {
    //macos下的逻辑
    if (process.platform !== 'darwin') app.quit()
  })
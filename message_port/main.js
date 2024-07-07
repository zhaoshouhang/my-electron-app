const { BrowserWindow, app, ipcMain, MessageChannelMain } = require("electron");

app.whenReady().then(async () => {
  // Worker 进程是一个隐藏的 BrowserWindow
  // 它具有访问完整的Blink上下文（包括例如 canvas、音频、fetch()等）的权限
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  await worker.loadFile("worker.html");

  // main window 将发送内容给 worker process 同时通过 MessagePort 接收返回值
  const mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  mainWindow.loadFile("app.html");
  mainWindow.webContents.openDevTools();

  // 在这里我们不能使用 ipcMain.handle() , 因为回复需要传输
  // MessagePort.
  // 监听从顶级 frame 发来的消息
  mainWindow.webContents.mainFrame.ipc.on("request-worker-channel", (event) => {
    // 建立新通道  ...
    const { port1, port2 } = new MessageChannelMain();
    // ... 将其中一个端口发送给 Worker ...
    worker.webContents.postMessage("new-client", null, [port1]);
    // ... 将另一个端口发送给主窗口
    event.senderFrame.postMessage("provide-worker-channel", null, [port2]);
    // 现在主窗口和工作进程可以直接相互通信，无需经过主进程！
  });
});

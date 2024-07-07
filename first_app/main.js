// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("node:path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: "增加",
          click: () => mainWindow.webContents.send("update-counter", 1),
        },
        {
          label: "减少",
          click: () => mainWindow.webContents.send("update-counter", -1),
        },
      ],
    },
  ]);
  //设置菜单
  Menu.setApplicationMenu(menu);

  // 加载 index.html
  mainWindow.loadFile("index.html");

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
};

const setTitleHandler = (event, title) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
};

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  //主进程监听
  ipcMain.on("set-title", setTitleHandler);
  //主进程双向设置
  ipcMain.handle("dialog:openFile", handleFileOpen);
  //打印到node 控制台
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  createWindow();

  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。

const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow = null;
let loginWindow = null;

function createWindow() {
  loginWindow = new BrowserWindow({
    title: "PINETREE LOGIN",
    resizable: false,
    frame: false,
    center: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  loginWindow.loadURL(`file://${path.join(__dirname, "login.html")}`);

  loginWindow.on("closed", () => {
    loginWindow = null;

    mainWindow = new BrowserWindow({
      center: true,
      kiosk: !isDev,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    mainWindow.loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // if (isDev) {
    //   mainWindow.webContents.openDevTools();
    // }

    mainWindow.on("closed", () => {
      mainWindow = null;

      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    //app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

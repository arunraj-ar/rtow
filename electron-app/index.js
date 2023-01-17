const { app, BrowserWindow } = require("electron");

const createWindow = (width, height) => {
  const win = new BrowserWindow({
    height: height,
    width: width,
    title: "rtow",
    fullscreen: true,
    titleBarStyle: "hidden",
    resizable: false,
    titleBarOverlay: true,
    icon: "./static/icon.ico"
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size;
  createWindow(width, height);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

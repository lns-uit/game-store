// Modules to control application life and create native browser window
"use-strict";
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
  session
} = require("electron");
var fs = require("fs");
var DecompressZip = require('decompress-zip');
const path = require("path");
const axios = require("axios");
const https = require("https");
const storage = require("electron-json-storage");
const { unzip } = require("zlib");
const { file } = require("@babel/types");
const agent = new https.Agent({
  rejectUnauthorized: false,
});
let mainScreen;
let loginScreen;

const NOTIFICATION_TITLE = "Game In Launcher Is Installed";
const NOTIFICATION_BODY = "You can play it right now!";

function showNotification(TITLE,BODY) {
  new Notification({
    title: TITLE,
    body: BODY,
  }).show();
}

function createMainScreen() {
  // Create the browser window.
  mainScreen = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    maxWidth: 900,
    maxHeight: 600,
    // icon: __dirname + '/texture/icon-official.png',
    frame: false,
    webPreferences: {
      webviewTag: true,
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainScreen.loadFile("index.html");

  // Open the DevTools.
  mainScreen.webContents.openDevTools();
}
function createLoginScreen() {
  loginScreen = new BrowserWindow({
    width: 700,
    height: 500,
    minWidth: 700,
    minHeight: 500,
    maxWidth: 700,
    maxHeight: 500,
    frame: false,
    webPreferences: {
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "/src/js/login.js"),
    },
  });

  loginScreen.loadFile("login.html");
  loginScreen.webContents.openDevTools();
}

ipcMain.handle("login", (event, obj) => {
  validateLogin(obj);
});
ipcMain.handle("logout", (event) => {
  storage.set("user", "{}", function (error) {
    if (error) throw error;
  });
  createLoginScreen();
  mainScreen.close();
  loginScreen.show();
});

ipcMain.handle("download", (event, obj) => {
  axios
    .get(obj.url, {
      responseType: "stream",
    })
    .then((res) => {
      if (res.status == 200) {
        if (!fs.existsSync(obj.pathGame)){
          console.log('kll')
          fs.mkdirSync(obj.pathGame);
        }
        const dir = obj.pathGame;
        res.data.pipe(fs.createWriteStream(dir + "\\Game.zip"));
        res.data.on("end", () => {
          unZipGame(obj);
        });
      } else {
        console.log(`ERROR >> ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Error ", err);
    });
});
function unZipGame(obj){
    var ZIP_FILE_PATH = obj.pathGame + "\\Game.zip";
    var DESTINATION_PATH = obj.pathGame;
    console.log(ZIP_FILE_PATH,DESTINATION_PATH)
    var unzipper = new DecompressZip(ZIP_FILE_PATH);

    // Add the error event listener
    unzipper.on('error', function (err) {
        console.log('Caught an error', err);
    });

    // Notify when everything is extracted
    unzipper.on('extract', function (log) {
        showNotification(obj.dataGame.nameGame, "Game is installed, you can play right now!")
        // console.log('Finished extracting', log);
    });

    // Notify "progress" of the decompressed files
    unzipper.on('progress', function (fileIndex, fileCount) {
      // obj.ng.textContent = 'Extracted file ' + (fileIndex + 1) + ' of ' + fileCount; 
        console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
    });
    fs.writeFile(obj.pathGame+'\\'+obj.dataGame.idGame,'{"version":"'+obj.dataGame.lastestVersion+'"}', function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
    // Start extraction of the content
    unzipper.extract({
        path: DESTINATION_PATH
        // You can filter the files that you want to unpack using the filter option
        //filter: function (file) {
            //console.log(file);
            //return file.type !== "SymbolicLink";
        //}
    });

}
const storagePath = storage.getDataPath();
console.log(storagePath);
function validateLogin(obj) {
  axios
    .post(
      "https://localhost:5001/api/user/login",
      {
        email: obj.email,
        password: obj.pwd,
      },
      {
        httpsAgent: agent,
      }
    )
    .then((response) => {
      storage.set("user", response.data, function (error) {
        if (error) throw error;
      });
      createMainScreen();
      mainScreen.show();
      loginScreen.close();
    })
    .catch((error) => {
      const options = {
        type: "question",
        buttons: ["OK"],
        defaultId: 2,
        title: "Notification",
        message: "Wrong email or password",
      };
      dialog.showMessageBox(null, options, (response, checkboxChecked) => {
        console.log(response);
        console.log(checkboxChecked);
      });
    });
}
app.commandLine.appendSwitch("ignore-certificate-errors");
app.whenReady().then(() => {
  session.defaultSession.cookies.get({ url: 'https://stun-store-preview-puce.vercel.app' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })
  storage.has("game", function (error, hasKey) {
    if (error) throw error;
    if (!hasKey) {
      storage.set("game", JSON.parse("[]"), function (error) {
        if (error) throw error;
      });
      if (!fs.existsSync(storage.getDataPath() + "\\game")) {
        fs.mkdirSync(storage.getDataPath() + "\\game");
      }
    }
  });
  storage.has("user", function (error, hasKey) {
    if (error) throw error;

    if (hasKey) {
      var headers = storage.getSync("user");
      if (headers !== "{}")
        axios
          .post(
            "https://localhost:5001/api/user/login",
            {},
            {
              httpsAgent: agent,
              headers: {
                token: headers.token,
              },
            }
          )
          .then((response) => {
            createMainScreen();
            mainScreen.show();
          })
          .catch((error) => {
            createLoginScreen();
          });
      else createLoginScreen();
    } else {
      createLoginScreen();
    }
  });
});
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

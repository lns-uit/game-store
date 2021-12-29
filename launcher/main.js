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
const ElectronGoogleOAuth2 = require('@getstation/electron-google-oauth2').default;

const Endpoint = "https://103.142.139.104:5111/"
// const Endpoint = "https://localhost:5001/"
const agent = new https.Agent({
  rejectUnauthorized: false,
});
let mainScreen;
let loginScreen;
let updateScreen;
let isKeepLogin = true;
let userInfo;


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
    icon: __dirname + './icon.png',
    frame: false,
    webPreferences: {
      devTools: false,
      webviewTag: true,
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainScreen.removeMenu();
  // and load the index.html of the app.
  mainScreen.loadFile("index.html");

  // Open the DevTools.
  // mainScreen.webContents.openDevTools();
}
function createUpdateScreen(){
    updateScreen = new BrowserWindow({
      width: 400,
      height: 200,
      minWidth: 400,
      minHeight: 200,
      maxWidth: 400,
      maxHeight: 200,
      frame: false,
      icon: __dirname + './icon.png',
      webPreferences: {
        devTools: false,
        webSecurity: false,
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, "./src/js/update.js"),
      },
    });
    updateScreen.removeMenu();
    updateScreen.loadFile("update.html");
  // loginScreen.webContents.openDevTools();
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
    icon: __dirname + './icon.png',
    webPreferences: {
      devTools: false,
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "/src/js/login.js"),
    },
  });
  loginScreen.removeMenu();
  loginScreen.loadFile("login.html");
  // loginScreen.webContents.openDevTools();
}
ipcMain.handle("login-sma",(event,obj)=>{
  CreateLoginGoogle(obj);
})
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
ipcMain.handle("request-info-user", (event, obj) =>{
  mainScreen.webContents.send('user-login', {'data': userInfo});
})
ipcMain.handle("alert", (event,obj) =>{
  const options = {
    type: "question",
    buttons: ["OK"],
    defaultId: 2,
    title: "Notification",
    message: obj.content,
  };
  dialog.showMessageBox(null, options, (response, checkboxChecked) => {
    console.log(response);
    console.log(checkboxChecked);
  });
})
ipcMain.handle("download", (event, obj) => {

  axios
    .get(obj.url, {
      responseType: "stream",
    })
    .then((res) => {
      if (res.status == 200) {
        if (!fs.existsSync(obj.pathGame)){
          fs.mkdirSync(obj.pathGame);
        }
        const dir = obj.pathGame;
        res.data.pipe(fs.createWriteStream(dir + "\\Game.zip"));
        var process = 0;
        res.data.on("data",(chunk)=>{
            process += chunk.length;
            mainScreen.webContents.send('downloading-bar', {'status': ( Math.round(process/ res.headers["content-length"] * 10000)/100) + "%"});
        })
    
        res.data.on("end", () => {
          mainScreen.webContents.send('downloading-game', {'status': 'done'});
          unZipGame(obj);
        });
      } else {
        mainScreen.webContents.send('get-link-fail', {'status': 'fail'});
      }
    })
    .catch((err) => {
      mainScreen.webContents.send('get-link-fail', {'status': 'fail'});
    });
});

ipcMain.handle("start-update",(event,obj) => {
    createUpdateScreen();
    mainScreen.close();
    updateScreen.show();
})

function unZipGame(obj){
    var ZIP_FILE_PATH = obj.pathGame + "\\Game.zip";
    var DESTINATION_PATH = obj.pathGame;
    var unzipper = new DecompressZip(ZIP_FILE_PATH);

    // Add the error event listener
    unzipper.on('error', function (err) {
        console.log('Caught an error', err);
    });

    // Notify when everything is extracted
    unzipper.on('extract', function (log) {
      try {
        fs.rmdirSync(ZIP_FILE_PATH, { recursive: true });
      } catch (err) {
        console.log(err);
      }
      mainScreen.webContents.send('end-extract', obj.dataGame);
      showNotification(obj.dataGame.nameGame, "Game is installed, you can play right now!")

    });

    // Notify "progress" of the decompressed files
    unzipper.on('progress', function (fileIndex, fileCount) {
      var text = 'Installed file game ' + (fileIndex + 1) + ' of ' + fileCount + ' ....';
      mainScreen.webContents.send('extracting', {'status': text});
    });
    fs.writeFile(obj.pathGame+'\\'+obj.dataGame.idGame,'{"version":"'+obj.dataGame.lastestVersion+'"}', function (err) {
      if (err) throw err;
    });
    // Start extraction of the content
    unzipper.extract({
        path: DESTINATION_PATH

    });

}

function CreateLoginGoogle(obj){
  const myApiOauth = new ElectronGoogleOAuth2(
    '436864193139-pp683cr97eg03a8jri9lmmmonfa0963e.apps.googleusercontent.com',
    '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',  
    ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    { successRedirectURL: 'https://stun-store.vercel.app/launcher-oauth-success' },
  );

  myApiOauth.openAuthWindowAndGetTokens()
    .then(token => {
        axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+token.access_token,{
          httpsAgent: agent,
          headers: {
            Authorization: "Bearer " + token.id_token
          }
        })
        .then (res => {
          responseGoogle(res,obj);
        })
        .catch(err => {
          console.log(err)
        })
    });
}

function responseGoogle(response,obj) {
  let data = response.data;
  axios.post(Endpoint + 'api/user/login-sma',{
    iLogin: {
      email: data.email,
      },
    iUser: {
        email: data.email,
        realname: data.name,
        avatar: data.picture,
        userName: data.email
    }
  },{
    httpsAgent: agent,
  })
  .then(response => {
    storage.set("user", response.data.token, function (error) {
      if (error) throw error;
    });
    if (!obj.keepLogin) isKeepLogin = false;
    userInfo = response.data;
    createMainScreen();
    mainScreen.show();
    loginScreen.close();
  })
  .catch(err => {
    console.log(err)
  })
}

function validateLogin(obj) {
  axios
    .post(
      Endpoint + "api/user/login",
      {
        email: obj.email,
        password: obj.pwd,
      },
      {
        httpsAgent: agent,
      }
    )
    .then((response) => {
      storage.set("user", response.data.token, function (error) {
        if (error) throw error;
      });
      if (!obj.keepLogin) isKeepLogin = false;
      userInfo = response.data;
      createMainScreen();
      mainScreen.show();
      loginScreen.close();
      
    })
    .catch((error) => {
      loginScreen.webContents.send('message-wrong-login',error.response.data.message)
      // const options = {
      //   type: "question",
      //   buttons: ["OK"],
      //   defaultId: 2,
      //   title: "Notification",
      //   message: error.data,
      // };
      // dialog.showMessageBox(null, options, (response, checkboxChecked) => {
      //   console.log(response);
      //   console.log(checkboxChecked);
      // });
    });
}
app.commandLine.appendSwitch("ignore-certificate-errors");

function OnStartLauncher(){
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
            Endpoint + "api/user/login",
            {},
            {
              httpsAgent: agent,
              headers: {
                token: headers,
              },
            }
          )
          .then((response) => {
            userInfo = response.data;
            createMainScreen();
            mainScreen.show();
          })
          .catch((error) => {
            createLoginScreen();
            loginScreen.show();
          });
      else{
        createLoginScreen();
        loginScreen.show();
      }
    } else {
      createLoginScreen();
      loginScreen.show();
    }
  });
}

app.whenReady().then(() => {
  // OnStartLauncher();
  
  OnStartLauncher();
  
});
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

app.on("window-all-closed", function () {
    if (!isKeepLogin)
      storage.set("user", "{}", function (error) {
        app.quit();
      });
      else app.quit();
});

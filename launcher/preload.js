"use-strict";

const axios = require('axios');
const https = require('https')
const storage = require('electron-json-storage');
var fs = require('fs');
const {ipcRenderer, shell, remote } = require('electron')
const { loadProgressBar } = require('axios-progress-bar')
const Endpoint = "https://103.142.139.104:5111/"
// const Endpoint = "https://localhost:5001/"
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

let btnLogout;

var btnListGame ;
var gameView ;
// RENDER GAME COLLECTION
var imgAvatar;
var imgGameHeader;
var nameGame;
var gamePathStorage = storage.getDataPath()+'\\game';
var btnPlayInstall;
var btnPlayContainer;
var downloadProcess;
var textDownloading;
var btnUninstallContainer;
var shortDescription;
var detailDescription;
var btnNavCollection;
var processDownloading;
var username;
var avatarUser;
var gameBrowse;
var btnNavBrowse;
var gameViewContainer;
var ecs234a11;
var userInfo;
var btnUpdateLauncher;
let isOnInstall = false;
let pathGameOnInstall = "";

const fsPromises = require('fs').promises;

window.onload = function(){
    ipcRenderer.invoke('request-info-user',null)
    btnListGame = document.getElementById('game-view-list-btn');
    gameView = document.getElementById('game-view-content')
    gameBrowse = document.getElementById('game-browse')
    imgGameHeader = document.getElementById('img-detail-game');
    imgAvatar = document.getElementById('img-icon-game');
    nameGame = document.getElementById('name-game')
    btnPlayInstall = document.getElementById('btn-play-game');
    btnPlayContainer = document.getElementById('btn-play-container');
    downloadProcess = document.getElementById('download-process')
    textDownloading = document.getElementById('text-downloading')
    btnUninstallContainer = document.getElementById('btn-uninstall-container');
    shortDescription = document.getElementById('short-description')
    detailDescription = document.getElementById('detail-description')
    btnNavCollection = document.getElementById('btn-nav-collection')
    btnLogout = document.getElementById('btn-logout');
    username = document.getElementById('username');
    avatarUser = document.getElementById('avatar-user');
    btnNavBrowse = document.getElementById('btn-nav-browse')
    gameViewContainer = document.getElementById('game-view-container')
    ecs234a11 = document.getElementById('ecs234a11');
    btnUpdateLauncher = document.getElementById('btn-update-launcher');

    processDownloading = false;
    loadProgressBar()
  
    NavClick(0);
    btnLogout.onclick = function () {
      ipcRenderer.invoke('logout');
    }
    btnNavCollection.onclick = function() {
      NavClick(0)
      GetGameData();
    }
    btnNavBrowse.onclick = function(){
      NavClick(1)
    }
    btnUpdateLauncher.onclick = () => {
        ipcRenderer.invoke('start-update',null);
    }
    ipcRenderer.on('user-login', function (event,data){
        userInfo = data.data;

        username.textContent = userInfo.user.userName;
        avatarUser.src = userInfo.user.avatar;
        GetGameData();
    })
    ipcRenderer.on('downloading-game', function (event, data){
        btnPlayInstall.textContent = "INSTALLING..."
    })

    ipcRenderer.on('extracting', function(event, data){
        textDownloading.textContent = data.status;
    })
    ipcRenderer.on('end-extract', function(event, data){
        textDownloading.textContent = '';
        ChangeBtnPlayStatus("PLAY","pointer",false);
        btnPlayContainer.disabled = false;
        textDownloading.textContent = "";
        downloadProcess.style.width = "0";
        btnUninstallContainer.style.display = "flex";
        OnGameInstalled(data);
    })
    ipcRenderer.on('downloading-bar',function(event,data){
        textDownloading.textContent = "Downloading " + data.status;
        downloadProcess.style.width = data.status;
    })
    ipcRenderer.on('get-link-fail',function(event,data){
        FailGetDownload()  
    })
    
}

function NavClick(index){
    if (index === 0){
      gameViewContainer.style.display = "grid";
      gameBrowse.style.display = "none";
      btnNavBrowse.style.background = "#111111";
      btnNavCollection.style.background = "#2e2e2e";
      ecs234a11.textContent = "COLLECTION"
    } else {
      gameViewContainer.style.display = "none";
      gameBrowse.style.display = "block";
      btnNavBrowse.style.background = "#2e2e2e";
      btnNavCollection.style.background = "#111111";
      ecs234a11.textContent = "STUN STORE"
    }
}

function FailGetDownload(){
  ChangeBtnPlayStatus("FAIL GET URL DOWNLOAD","none",true);
    setTimeout(function(){
      ChangeBtnPlayStatus("INSTALL","pointer",false);
    }, 2000);
   
}

function GetGameData(){
   
    axios.get(Endpoint+"api/collection/" + userInfo.user.idUser,
        {
            headers: {
                Authorization: "Bearer " + userInfo.token
            }
        }
    )
    .then(res => {
        btnListGame.textContent = null;
        res.data.listGame.forEach(item => {
            RenderGameItem(item.game);
        });
 
    })
    .catch(error => {
        console.log(error)
    })
}

function RenderGameItem(data){
    var btnGameItem = document.createElement('div');
    btnGameItem.classList.add('btn-game-item')
    
    var imgGameItem = document.createElement('img');
    imgGameItem.src = data.imageGameDetail[0].url;
    
    var titleGameItem = document.createElement('div');
    titleGameItem.classList.add('title-game-item');
    titleGameItem.textContent =  data.nameGame;

    btnGameItem.appendChild(imgGameItem);
    btnGameItem.appendChild(titleGameItem);
    btnListGame.appendChild(btnGameItem);
    btnGameItem.onclick = function() {
      if (!processDownloading) GetGameDetail(data)
    }
}

function GetGameDetail(game){

    imgGameHeader.src = "./src/texture/backLoading.gif";
    imgAvatar.src =  "./src/texture/iconLoading.gif";
    nameGame.textContent = "";
    shortDescription.textContent = "";
    detailDescription.innerHTML = "";

    axios.get(Endpoint+"api/gameversion/by-game/lastest-version/"+game.idGame,
        {
            headers: {
                Authorization: "Bearer " + userInfo.token
            },
        }
    )
    .then(res => {
        gameView.style.display = "block";
        RenderGameDetail(res.data)
    })
    .catch(error => {
        console.log(error)
    })
}
function RenderGameDetail(data){
    imgGameHeader.src = data.imageGameDetail[1].url;

    imgAvatar.src =  data.imageGameDetail[0].url;

    nameGame.textContent = data.nameGame;

    shortDescription.textContent = data.newVersion.shortDescription;
    detailDescription.innerHTML = data.newVersion.descriptions;

    var pathGame = gamePathStorage + '\\'+ data.idGame;
    if (fs.existsSync(pathGame)){
        fs.readFile(pathGame+'\\'+data.idGame, function(err, d) {
            if (err) {
                btnPlayInstall.textContent = "INSTALL"
                btnPlayInstall.disabled = false; 
                btnUninstallContainer.style.display = "none";
                throw err;
            } else {
                var info = JSON.parse(d);
                if (data.lastestVersion === info.version) { 
                    btnPlayInstall.textContent = "PLAY";
                    btnPlayInstall.disabled = false; 
                    btnUninstallContainer.style.display = "flex";
                }
                    else {
                        btnPlayInstall.textContent = "UPDATE";
                        btnPlayInstall.disabled = false; 
                        btnUninstallContainer.style.display = "flex";
                    }
            }
            
        })
    } else {
        btnPlayInstall.textContent = "INSTALL"
        btnPlayInstall.disabled = false; 
        btnUninstallContainer.style.display = "none";
    }
    btnUninstallContainer.onclick = function(){
        var pathGame = gamePathStorage + '\\'+ data.idGame;
        try {
          fs.rmdirSync(pathGame, { recursive: true });
          if (fs.existsSync(pathGame)) {
              ipcRenderer.invoke('alert',{'content':'Game is running, Quit game before uninstall'})
          } else {
              btnUninstallContainer.style.display = "none";
              btnPlayInstall.textContent = "INSTALL"
          }
         
        } catch (err) {
          console.log(err);
        }
          
 
    }
    btnPlayContainer.onclick = function(){
        
        var pathGame = gamePathStorage + '\\'+ data.idGame;
        if (btnPlayInstall.textContent === 'INSTALL'){
            ChangeBtnPlayStatus("DOWNLOADING...","wait",true);
            GetUrlDownload(pathGame,data)
            
        } else if ( btnPlayInstall.textContent === "UPDATE") {
            ChangeBtnPlayStatus("UPDATING...","wait",true);
            GetUrlDownload(pathGame,data)
        } else {
            shell.openPath(pathGame + "\\" + data.newVersion.filePlay)
        }
    }

}

function ChangeBtnPlayStatus(text,cursor,status){
  btnPlayContainer.disabled = status;
  btnPlayInstall.textContent = text
  btnPlayInstall.style.cursor = cursor
  processDownloading = status;
}

function GetUrlDownload(pathGame,data){
    axios.get(Endpoint+"api/gameversion/by-game/url-download",
        {
            headers: {
                'idGameVersion': data.newVersion.idGameVersion,
                Authorization: "Bearer " + userInfo.token
            }
        }
    )
    .then(res => {
        isOnInstall = true;
        pathGameOnInstall = pathGame;
        var obj = {url: res.data, pathGame: pathGame, dataGame: data};
        ipcRenderer.invoke('download',obj);
    })
    .catch(error => {
        ChangeBtnPlayStatus("INSTALL","pointer",false);
    })
}


function OnGameInstalled(data){
    isOnInstall = false;
    pathGameOnInstall = "";
    axios.get(Endpoint+"api/game/installed",
        {
            headers: {
                'idGame': data.idGame,
                Authorization: "Bearer " + userInfo.token
            }
        }
    )
    .then(res => {
        console.log(res);
    })
    .catch(error => {
    })
}



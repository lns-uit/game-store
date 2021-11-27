"use-strict";
const path = require('path')
const axios = require('axios');
const https = require('https')
const storage = require('electron-json-storage');
var fs = require('fs');
const { createElement } = require('react');
const { doc } = require('prettier');
var headers = storage.getSync("user");
const {ipcRenderer, shell} = require('electron')
var gameStorage = storage.getSync('game')
const agent = new https.Agent({
  rejectUnauthorized: false,
});
var downloadH;
var btnListGame = document.getElementById('game-view-list-btn');
var gameView = document.getElementById('game-view-content')
// RENDER GAME COLLECTION
var dataGameItem;

var gamePathStorage = storage.getDataPath()+'\\game';
var urltest = "https://firebasestorage.googleapis.com/v0/b/docprintx.appspot.com/o/SniperLegendary.zip?alt=media&token=dfda1b30-542c-4350-925c-65d7683759d3"

function GetGameData(){
    axios.get("https://localhost:5001/api/game",
        {
            headers: {
                Authorization: "Bearer " + headers.token
            }
        }
    )
    .then(res => {

        dataGameItem =res.data;
        res.data.forEach(item => {
            RenderGameItem(item);
        });
    })
    .catch(error => {
        console.log('cpm')
    })
}
GetGameData();
function RenderGameItem(data){

    var btnGameItem = document.createElement('div');
    btnGameItem.classList.add('btn-game-item')
    
    var imgGameItem = document.createElement('img');
    // imgGameItem.src = data.imageGameDetail[0];
    imgGameItem.height = '50';
    imgGameItem.width = '50';
    
    var titleGameItem = document.createElement('div');
    titleGameItem.classList.add('title-game-item');
    titleGameItem.textContent =  data.nameGame;

    btnGameItem.appendChild(imgGameItem);
    btnGameItem.appendChild(titleGameItem);
    btnListGame.appendChild(btnGameItem);
    btnGameItem.onclick = function() {
        GetGameDetail(data)
    }
}

function GetGameDetail(game){

    axios.get("https://localhost:5001/api/gameversion/by-game/"+game.idGame + "/"+ game.lastestVersion,
        {
            headers: {
                Authorization: "Bearer " + headers.token
            }
        }
    )
    .then(res => {
        RenderGameDetail(res.data)
    })
    .catch(error => {
        console.log('cpm')
    })
}
console.log(storage.getDataPath())
function RenderGameDetail(data){
    gameView.textContent = null;
    var imgGameHeaderContainer = document.createElement('div');
    imgGameHeaderContainer.classList.add('img-game-view-header');
    var imgGameHeader = document.createElement('img');
    imgGameHeader.src = data.imageGameDetail[1].url;
    imgGameHeaderContainer.appendChild(imgGameHeader)

    var gameViewBody = document.createElement('div');
    gameViewBody.classList.add('game-view-body');
    var avatarGame = document.createElement('div');
    avatarGame.classList.add('avatar-game-view');
    gameViewBody.appendChild(avatarGame);
    
    var imgAvatar = document.createElement('img');
    imgAvatar.src =  data.imageGameDetail[0].url;
    avatarGame.appendChild(imgAvatar);

    var nameGame = document.createElement('h1');
    nameGame.textContent = data.nameGame;
    gameViewBody.appendChild(nameGame);

    var btnPlayInstall = document.createElement('div');
    btnPlayInstall.classList.add('btn-play-update')
    btnPlayInstall.textContent = "INSTALL"

    gameStorage.forEach(item => {
        if (item.idGame === data.idGame) {
            if (item.lastestVersion === data.lastestVersion) btnPlayInstall.textContent = "PLAY";
                else btnPlayInstall.textContent = "UPDATE";
            return
        } 
    });
    btnPlayInstall.onclick = function(){
        var pathGame = gamePathStorage + '\\'+ data.idGame;
        if (btnPlayInstall.textContent === 'INSTALL'){
            
            if (!fs.existsSync(pathGame)){
                fs.mkdirSync(pathGame);
            }

            var obj = {url: urltest, pathGame: pathGame, dataGame: data};
            ipcRenderer.invoke('download',obj);
            

            console.log('install')
        } else if ( btnPlayInstall.textContent = "UPDATE") {
            console.log('update')
        } else {
            shell.openPath(pathGame + "\\" + data.filePlay)
            console.log('start')
        }
    }
    gameViewBody.appendChild(btnPlayInstall)

    var downloadBar = document.createElement('div');
    downloadBar.classList.add('downloading-bar')
    var downloadHandle = document.createElement('div');
    downloadHandle.classList.add('handle-downloading');
    downloadBar.appendChild(downloadHandle);

    downloadH = downloadHandle;

    gameView.appendChild(imgGameHeaderContainer)
    gameView.appendChild(gameViewBody);
    gameView.appendChild(downloadBar);
}

function GetUrlDownload(){
    axios.get("https://localhost:5001/api/gameversion/by-game/url-download",
        {
            headers: {
                'idGameVersion': '4d858116-b428-41cc-9401-f97822ee551d',
                Authorization: "Bearer " + headers.token
            }
        }
    )
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log('cpm')
    })
}



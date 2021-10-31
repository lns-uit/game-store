// import { BrowserWindow  } from 'electron'
var remote = require("electron").remote;
var minimize = document.getElementById("btn-minimize")
var maximize = document.getElementById("btn-maximize")
var quit = document.getElementById("btn-exit")

minimize.addEventListener("click",minimizeApp)
maximize.addEventListener("click",maximizeApp)
quit.addEventListener("click",quitApp)

function minimizeApp(){
    var window = remote.getCurrentWindow();
    window.minimize();
}

function maximizeApp(){
    var window = remote.getCurrentWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
}

function quitApp(){
    var window = remote.getCurrentWindow();
    window.close();
}
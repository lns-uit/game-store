const {ipcRenderer} = require('electron')

let btnLogin;
let email;
let pwd;

window.onload = function () {
    email = document.getElementById("email");
    pwd = document.getElementById("pwd");
    btnLogin = document.getElementById("btn-login");
    
    email.onkeydown = function (e){
        if (e.keyCode === 13) {
            const obj = {email: email.value, pwd: pwd.value}
            ipcRenderer.invoke("login",obj);
        }
    }
    pwd.onkeydown = function (e){
        if (e.keyCode === 13) {
            const obj = {email: email.value, pwd: pwd.value}
            ipcRenderer.invoke("login",obj);
        }
    }

    btnLogin.onclick = function () {
        const obj = {email: email.value, pwd: pwd.value}
        ipcRenderer.invoke("login",obj);
    }
}
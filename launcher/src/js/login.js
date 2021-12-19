"use-strict";
const {ipcRenderer} = require('electron')

 
let btnLogin;
let email;
let pwd;
var slideIndex = 1;
var rightSlide;
var leftSlide;
var keepLoginCheckBox;
var lbKeepLogin;
let btnLoginWithGoogle;
let wrongTextLogin;
window.onload = function () {
    email = document.getElementById("email");
    pwd = document.getElementById("pwd");
    btnLogin = document.getElementById("btn-login");
    rightSlide = document.getElementById("right-slide")
    leftSlide = document.getElementById("left-slide")
    keepLoginCheckBox = document.getElementById('keep-login')
    lbKeepLogin = document.getElementById('label-keep-login')
    wrongTextLogin = document.getElementById('text-wrong-login');
    btnLoginWithGoogle = document.getElementById('btn-login-with-google')

    lbKeepLogin.onclick = () => {
        keepLoginCheckBox.checked = !keepLoginCheckBox.checked;
    }
    email.onkeydown = function (e){
        if (e.keyCode === 13) {
            onLogin();
        }
    }
    pwd.onkeydown = function (e){
        if (e.keyCode === 13) {
            onLogin();
        }
    }

    btnLogin.onclick = function () {
        onLogin();
    }
    btnLoginWithGoogle.onclick = function () {
        onLoginWithGG();
    }
    ipcRenderer.on('message-wrong-login',function(event,data){
        wrongTextLogin.style.display = 'flex';
        wrongTextLogin.innerHTML  = data;
    })
    function onLogin(){
        const obj = {email: email.value, pwd: pwd.value, keepLogin: keepLoginCheckBox.checked}
        ipcRenderer.invoke("login",obj);
    }
    function onLoginWithGG(){
        const obj = {keepLogin: keepLoginCheckBox.checked}
        ipcRenderer.invoke("login-sma",obj);
    }

    rightSlide.onclick = function () {
        plusSlides(1);
    }
    leftSlide.onclick = function () {
        plusSlides(-1);
    }
    showSlides(slideIndex);
    
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    function plusSlidesAuto(n) {
        showSlides(slideIndex += n);
        setTimeout(plusSlidesAuto,15000,1)
    }
    
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }

      slides[slideIndex-1].style.display = "block";  


    }
    setTimeout(plusSlidesAuto,15000,-1)

}
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATkUCik1Ow1YCH9UT8T_K8QyMIechZzVg",
    authDomain: "web-game-326ed.firebaseapp.com",
    projectId: "web-game-326ed",
    storageBucket: "web-game-326ed.appspot.com",
    messagingSenderId: "737770284154",
    appId: "1:737770284154:web:7af84a4f9ca401d63dc7c3",
    measurementId: "G-K7XLF0QQZ2"
};

firebase.initializeApp(firebaseConfig) 

const storage = firebase.storage();

export {storage, firebase as default};
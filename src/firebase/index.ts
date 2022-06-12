import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdZsclVdhNO5SQUxkq-5500gCfiOMushE",
  authDomain: "cloudstunapp.firebaseapp.com",
  projectId: "cloudstunapp",
  storageBucket: "cloudstunapp.appspot.com",
  messagingSenderId: "936873551926",
  appId: "1:936873551926:web:ba7f4d89f5a1e329f01097",
  measurementId: "G-MVRTZNLMQV"
};

firebase.initializeApp(firebaseConfig) 

const storage = firebase.storage();

export {storage, firebase as default};
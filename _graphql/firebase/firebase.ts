// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBqHDuo2G9fQB6Frj_M7t_Gnk8F7-GbOxc",

  authDomain: "socialmedia-stuff.firebaseapp.com",

  projectId: "socialmedia-stuff",

  storageBucket: "socialmedia-stuff.appspot.com",

  messagingSenderId: "935743236141",

  appId: "1:935743236141:web:d03c5f2ec6a8fc486270a4",

  measurementId: "G-NBEFBS6T9X"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

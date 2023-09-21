"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5bkkdo8dLAWZY9eE4sRHQE9lOOoYpg0E",
  authDomain: "cyber-blog-imageupload.firebaseapp.com",
  projectId: "cyber-blog-imageupload",
  storageBucket: "cyber-blog-imageupload.appspot.com",
  messagingSenderId: "697666983004",
  appId: "1:697666983004:web:debb2905f8623ab1ef4299",
  measurementId: "G-4WQ5CFJEFG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

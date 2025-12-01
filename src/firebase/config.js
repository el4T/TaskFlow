// src/firebase/config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUD0AAyI_Wm7dI7ewL_XwSlk7r0Dkmf_E",
  authDomain: "taskflow-dcbf6.firebaseapp.com",
  projectId: "taskflow-dcbf6",
  storageBucket: "taskflow-dcbf6.firebasestorage.app",
  messagingSenderId: "839384376302",
  appId: "1:839384376302:web:da02de6ceb2f51103664ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
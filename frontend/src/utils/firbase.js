// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
import {getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualcoursedemo.firebaseapp.com",
  projectId: "virtualcoursedemo",
  storageBucket: "virtualcoursedemo.firebasestorage.app",
  messagingSenderId: "49467555175",
  appId: "1:49467555175:web:7baf68124472777b5a43c2",
  measurementId: "G-PZBKHXFNQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 
const analytics = getAnalytics(app);

export { auth, provider };
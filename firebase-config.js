// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBslZQf7Zmzy2sV0jLUPQNTIrVEzPEXrjU",
  authDomain: "tbet-ba0fb.firebaseapp.com",
  databaseURL: "https://tbet-ba0fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tbet-ba0fb",
  storageBucket: "tbet-ba0fb.firebasestorage.app",
  messagingSenderId: "396881842090",
  appId: "1:396881842090:web:85f1692ecc61e045bba5d3",
  measurementId: "G-0RBKKTKHB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.FIREBASE_CONFIG = null;

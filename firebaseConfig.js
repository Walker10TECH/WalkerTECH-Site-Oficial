// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMFcAGXTS382KwLdjMwzovWl6S4nkznlo",
  authDomain: "walkertech-cyberdev-llc-brasil.firebaseapp.com",
  projectId: "walkertech-cyberdev-llc-brasil",
  storageBucket: "walkertech-cyberdev-llc-brasil.appspot.com",
  messagingSenderId: "64720691702",
  appId: "1:64720691702:web:cd9ba2770737952d1a27d7",
  measurementId: "G-E11R1MJPKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2RPLzGqoZFxDh4utqXrtfXQbWB5XqlFQ",
  authDomain: "blogging-app-34505.firebaseapp.com",
  projectId: "blogging-app-34505",
  storageBucket: "blogging-app-34505.appspot.com",
  messagingSenderId: "104012714386",
  appId: "1:104012714386:web:e2a6fb6743bb829d5f714b",
  measurementId: "G-NXEWJ307PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
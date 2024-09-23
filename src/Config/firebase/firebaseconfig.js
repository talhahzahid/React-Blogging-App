import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2RPLzGqoZFxDh4utqXrtfXQbWB5XqlFQ",
  authDomain: "blogging-app-34505.firebaseapp.com",
  projectId: "blogging-app-34505",
  storageBucket: "blogging-app-34505.appspot.com",
  messagingSenderId: "104012714386",
  appId: "1:104012714386:web:e2a6fb6743bb829d5f714b",
  measurementId: "G-NXEWJ307PF"
};

   export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

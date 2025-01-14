import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "my-life-calendars.firebaseapp.com",
    projectId: "my-life-calendars",
    storageBucket: "my-life-calendars.firebasestorage.app",
    messagingSenderId: "699790810573",
    appId: "1:699790810573:web:50b463e2032fcd4821f884",
    measurementId: "G-R3TMYNB8XT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
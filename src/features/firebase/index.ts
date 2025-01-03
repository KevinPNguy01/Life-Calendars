import dotenv from 'dotenv';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "kevins-life-stats.firebaseapp.com",
    projectId: "kevins-life-stats",
    storageBucket: "kevins-life-stats.firebasestorage.app",
    messagingSenderId: "393482042831",
    appId: "1:393482042831:web:538c293a0fcd9d74bfa6ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
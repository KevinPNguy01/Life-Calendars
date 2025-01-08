import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "kevins-life-stats.firebaseapp.com",
    projectId: "kevins-life-stats",
    storageBucket: "kevins-life-stats.firebasestorage.app",
    messagingSenderId: "393482042831",
    appId: "1:393482042831:web:538c293a0fcd9d74bfa6ba",
    measurementId: "G-ZDZNVB0FVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
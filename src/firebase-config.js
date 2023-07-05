// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCdyT2HP4TqC7pvpS_pD25gygklxh0qoMM",
    authDomain: "nipzchat-ad16b.firebaseapp.com",
    projectId: "nipzchat-ad16b",
    storageBucket: "nipzchat-ad16b.appspot.com",
    messagingSenderId: "44052953939",
    appId: "1:44052953939:web:e4da9d323117d3d5b43fa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
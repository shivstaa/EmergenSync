
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAnjhsDxvCyQ8AAGKisN9xyGbfvPToN8cw",
    authDomain: "emergensync-eb089.firebaseapp.com",
    databaseURL: "https://swapwork-406a0-default-rtdb.firebaseio.com",
    projectId: "emergensync-eb089",
    storageBucket: "emergensync-eb089.appspot.com",
    messagingSenderId: "632325049802",
    appId: "1:632325049802:web:3e3c5634592877d5ff1333",
    measurementId: "G-KNG7DTT9GT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
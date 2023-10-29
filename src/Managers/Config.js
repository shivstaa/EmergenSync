const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAnjhsDxvCyQ8AAGKisN9xyGbfvPToN8cw",
    authDomain: "emergensync-eb089.firebaseapp.com",
    projectId: "emergensync-eb089",
    storageBucket: "emergensync-eb089.appspot.com",
    messagingSenderId: "632325049802",
    appId: "1:632325049802:web:3e3c5634592877d5ff1333",
    measurementId: "G-KNG7DTT9GT",
  };
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

module.exports = { auth, provider, db };

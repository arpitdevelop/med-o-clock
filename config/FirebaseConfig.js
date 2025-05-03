// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = process.env.FIREBASE_API_KEY;
const firebaseConfig = {
  // apiKey: API_KEY,
  apiKey: "AIzaSyBPw2rhd6ty-hIEy7nipI0YRlO4dssRtKQ",
  authDomain: "med-o-clock.firebaseapp.com",
  projectId: "med-o-clock",
  storageBucket: "med-o-clock.firebasestorage.app",
  messagingSenderId: "473983288797",
  appId: "1:473983288797:web:906a80a36b0df6ffbc2234",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a2e4b.firebaseapp.com",
  projectId: "mern-estate-a2e4b",
  storageBucket: "mern-estate-a2e4b.appspot.com",
  messagingSenderId: "513907151617",
  appId: "1:513907151617:web:daaff4f11bd81e897b4100"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
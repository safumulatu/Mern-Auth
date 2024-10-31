// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-343d5.firebaseapp.com",
  projectId: "mern-auth-343d5",
  storageBucket: "mern-auth-343d5.appspot.com",
  messagingSenderId: "696870416937",
  appId: "1:696870416937:web:8399d209c47495295ce238",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

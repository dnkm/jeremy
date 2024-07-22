import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuGuCaO-VApmiveaSuYExNz9axRPO7xoM",
  authDomain: "helping-hand-1cc97.firebaseapp.com",
  projectId: "helping-hand-1cc97",
  storageBucket: "helping-hand-1cc97.appspot.com",
  messagingSenderId: "939574973924",
  appId: "1:939574973924:web:aa6d7924480c7f217c23f1",
  measurementId: "G-55K6K95Q25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

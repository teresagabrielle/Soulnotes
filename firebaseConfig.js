// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLICV8UAmHfFLY2_pF3Ha5hrC2mOI7R-E",
  authDomain: "soulnotes-854c7.firebaseapp.com",
  databaseURL: "https://soulnotes-854c7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "soulnotes-854c7",
  storageBucket: "soulnotes-854c7.firebasestorage.app",
  messagingSenderId: "252319801921",
  appId: "1:252319801921:web:bc3cb02e0f9de57182dcc0",
  measurementId: "G-CV7WHY8NKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  // Initialize Realtime Database
const auth = getAuth(app);    // Initialize Firebase Authentication

export { app, db, auth, ref, push };

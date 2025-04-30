import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase config
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

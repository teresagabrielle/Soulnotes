import {
  getAuth,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { firebaseConfig } from "./firebaseConfig.js";
import { auth, db } from './firebaseConfig.js';

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

document.getElementById("setPasswordBtn").addEventListener("click", async () => {
  const password = document.getElementById("passwordInput").value;
  const username = localStorage.getItem("adminUsername");

  if (!password || password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  try {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in.");
      return;
    }

    await updatePassword(user, password);

    // Simpan flag bahwa password sudah di-setup
    await set(ref(db, `users/${user.uid}`), {
      nickname: username + " (admin)",
      role: "admin",
      passwordSetupDone: true
    });

    alert("Password set successfully!");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Error setting password:", error);
    alert("Error: " + error.message);
  }
});

// --- EYE ICON TOGGLE ---
const passwordInput = document.getElementById("passwordInput");
const eyeSlash = document.getElementById("eyeSlash");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput && eyeSlash) {
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    eyeSlash.style.display = isHidden ? "none" : "block";
  });
}

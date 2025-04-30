import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import {
    getAuth,
    onAuthStateChanged,
    updatePassword
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  import {
    getDatabase,
    ref,
    set
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { firebaseConfig } from "./firebaseConfig.js";
  
  // Init
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);
  
  // DOM Ready
  window.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("passwordInput");
    const togglePassword = document.getElementById("togglePassword");
    const eyeSlash = document.getElementById("eyeSlash");
    const setPasswordBtn = document.getElementById("setPasswordBtn");
  
    // Toggle eye
    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      eyeSlash.style.display = isHidden ? "none" : "block";
    });
  
    // Wait until user is logged in
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("You must log in first.");
        window.location.href = "index.html";
        return;
      }
  
      // Admin confirmed logged in, enable button
      setPasswordBtn.addEventListener("click", async () => {
        const password = passwordInput.value.trim();
        const username = localStorage.getItem("adminUsername");
  
        if (!password || password.length < 8) {
          alert("Password must be at least 8 characters.");
          return;
        }
  
        try {
          await updatePassword(user, password);
  
          await set(ref(db, `users/${user.uid}`), {
            nickname: username + " (admin)",
            role: "admin",
            passwordSetupDone: true
          });
  
          alert("Password set successfully!");
          window.location.href = "dashboard.html";
  
        } catch (err) {
          console.error(err);
          alert("Error: " + err.message);
        }
      });
    });
  });
x`  `  
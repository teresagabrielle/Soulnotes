// Import modul Firebase yang dibutuhkan
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { auth, db } from './firebaseConfig.js';

// Menggunakan auth dan db yang sudah diinisialisasi di HTML
const auth = getAuth();
const db = getFirestore();

// Daftar email admin yang sudah diset di Firebase
const adminEmails = [
  "admin.rian01@soulnotes.com",
  "admin.bielle02@soulnotes.com",
  "admin.cilla03@soulnotes.com",
  "admin.pieter04@soulnotes.com",
  "admin.heaven05@soulnotes.com",
  "admin.theo06@soulnotes.com",
  "admin.vanessa07@soulnotes.com"
];

document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!email || !password) return alert("Please fill in both fields.");

  try {
    if (adminEmails.includes(email)) {
      // Admin sign-up tanpa password
      const userCredential = await createUserWithEmailAndPassword(auth, email, "defaultPassword");  // Set default password
      const user = userCredential.user;

      // Create user data in Firestore for admin
      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "admin", // Set role admin
      });

      alert("Admin account created!");
      window.location.href = "dashboard.html"; // Redirect to dashboard for admin
    } else {
      // Regular user signup, using anonymous sign-in
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Create user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "user", // Default role
      });

      window.location.href = "setup-nickname.html"; // Redirect to nickname setup for regular user
    }
  } catch (error) {
    console.error("Error during sign up:", error.message);
    alert("Error during sign up. Please try again.");
  }
});

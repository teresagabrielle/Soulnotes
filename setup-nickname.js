// Import modul Firebase yang dibutuhkan
import { auth, db } from './firebaseConfig.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Menggunakan auth dan db yang sudah diinisialisasi di HTML
const auth = getAuth();
const db = getFirestore();

// Menunggu user terautentikasi
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Jika user sudah login, set event listener untuk submit nickname
    document.getElementById("submitNickname").addEventListener("click", async () => {
      const nickname = document.getElementById("nicknameInput").value.trim();
      
      if (!nickname) return alert("Nickname cannot be empty.");
      
      // Menyimpan nickname ke Firestore
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { nickname: nickname }, { merge: true });

        alert("Nickname successfully set!");
        window.location.href = "dashboard.html";  // Redirect ke dashboard setelah sukses
      } catch (error) {
        console.error("Error saving nickname:", error.message);
        alert("Failed to save nickname.");
      }
    });
  } else {
    // Jika user tidak login, arahkan ke halaman login
    window.location.href = "index.html";
  }
});

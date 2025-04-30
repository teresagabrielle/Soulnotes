// Mengimpor konfigurasi Firebase
import { auth, } from './firebaseConfig.js';
// Import modul Firebase yang dibutuhkan
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Menggunakan auth dan db yang sudah diinisialisasi di HTML
const auth = getAuth();
const db = getFirestore();

// Setelah login, periksa role pengguna
document.addEventListener("DOMContentLoaded", async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      // Mendapatkan token untuk role dari Firebase Authentication
      const idToken = await user.getIdTokenResult();
      const role = idToken.claims.role;

      // Cek apakah role admin atau user
      if (role === 'admin') {
        console.log('User is an admin');
        // Tampilkan elemen khusus admin jika perlu
        document.getElementById('adminSection').style.display = 'block';
      } else {
        console.log('User is a regular user');
        // Redirect atau tampilkan pesan jika bukan admin
        window.location.href = "user-dashboard.html";  // Redirect ke dashboard user
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    }
  } else {
    // Jika tidak ada user yang terautentikasi
    console.log("No user is logged in");
    window.location.href = "index.html";  // Redirect ke halaman login jika tidak ada user yang login
  }
});

// Cek jika nickname sudah ada di localStorage
const nickname = localStorage.getItem("nickname");

if (!nickname) {
  // Jika nickname belum ada, redirect ke login.html
  window.location.href = "login.html"; // Redirect ke halaman login
} else {
  // Menampilkan nickname di dashboard
  document.addEventListener("DOMContentLoaded", () => {
    const nicknameDisplay = document.getElementById("nicknameDisplay");

    if (nicknameDisplay) {
      nicknameDisplay.textContent = `Welcome, ${nickname}!`;
    } else {
      console.error("Elemen dengan ID 'nicknameDisplay' tidak ditemukan!");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("galleryContainer");
  const gallery = JSON.parse(localStorage.getItem("gallery") || "[]");

  gallery.forEach(note => {
    const div = document.createElement("div");
    div.className = "gallery-note";
    div.innerHTML = `
      <p>"${note.text}"</p>
      ${note.to ? `<p><strong>To:</strong> ${note.to}</p>` : ""}
      ${note.from ? `<p><strong>From:</strong> ${note.from}</p>` : ""}
    `;
    galleryContainer.appendChild(div);
  });
});

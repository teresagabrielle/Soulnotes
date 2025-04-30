import { auth, db } from './firebaseConfig.js';
import { getAuth, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

window.addEventListener("DOMContentLoaded", async () => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (userData.role !== "admin") {
        // Jika bukan admin, arahkan ke halaman lain
        window.location.href = "dashboard.html";  // Ganti dengan halaman lain jika perlu
      }

      // Menampilkan data profil admin
      document.getElementById("nicknameDisplay").textContent = userData.nickname;
      document.getElementById("genderDisplay").textContent = userData.gender;
      document.getElementById("birthDisplay").textContent = `${userData.birthdate.day}/${userData.birthdate.month}/${userData.birthdate.year}`;
    }
  } else {
    alert("User is not logged in.");
    window.location.href = "index.html";  // Redirect jika user belum login
  }
});

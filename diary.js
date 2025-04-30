// Mengimpor konfigurasi Firebase
import { auth, db, } from './firebaseConfig.js';
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

// Menangani pengambilan data diary dari Firebase
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDiaryRef = collection(db, "diaries");
    const q = query(userDiaryRef, where("uid", "==", user.uid), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const container = document.getElementById("diaryNotes");

    if (snapshot.empty) {
      container.innerHTML = "<p>No diary entries yet.</p>";
    } else {
      snapshot.forEach((doc) => {
        const note = doc.data();
        const card = document.createElement("div");
        card.className = "note-card";
        card.textContent = note.story;
        container.appendChild(card);
      });
    }
  }
});

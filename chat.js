// Pastikan Anda sudah mengonfigurasi Firebase di sini
import { db, ref, push } from './firebaseConfig.js';  // Periksa ini sudah diimpor dengan benar

// Ketika halaman chat dimuat, ambil cerita dari localStorage
window.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const storyText = localStorage.getItem("chatDraft");
  const nickname = localStorage.getItem("nickname");

  if (storyText && nickname) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.innerHTML = `<strong>${nickname}:</strong> ${storyText}`; // Menampilkan cerita dalam chat
    chatBox.appendChild(messageDiv);

    // Kosongkan cerita dari localStorage setelah ditampilkan
    localStorage.removeItem("chatDraft");
  }

  // Kirim pesan ke admin
  document.getElementById("sendBtn").addEventListener("click", () => {
    const chatText = document.getElementById("chatInput").value.trim();
    if (chatText) {
      // Kirim pesan ke Firebase
      const adminMsgRef = ref(db, 'admin/messages');
      push(adminMsgRef, {
        sender: nickname,
        message: chatText,
        timestamp: new Date().toISOString()
      }).then(() => {
        alert("Your message has been sent to the admin.");
        document.getElementById("chatInput").value = "";  // Reset input setelah mengirim
      }).catch((error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
      });
    } else {
      alert("Please type a message before sending.");
    }
  });
});

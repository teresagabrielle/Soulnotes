
// Import modul Firebase yang dibutuhkan
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Menggunakan auth dan db yang sudah diinisialisasi di HTML
const auth = getAuth();
const db = getFirestore();

let currentAdmin = null;
let selectedUserId = null;

const userListContainer = document.getElementById("userList");
const chatContainer = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentAdmin = user;
    loadUserList();
  }
});

function loadUserList() {
  const chatsRef = ref(db, "chats");
  onValue(chatsRef, (snapshot) => {
    userListContainer.innerHTML = "";
    snapshot.forEach(child => {
      const userId = child.key;
      const data = child.val();
      const lastMsg = data.messages ? Object.values(data.messages).pop().text : "(no messages)";
      const div = document.createElement("div");
      div.className = "user-entry";
      div.innerHTML = `<strong>${data.nickname || userId}</strong><br/><small>${lastMsg}</small>`;
      div.onclick = () => loadChatWithUser(userId, data);
      userListContainer.appendChild(div);
    });
  });
}

function loadChatWithUser(userId, userData) {
  selectedUserId = userId;
  chatContainer.innerHTML = "";

  const chatRef = ref(db, `chats/${userId}`);
  get(chatRef).then((snap) => {
    const data = snap.val();
    const assignedAdmin = data.assignedAdmin || null;

    if (!assignedAdmin) {
      // lock to current admin
      update(chatRef, { assignedAdmin: currentAdmin.email });
    } else if (assignedAdmin !== currentAdmin.email) {
      chatInput.disabled = true;
      sendBtn.disabled = true;
      const lockedMsg = document.createElement("div");
      lockedMsg.textContent = `This user is being handled by ${assignedAdmin}`;
      lockedMsg.style.color = "red";
      chatContainer.appendChild(lockedMsg);
      return;
    } else {
      chatInput.disabled = false;
      sendBtn.disabled = false;
    }

    if (data.messages) {
      Object.values(data.messages).forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + (msg.sender === "admin" ? "admin" : "user");
        div.innerHTML = `<strong>${msg.sender === "admin" ? "Admin" : data.nickname}:</strong><br/>${msg.text}`;
        chatContainer.appendChild(div);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message || !selectedUserId) return;

  const msgRef = ref(db, `chats/${selectedUserId}/messages`);
  push(msgRef, {
    sender: "admin",
    text: message,
    timestamp: Date.now()
  });

  chatInput.value = "";
}

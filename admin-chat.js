// Mengimpor konfigurasi Firebase
import { auth, db, firestore } from './firebaseConfig.js';
import { auth, db } from "./protectPage.js";
import { ref, get, onValue, onChildAdded, push, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

let adminNickname = "Admin";
let selectedUser = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const snap = await get(ref(db, `users/${user.uid}`));
    const data = snap.val();
    adminNickname = data.nickname ? `${data.nickname} (admin)` : "Admin (admin)";
    loadUserList();
  }
});

function loadUserList() {
  onValue(ref(db, "chats"), (snapshot) => {
    const list = document.getElementById("userList");
    list.innerHTML = "";

    snapshot.forEach(child => {
      const chat = child.val();
      const lastMessage = chat.messages ? Object.values(chat.messages).pop()?.text : "No messages yet";
      const item = document.createElement("div");
      item.className = "user-item";
      item.textContent = `${chat.nickname} - ${lastMessage}`;
      item.onclick = () => selectUser(child.key, chat.nickname);
      list.appendChild(item);
    });
  });
}

function selectUser(userId, userNick) {
  selectedUser = userId;
  const chatPanel = document.getElementById("chatPanel");
  chatPanel.innerHTML = "";

  const messagesRef = ref(db, `chats/${userId}/messages`);
  onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    displayMessage(msg.sender, msg.text);
  });

  // Verifikasi jika chat sudah ditugaskan kepada admin lain
  const chatRef = ref(db, `chats/${userId}`);
  get(chatRef).then((snapshot) => {
    const chatData = snapshot.val();
    const assignedAdmin = chatData?.assignedAdmin;
    if (assignedAdmin && assignedAdmin !== adminNickname) {
      const lockMsg = document.createElement("div");
      lockMsg.className = "locked-msg";
      lockMsg.textContent = `This chat is currently being handled by ${assignedAdmin}`;
      chatPanel.appendChild(lockMsg);
      document.getElementById("replyInput").disabled = true; // Disable input jika sudah ditangani admin lain
      return;
    }
  });
}

function displayMessage(sender, text) {
  const container = document.getElementById("chatPanel");
  const msgDiv = document.createElement("div");
  const isAdmin = sender.endsWith("(admin)");
  msgDiv.className = isAdmin ? "chat-bubble me" : "chat-bubble";
  msgDiv.innerHTML = `<strong>${sender}:</strong><br>${text}`;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

document.getElementById("replyInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendReply();
});

function sendReply() {
  const input = document.getElementById("replyInput");
  const message = input.value.trim();
  if (!message || !selectedUser) return;

  const msgRef = ref(db, `chats/${selectedUser}/messages`);
  push(msgRef, {
    sender: adminNickname,
    text: message,
    timestamp: Date.now()
  });

  // Tandai bahwa admin sudah menangani percakapan
  const chatRef = ref(db, `chats/${selectedUser}`);
  update(chatRef, {
    assignedAdmin: adminNickname
  });

  input.value = "";
}

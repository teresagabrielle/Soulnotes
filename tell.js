document.getElementById("storyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const storyText = document.getElementById("story").value.trim();
  if (!storyText) return alert("Feel free to tell your story, I'm all ears...");

  // Menampilkan pilihan setelah klik Next
  document.getElementById("options").style.display = "block";
});

// Simpan cerita ke localStorage saat memilih "Just Wanna Write It Out"
window.saveAsDraft = () => {
  const storyText = document.getElementById("story").value.trim();
  localStorage.setItem("storyDraft", storyText);  // Menyimpan cerita untuk diary
  alert("Your story has been saved to your diary!");
  window.location.href = "dashboard.html";  // Redirect ke dashboard setelah menyimpan
};

// Arahkan ke Chat dan simpan cerita ke localStorage
window.goToChat = () => {
  const storyText = document.getElementById("story").value.trim();
  const nickname = "Anonymous_" + Math.floor(Math.random() * 1000);  // Generate anonymous name
  localStorage.setItem("chatDraft", storyText);  // Menyimpan cerita untuk chat
  localStorage.setItem("nickname", nickname);  // Menyimpan nickname

  window.location.href = "chat.html";  // Redirect ke chat page
};

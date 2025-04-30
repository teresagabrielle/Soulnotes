document.getElementById("sendForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const to = document.getElementById("to").value.trim();
  const text = document.getElementById("message").value.trim();
  const from = document.getElementById("from").value.trim();

  if (!text) return alert("Message cannot be empty.");

  try {
    const noteRef = ref(db, `gallery`);  // Menyimpan ke gallery Firebase
    await push(noteRef, {
      to,
      from,
      text,
      timestamp: new Date().toISOString(),
    });

    alert("Motivational note sent!");
    window.location.href = "dashboard.html";  // Redirect ke dashboard setelah mengirim
  } catch (error) {
    console.error("Error saving motivational note:", error);
    alert("Failed to send motivational note.");
  }
});

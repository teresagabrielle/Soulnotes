// Handle Anonymous Login
document.getElementById("continueAsAnonymousBtn").addEventListener("click", () => {
  // Set default nickname for anonymous
  const nickname = "Anonymous_" + Math.floor(Math.random() * 1000);  // Randomize anonymous name
  localStorage.setItem("nickname", nickname);  // Store the nickname in localStorage for chat use
  
  // Redirect to main dashboard page
  window.location.href = "dashboard.html";  // Redirect to the dashboard page (or another page)
});

// Handle Admin Login
document.getElementById("loginAdminBtn").addEventListener("click", () => {
  // Redirect to login page for admin (if any login form exists)
  window.location.href = "login.html";  // Assuming you have a login.html for admin authentication
});

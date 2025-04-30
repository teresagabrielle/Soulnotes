export function injectNavbar() {
  const navbarHTML = `
    <nav class="navbar">
      <div class="navbar-logo">
        <img src="assets/logo.png" alt="Soulnotes Logo" />
      </div>
      <ul class="nav-links" id="navMenu">
        <li><a href="dashboard.html">Home</a></li>
        <li><a href="tell.html">Tell Your Story</a></li>
        <li><a href="send.html">Motivational Notes</a></li>
        <li><a href="diary.html">Diary</a></li>
        <li><a href="#gallerySection">Gallery</a></li>
        <li><a href="chat.html">Chat Room</a></li>
        <li><a href="profile.html" id="profileLink" style="display: none;">Profile</a></li>
        <li><a href="login.html" id="loginLink">Login</a></li>
      </ul>
    </nav>
  `;
  document.getElementById("navbarContainer").innerHTML = navbarHTML; // Sisipkan navbar ke dalam halaman
}

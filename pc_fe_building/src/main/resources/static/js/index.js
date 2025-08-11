document.addEventListener("DOMContentLoaded", () => {
  const authNavItem = document.getElementById("authNavItem");

  const token = localStorage.getItem("jwt");

  if (token) {
    // User is logged in, show Logout button
    authNavItem.innerHTML = `
      <a href="#" id="logoutBtn" class="scrolly" data-bg-img="constructive_bg_04.jpg" data-page="#tm-section-4">
        <i class="fas fa-sign-out-alt tm-nav-fa-icon"></i>
        <span>Logout</span>
      </a>
    `;

    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();

      if (confirm("Are you sure you want to logout?")) {
        // Clear local storage to log out
        localStorage.removeItem("jwt");
        localStorage.removeItem("accountId");

        // Redirect to login page
        window.location.href = "/login";
      }
    });

  } else {
    // User not logged in, show Login link
    authNavItem.innerHTML = `
      <a href="#login" class="scrolly" data-bg-img="constructive_bg_04.jpg" data-page="#tm-section-4">
        <i class="fas fa-sign-in-alt tm-nav-fa-icon"></i>
        <span>Login</span>
      </a>
    `;
  }
});

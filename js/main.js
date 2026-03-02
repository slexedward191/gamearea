document.addEventListener("DOMContentLoaded", () => {
  const openAuth = document.getElementById("openAuth");
  const authModal = document.getElementById("authModal");

  openAuth.addEventListener("click", () => {
    authModal.classList.remove("hidden");
  });
});

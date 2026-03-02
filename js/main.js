document.addEventListener("DOMContentLoaded", () => {
  const openAuth = document.getElementById("openAuth");
  const authModal = document.getElementById("authModal");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const switchAuth = document.getElementById("switchAuth");
  const authTitle = document.getElementById("authTitle");
  const welcomeText = document.getElementById("welcomeText");
  const logoutBtn = document.getElementById("logoutBtn");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  let isLogin = true;

  openAuth.onclick = () => authModal.classList.remove("hidden");

  authModal.onclick = (e) => {
    if (e.target === authModal) authModal.classList.add("hidden");
  };

  switchAuth.onclick = () => {
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? "Giriş Yap" : "Kayıt Ol";
    switchAuth.textContent = isLogin
      ? "Hesabın yok mu? Kayıt ol"
      : "Zaten hesabın var mı? Giriş yap";
  };

  registerBtn.onclick = () => {
    const user = username.value.trim();
    const pass = password.value.trim();

    if (!user || !pass) return alert("Boş bırakma!");

    localStorage.setItem("user_" + user, pass);
    alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
  };

  loginBtn.onclick = () => {
    const user = username.value.trim();
    const pass = password.value.trim();

    const saved = localStorage.getItem("user_" + user);
    if (saved === pass) {
      localStorage.setItem("loggedUser", user);
      authModal.classList.add("hidden");
      updateAuthUI();
    } else {
      alert("Kullanıcı adı veya şifre yanlış!");
    }
  };

  logoutBtn.onclick = () => {
    localStorage.removeItem("loggedUser");
    updateAuthUI();
  };

  function updateAuthUI() {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      welcomeText.textContent = "Hoş geldin, " + user + " 😎";
      openAuth.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
    } else {
      welcomeText.textContent = "";
      openAuth.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
    }
  }

  updateAuthUI();
});

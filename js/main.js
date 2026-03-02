document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const btn = document.getElementById("playBtn");

  if (!bgm || !btn) return;

  let isBusy = false; // üst üste tetiklemeyi engeller

  btn.addEventListener("click", async () => {
    if (isBusy) return;
    isBusy = true;

    try {
      if (bgm.paused) {
        await bgm.play();
        btn.textContent = "⏸️ Durdur";
        btn.classList.remove("paused");
      } else {
        bgm.pause();
        btn.textContent = "🔊 Müziği Başlat";
        btn.classList.add("paused");
      }
    } catch (e) {
      console.log(e);
      // AbortError bazen ilk izin sırasında olur, sessizce geçiyoruz
    } finally {
      // küçük gecikme: tarayıcı state otursun
      setTimeout(() => (isBusy = false), 150);
    }
  });
});
// ❄️ Snow effect
const canvas = document.getElementById("snow");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h, flakes = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  flakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    v: Math.random() * 1 + .5,
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,.8)";
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      f.y += f.v;
      if (f.y > h) f.y = -5;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");
const volumeControl = document.getElementById("volumeControl");

music.volume = 0.7; // Başlangıç sesi %70

toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "⏸️ Durdur";
  } else {
    music.pause();
    toggleBtn.textContent = "🔊 Müziği Başlat";
  }
});

volumeControl.addEventListener("input", (e) => {
  music.volume = e.target.value / 100;
});
const openAuth = document.getElementById("openAuth");
const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const switchAuth = document.getElementById("switchAuth");
const authTitle = document.getElementById("authTitle");
const welcomeText = document.getElementById("welcomeText");
const logoutBtn = document.getElementById("logoutBtn");

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

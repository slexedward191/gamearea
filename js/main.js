// 🎵 MUSIC
const musicToggle = document.getElementById("musicToggle");
const volumeControl = document.getElementById("volumeControl");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    musicToggle.textContent = "🔇 Müziği Durdur";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔊 Müziği Başlat";
    isPlaying = false;
  }
});

volumeControl.addEventListener("input", () => {
  bgMusic.volume = volumeControl.value / 100;
});


// ⚡ GUEST LOGIN
const guestBtn = document.getElementById("guestLogin");
const guestWelcome = document.getElementById("guestWelcome");

guestBtn.addEventListener("click", () => {
  const guestName = "Misafir#" + Math.floor(Math.random() * 9999);
  guestWelcome.textContent = "Hoş geldin, " + guestName + " 👋";
  guestWelcome.classList.remove("hidden");
  guestBtn.disabled = true;
  guestBtn.textContent = "Giriş Yapıldı";
});


// ❄️ SNOW EFFECT
const snowCanvas = document.getElementById("snow");

if (snowCanvas) {
  const ctx = snowCanvas.getContext("2d");

  function resizeSnow() {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
  }

  resizeSnow();
  window.addEventListener("resize", resizeSnow);

  const flakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * snowCanvas.width,
    y: Math.random() * snowCanvas.height,
    r: Math.random() * 3 + 1,
    d: Math.random() * 1 + 0.8
  }));

  function snow() {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    ctx.fillStyle = "rgba(255,255,255,.85)";
    ctx.beginPath();

    flakes.forEach(f => {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    });

    ctx.fill();

    flakes.forEach(f => {
      f.y += f.d;
      if (f.y > snowCanvas.height) {
        f.y = -10;
        f.x = Math.random() * snowCanvas.width;
      }
    });

    requestAnimationFrame(snow);
  }

  snow();
}
// ✨ MOUSE TRAIL EFFECT
document.addEventListener("mousemove", (e) => {
  const dot = document.createElement("div");
  dot.className = "cursor-trail";
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  document.body.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 600);
});
// 🌙 / ☀️ THEME TOGGLE (MEVCUT KODLARI BOZMAZ)
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️ Gündüz Modu";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "☀️ Gündüz Modu";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "🌙 Gece Modu";
    }
  });
}

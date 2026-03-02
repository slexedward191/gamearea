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

  // 🎉 CONFETTI PATLAT
  confettiBurst();
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
// 🎉 CONFETTI EFFECT
function confettiBurst() {
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.top = (window.innerHeight - 120) + "px";
    conf.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    conf.style.transform = `scale(${Math.random() * 0.6 + 0.6})`;

    document.body.appendChild(conf);

    const x = (Math.random() - 0.5) * 400;
    const y = -Math.random() * 300 - 150;

    conf.animate([
      { transform: `translate(0,0) rotate(0deg)` },
      { transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg)` }
    ], {
      duration: 900 + Math.random() * 600,
      easing: "cubic-bezier(.2,.6,.2,1)",
      fill: "forwards"
    });

    setTimeout(() => conf.remove(), 1600);
  }
}
// 🔔 TS3 Katıl butonuna 5 sn sonra shake uyarı
const ts3Btn = document.querySelector(".join-ts");

if (ts3Btn) {
  let shaken = false;

  setTimeout(() => {
    if (!shaken) {
      ts3Btn.classList.add("shake");
      setTimeout(() => ts3Btn.classList.remove("shake"), 700);
      shaken = true;
    }
  }, 5000);

  ts3Btn.addEventListener("click", () => {
    shaken = true; // tıklanınca bir daha uyarmasın
  });
}
// ✍️ HERO TYPING EFFECT (bozmadan)
const heroTitle = document.getElementById("heroTitle");

if (heroTitle) {
  const originalHTML = heroTitle.innerHTML;
  const textOnly = heroTitle.textContent; // sadece düz yazı
  heroTitle.textContent = ""; // başta boş olsun

  let i = 0;
  const speed = 55; // yazma hızı (ms)

  function typeEffect() {
    if (i < textOnly.length) {
      heroTitle.textContent += textOnly.charAt(i);
      i++;
      setTimeout(typeEffect, speed);
    } else {
      // Yazı bittikten sonra span'ı geri koy (renk bozulmasın)
      heroTitle.innerHTML = originalHTML;
    }
  }

  // küçük gecikmeyle başlasın
  setTimeout(typeEffect, 500);
}
// 🎮 Intro Loader
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("introLoader");
  const bar = document.getElementById("introProgress");
  const percent = document.getElementById("introPercent");

  if (!intro) return;

  let p = 0;
  const loading = setInterval(() => {
    p += Math.floor(Math.random() * 12) + 5;
    if (p >= 100) {
      p = 100;
      clearInterval(loading);

      intro.classList.add("intro-hide");
      setTimeout(() => {
        intro.remove();
      }, 600);
    }

    bar.style.width = p + "%";
    percent.textContent = p + "%";
  }, 180);
});

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

document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const btn = document.getElementById("playBtn");

  if (!bgm || !btn) {
    console.error("bgm veya playBtn bulunamadı");
    return;
  }

  let playing = false;

  btn.addEventListener("click", async () => {
    try {
      if (!playing) {
        await bgm.play();
        playing = true;
        btn.textContent = "⏸️ Durdur";
      } else {
        bgm.pause();
        playing = false;
        btn.textContent = "🔊 Müziği Başlat";
      }
    } catch (e) {
      alert("Hata: " + e.name);
      console.log(e);
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
document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const btn = document.getElementById("playBtn");

  if (!bgm || !btn) return;

  // iOS/Chrome için sesi önceden hazırla
  bgm.muted = false;
  bgm.volume = 1;

  btn.addEventListener("click", async () => {
    try {
      // İlk tıkta da çalışması için küçük bir "warm-up"
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
      alert("Tarayıcı ilk tıkta izin vermedi. Tekrar tıkla.");
    }
  });
});

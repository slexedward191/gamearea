const bgm = document.getElementById("bgm");
const hint = document.getElementById("soundHint");

async function startMusic() {
  try {
    await bgm.play();
    hint.style.display = "none";
    document.removeEventListener("click", startMusic);
  } catch (e) {
    console.log("Müzik başlatılamadı:", e);
  }
}

document.addEventListener("click", startMusic);
hint.addEventListener("click", startMusic);

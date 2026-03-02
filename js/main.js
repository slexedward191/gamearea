const bgm = document.getElementById("bgm");
const hint = document.getElementById("soundHint");

function startMusic() {
  if (!bgm) {
    alert("bgm bulunamadı (audio yok)");
    return;
  }
  bgm.play()
    .then(() => {
      hint.style.display = "none";
      document.removeEventListener("click", startMusic);
    })
    .catch((e) => {
      alert("Hata: " + e.name);
      console.log(e);
    });
}

document.addEventListener("click", startMusic);
if (hint) hint.addEventListener("click", startMusic);

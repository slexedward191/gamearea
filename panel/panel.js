function register() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  localStorage.setItem(email, password);
  alert("Kayıt başarılı!");
  window.location.href = "login.html";
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if(localStorage.getItem(email) === password){
    localStorage.setItem("loggedUser", email);
    window.location.href = "dashboard.html";
  } else {
    alert("Hatalı giriş");
  }
}

function logout(){
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}

function createBot(){
  let botName = prompt("Bot Adı:");
  let bots = JSON.parse(localStorage.getItem("bots")) || [];
  bots.push(botName);
  localStorage.setItem("bots", JSON.stringify(bots));
  showBots();
}

function showBots(){
  let bots = JSON.parse(localStorage.getItem("bots")) || [];
  let list = document.getElementById("botList");
  list.innerHTML = bots.map(b => "<p>"+b+"</p>").join("");
}

if(document.getElementById("botList")){
  showBots();
}

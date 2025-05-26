const screenshots = {
  "index.html": "index",
  "minecraft.html": "minecraft",
  "fortnite.html": "fortnite",
  "lol.html": "leagueoflegends",
  "amongus.html": "amongus",
  "csgo.html": "csgo",
};
let ss = {};
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".rating").forEach(function (el) {
    let rating = parseFloat(el.getAttribute("data-rate"));
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars += "★";
      } else if (rating >= i - 0.5) {
        stars += "☆";
      } else {
        stars += "☆";
      }
    }
    el.innerHTML = stars + " (" + rating + "/5)";
  });

  document.querySelectorAll(".nav-stars").forEach(function (el) {
    let rating = parseFloat(el.getAttribute("data-rate")) || 0;
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars += "★";
      } else if (rating >= i - 0.5) {
        stars += "☆";
      } else {
        stars += "☆";
      }
    }
    el.textContent = stars;
  });
});
fetch("images/list.json")
  .then((resp) => resp.json())
  .then((data) => {
    ss = data;
    loadss();
  });
//Loads screenshots dynamically
// has a bug when deployed on github pages, but works locally
// the bug is the variable name is blank when deployed
function loadss() {
  const games = ["minecraft", "fortnite", "leagueoflegends", "amongus", "csgo"];
  var name = window.location.pathname.split("/").pop();
  if (!name) {
    if (document.title === "Game Reviews") name = "index.html";
  }
  var folder = screenshots[name];
  var i = 0;
  const main = document.querySelector("main");
  ss[folder].forEach((elem) => {
    const img = document.createElement("img");
    img.src = "images/screenshots/" + folder + "/" + elem;
    img.className = "game-img";
    if (name === "index.html") {
      var a = document.createElement("a");
      a.href = games[i] + ".html";
    } else {
      main.appendChild(img);
      return;
    }
    a.appendChild(img);
    main.appendChild(a);
    i++;
  });
}

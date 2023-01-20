"use strict";

const root = document.getElementById("root");
const homePage = HomePage();
root.append(homePage);

function HomePage() {
  const navbar = Navbar();
  const welcoming = document.createElement("h4");
  welcoming.textContent = "Welcome to Home";
  const input = document.createElement("input");
  input.placeholder = "Enter Here!";
  const div = document.createElement("div");
  div.append(navbar);
  div.append(welcoming);
  div.append(input);
  return div;
}

function AboutPage() {
  const linkBack = document.createElement("a");
  linkBack.href = "#home";
  linkBack.textContent = "Back to Home";
  linkBack.onclick = function (event) {
    event.preventDefault();
    root.textContent = "";
    const homePage = HomePage();
    root.append(homePage);
    history.pushState(null, "", "#home");
  };
  const welcoming = document.createElement("h4");
  welcoming.textContent = "About Me";
  const paragraph = document.createElement("p");
  paragraph.textContent =
    "lorem ipsum sir amet lor doles taerj dolor ame um sit";
  const div = document.createElement("div");
  div.append(linkBack);
  div.append(welcoming);
  div.append(paragraph);
  return div;
}

function Navbar() {
  const div = document.createElement("div");
  const linkHome = document.createElement("a");
  linkHome.href = "#home";
  linkHome.textContent = "Home";
  linkHome.onclick = function (event) {
    event.preventDefault();
    const homePage = HomePage();
    root.textContent = "";
    root.append(homePage);
    history.pushState(null, "", "#home");
  };

  const linkAbout = document.createElement("a");
  linkAbout.href = "#about";
  linkAbout.textContent = "About";
  linkAbout.onclick = function (event) {
    event.preventDefault();
    const aboutPage = AboutPage();
    root.textContent = "";
    root.append(aboutPage);
    history.pushState(null, "", "#about");
  };

  div.append(linkHome);
  div.append(linkAbout);

  return div;
}

if (location.hash === "#home") {
  root.textContent = "";
  root.append(HomePage());
} else if (location.hash === "#about") {
  root.textContent = "";
  root.append(AboutPage());
}

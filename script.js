"use strict";

const root = document.getElementById("root");
const homePage = HomePage();
root.append(homePage);

function Link(props) {
  const link = document.createElement('a');
  link.href = props.href;
  link.textContent = props.label;
  link.onclick = function (event) {
    event.preventDefault();
    root.textContent = '';
    const component = props.Component();
    root.append(component);
    history.pushState(null, '', props.href);
  }
  return link;
}

function Navbar() {
  const div = document.createElement("div");
  const linkHome = Link({
    href: '#home',
    label: 'Home',
    Component: HomePage
  });

  const linkAbout = Link({
    href: '#about',
    label: 'About',
    Component: AboutPage
  });

  div.append(linkHome);
  div.append(linkAbout);

  return div;
}
 
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
  const linkBack = Link({
    href: '#home',
    label: 'Back to home',
    Component: HomePage
  });
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

if (location.hash === "#home") {
  root.textContent = "";
  root.append(HomePage());
} else if (location.hash === "#about") {
  root.textContent = "";
  root.append(AboutPage());
}

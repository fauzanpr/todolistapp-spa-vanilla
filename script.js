"use strict";

let state = {
  inputValue: localStorage.getItem('inputValue'),
  hash: location.hash,
};

function setState(newState) {
  const prevState = {...state};
  const nextState = {...state, ...newState}
  state = {...nextState};
  render();
  onStateChange(prevState, nextState);
}

function onStateChange(prevState, nextState) {
  if (prevState.inputValue !== nextState.inputValue) {
    localStorage.setItem('inputValue', nextState.inputValue);
  }
  if (prevState.hash !== nextState.hash) {
    history.pushState(null, "", nextState.hash);
  }
}

function Link(props) {
  const link = document.createElement("a");
  link.href = props.href;
  link.textContent = props.label;
  link.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    setState({ hash: url.hash });
    render();
  };
  return link;
}

function Navbar() {
  const div = document.createElement("div");
  const linkHome = Link({
    href: "#home",
    label: "Home",
  });

  const linkAbout = Link({
    href: "#about",
    label: "About",
  });

  div.append(linkHome);
  div.append(linkAbout);
  return div;
}

function HomePage() {
  const navbar = Navbar();
  const welcoming = document.createElement("h4");
  const outputText = document.createElement('p');
  const btnClear = document.createElement('button');
  btnClear.textContent = 'Clear';
  welcoming.textContent = "Welcome to Home";
  outputText.textContent = state.inputValue;
  const input = document.createElement("input");
  input.id = 'input';
  input.value = state.inputValue;
  input.oninput = function (event) {
    setState({ inputValue: event.target.value });
  }
  btnClear.onclick = function () {
    setState({ inputValue: '' });
  }
  input.placeholder = "Enter Here!";
  const div = document.createElement("div");
  div.append(navbar);
  div.append(welcoming);
  div.append(input);
  div.append(btnClear);
  div.append(outputText);
  return div;
}

function AboutPage() {
  const linkBack = Link({
    href: "#home",
    label: "Back to home",
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

function App() {
  const homePage = HomePage();
  const aboutPage = AboutPage();
  if (state.hash === "#home") {
    return homePage;
  } else if (state.hash === "#about") {
    return aboutPage;
  }
}

function render() {
  const root = document.getElementById("root");
  state.hash = location.hash || '#home';

  const foccusedElementId = document.activeElement.id;
  const foccusedSelectionStart = document.activeElement.selectionStart;
  const foccusedSelectionEnd = document.activeElement.selectionEnd;

  root.textContent = "";
  const app = App();
  root.append(app);

  if (foccusedElementId) {
    const foccusedElement = document.getElementById(foccusedElementId);
    foccusedElement.focus();
    foccusedElement.selectionStart = foccusedSelectionStart;
    foccusedElement.selectionEnd = foccusedSelectionEnd;
  }
}

render();
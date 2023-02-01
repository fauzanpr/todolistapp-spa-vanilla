"use strict";

let state = {
  todo: [],
};

function setState(newState) {
  if (newState.todo) {
    state.todo.push(newState.todo);
  } else if (newState.deleted) {
    let arr = [];
    for (const todo of state.todo) {
      if (todo !== newState.deleted) {
        arr.push(todo);
      }
    }
    state.todo = [...arr];
  } else {
    state = { ...state, ...newState };
  }
  render();
}

function onStateChange(prevState, nextState) {}

function HomePage() {
  const homePage = document.createElement("div");
  const addTodoListInput = document.createElement("input");
  const btnTodoList = document.createElement("button");
  const todolistContainer = document.createElement("ul");

  btnTodoList.onclick = function () {
    if (addTodoListInput.value) {
      setState({ todo: addTodoListInput.value });
      addTodoListInput.value = "";
    }
  };
  if (state.todo.length > 0) {
    for (const [i, todo] of state.todo.entries()) {
      todolistContainer.append(Todo({ content: todo, id: i }));
    }
  }
  btnTodoList.textContent = "Add";
  homePage.append(addTodoListInput);
  homePage.append(btnTodoList);
  homePage.append(todolistContainer);
  return homePage;
}

function Todo(props) {
  const todolist = document.createElement("li");
  todolist.id = props.id;
  todolist.textContent = props.content;
  const btnDelete = document.createElement("button");
  btnDelete.textContent = 'Delete';
  btnDelete.id = `${props.id}`;
  btnDelete.onclick = function() {
    setState({ deleted: props.content });
  }
  todolist.append(btnDelete);
  return todolist;
}

function render() {
  const root = document.getElementById("root");
  const homePage = HomePage();
  root.textContent = "";
  root.append(homePage);
}

render();

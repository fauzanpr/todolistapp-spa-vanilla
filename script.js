"use strict";

let state = {
  todo: [],
};

function setState(newState) {
  const prevState = { ...state };
  let nextState;
  if (newState.todo) {
    const arr = [...state.todo, newState.todo];
    state.todo = arr;
    nextState = { ...state };
  } else if (newState.deleted) {
    let arr = [];
    for (const todo of state.todo) {
      if (todo !== newState.deleted) {
        arr.push(todo);
      }
    }
    state.todo = [...arr];
    nextState = { ...state };
  } else {
    nextState = { ...state, ...newState };
    state = { ...nextState };
  }
  onStateChange(prevState, nextState);
  render();
}

function onStateChange(prevState, nextState) {
  if (prevState.todo.length !== nextState.todo.length) {
    localStorage.setItem('todo', JSON.stringify(state.todo));
  }
}

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

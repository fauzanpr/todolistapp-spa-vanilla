'use strict';

let state = {
    todo: [],
};

function setState(newState) {
    state = {...state, ...newState};
}

function HomePage() {
    const homePage = document.createElement('div');
    const addTodoListInput = document.createElement('input');
    const btnTodoList = document.createElement('button');
    const todolistContainer = document.createElement('ul');

    btnTodoList.onclick = function(event) {
        if (addTodoListInput.value) {
            setState({
                todo: [...state.todo, addTodoListInput.value],
            });
            addTodoListInput.value = '';
        }
    }
    btnTodoList.textContent = 'Add';
    homePage.append(addTodoListInput);
    homePage.append(btnTodoList);
    homePage.append(todolistContainer);
    return homePage;
}

function Todo(props) {
    const todolist = document.createElement('li');
    todolist.textContent = props.content;
    const btnDelete = document.createElement('button');
    btnDelete.textContent = `${props.id}`;
    btnDelete.id = `${props.id}`;
    todolist.append(btnDelete);
    return todolist;
}

function render() {
    const root = document.getElementById('root');
    const homePage = HomePage();
    root.textContent = '';
    root.append(homePage);
}

render();
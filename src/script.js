'use strict';

function HomePage() {
    const homePage = document.createElement('div');
    const addTodoListInput = document.createElement('input');
    const btnTodoList = document.createElement('button');
    const todolistContainer = document.createElement('ul');
    todolistContainer.append(Todo({
        content: 'Todo 1'
    }));
    todolistContainer.append(Todo({
        content: 'Todo 2'
    }));
    btnTodoList.textContent = 'Add';
    homePage.append(addTodoListInput);
    homePage.append(btnTodoList);
    homePage.append(todolistContainer);
    return homePage;
}

function Todo(props) {
    const todolist = document.createElement('li');
    todolist.textContent = props.content;
    return todolist;
}

function render() {
    const root = document.getElementById('root');
    const homePage = HomePage();
    root.textContent = '';
    root.append(homePage);
}

render();
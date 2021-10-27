const todoInput = document.querySelector(".todo-input");
const btnaddInput = document.querySelector(".add-btn");
const outputDiv = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
btnaddInput.addEventListener("click", addTodoList);
outputDiv.addEventListener("click", deleteCheckTodo);
filterOption.addEventListener("click", filterTodo);

function addTodoList(e) {
    // prevent form from submitting
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const todoItem = document.createElement("li");
    todoItem.innerText = todoInput.value;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
    const completeButton = document.createElement("button");
    completeButton.innerHTML = `<i class="fas fa-check"></i>`;
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    outputDiv.appendChild(todoDiv);

}

function deleteCheckTodo(e) {
    const className = e.target;
    if (className.classList[0] === "trash-btn") {
        const item = className.parentElement;
        item.classList.add("fall");
        removeLocalTodos(item);
        item.addEventListener("transitionend", e => {
            item.remove();
        });
    }

    if (className.classList[0] === "complete-btn") {
        const item = className.parentElement;
        item.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = outputDiv.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const todoItem = document.createElement("li");
        todoItem.innerText = todo;
        todoItem.classList.add("todo-item");
        todoDiv.appendChild(todoItem);
        todoInput.value = "";
        const completeButton = document.createElement("button");
        completeButton.innerHTML = `<i class="fas fa-check"></i>`;
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        outputDiv.appendChild(todoDiv);
    });
}
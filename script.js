// Accessing the elements
const text = document.getElementById("text");
const addNote = document.getElementById("add-note");
const editing = document.getElementById("edit");
const edited = document.getElementById("done");
const noteList = document.getElementById("notelist");


// An array to store all the to-do tasks
let todoArray = [];

// Adding Items to the To-Do List on clicking button
addNote.addEventListener("click", (e) => {
  e.preventDefault();
  additem();
  displayTodo();
});

// Adding Items to the To-Do List on pressing Enter
text.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    additem();
    displayTodo();
  }
});

function additem() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  todoArray.push(text.value);
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
}

function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((value, index) => {
    htmlCode += `<div>
    <input type="text"  class="taskListField" id="taskListField" value="${value}" readonly>
    <button onclick='deleteTodo(${index})'><i class="fa-solid fa-trash-can"></i></button>
    <button onclick='edit(${index})'><i class="fa-solid fa-pen-to-square"></i></button>
 </div>`;
  });
  noteList.innerHTML = htmlCode;
}

//  Deleting Items from To-Do List
function deleteTodo(index) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

// Editing Items in the To-Do List
function edit(index) {
  editing.value = index;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  text.value = todoArray[index];
  addNote.style.display = "none";
  edited.style.display = "block";
}

// Reflecting Final Changes
edited.addEventListener("click", () => {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  let id = editing.value;
  todoArray[id] = text.value;
  addNote.style.display = "block";
  edited.style.display = "none";
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});
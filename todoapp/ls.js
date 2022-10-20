import { Todo } from "./todo.js";
const input = document.querySelector("#input");

let toDoList = [];

if (localStorage.getItem("toDoList")) {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
}

printTask(toDoList);

function printTask(tasks) {
  const ul = document.querySelector("#items");
  const leftPlace = document.querySelector("#tasksLeftToDo");
  
  ul.innerHTML = "";
  
  tasks.forEach((toDoItem) => {
    ul.innerHTML += `<li class="completed">
    <input type="checkbox" id="liCount" data-id="${toDoItem.Id}" ${toDoItem.Completed ? "checked" : ""}> 
    <span>${toDoItem.Content}</span>
    <button data-id="${toDoItem.Id}" class="delete">x</button>
    </li>`;
  });
  
  let left = document.querySelectorAll('input[type="checkbox"]:not(:checked)').length;
  leftPlace.innerHTML = `<span>${left} left to do</span>`;
  let checkBoxes = document.querySelectorAll('input[type="checkbox"]');

  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", (e) => {
      let inputId = e.target.dataset.id;
      let selectedCheckBox = toDoList.find(
        (task) => task.Id === parseInt(inputId)
      );
      selectedCheckBox.Completed = !selectedCheckBox.Completed;
      localStorage.setItem("toDoList", JSON.stringify(toDoList));

    });
  });

  let deleteButtons = document.querySelectorAll("button");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      let inputId = e.target.dataset.id;
      let selectedCheckBoxIndex = toDoList.findIndex(
        (task) => task.Id === parseInt(inputId)
      );

      //delete an object from array
      toDoList.splice(selectedCheckBoxIndex, 1);
      localStorage.setItem("toDoList", JSON.stringify(toDoList));
      printTask(toDoList);
    });
  });
}

document
  .querySelector('input[type="button"]')
  .addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = new Todo(document.querySelector("#input").value);
    toDoList.push(inputValue);

    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    input.value = "";
    printTask(toDoList);
  });

document.querySelector("#active").addEventListener("click", (e) => {
  printTask(toDoList.filter((task) => task.Completed === false));
});
document.querySelector("#completed").addEventListener("click", (e) => {
  printTask(toDoList.filter((task) => task.Completed === true));
})
document.querySelector("#all").addEventListener("click", (e) => {
  printTask(toDoList);
});
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input-task");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

  taskArray.forEach((task) => rendertask(task));

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    let task = input.value.trim();
    if (task.length > 0) {
      taskArray.push(task);
      updateLocalStorage();
      rendertask(task);
      input.value = "";
    }
  }

  function rendertask(task) {
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    const list = document.createElement("p");
    list.innerText = task;

    const completeBtn = document.createElement("img");
    completeBtn.src = "./assets/check-circle.svg";
    completeBtn.className = "complete-btn";
    completeBtn.addEventListener("click", () => {
      list.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "./assets/delete-img.svg";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", (index) => {
      listItem.remove();
      if (taskArray.length > 0) {
        taskArray.splice(index, 1);
        updateLocalStorage();
      }
    });

    listItem.appendChild(list);
    listItem.appendChild(completeBtn);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);
  }

  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }
});

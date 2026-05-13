let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks(filter = currentFilter) {
  currentFilter = filter;
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((taskObj, index) => {

    if (filter === "completed" && !taskObj.completed) return;
    if (filter === "pending" && taskObj.completed) return;

    let li = document.createElement("li");

    if (taskObj.completed) {
      li.classList.add("completed");
    }

    let span = document.createElement("span");
    span.textContent = taskObj.text;

    // Toggle complete
    span.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    // Edit
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.onclick = () => {
      let newText = prompt("Edit task:", taskObj.text);
      if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    // Delete
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete-btn");

    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    let btnGroup = document.createElement("div");
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    taskList.appendChild(li);
  });
}

// Add task
function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, completed: false });

  saveTasks();
  renderTasks();

  input.value = "";
}

// Filter
function filterTasks(type) {
  renderTasks(type);
}

// Enter key
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// 🌙 Toggle Theme
function toggleTheme() {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  document.getElementById("themeBtn").textContent = isDark ? "☀️" : "🌙";
}

// Load theme + tasks
window.onload = function () {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀️";
  }

  renderTasks();
};
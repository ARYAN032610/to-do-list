

  /***** persistent storage *****/
const KEY = "tasks";
let tasks = JSON.parse(localStorage.getItem(KEY)) || [];
const save = () => localStorage.setItem(KEY, JSON.stringify(tasks));

/***** elements on each page (may be null) *****/
const taskInput      = document.getElementById("taskInput");
const addBtn         = document.getElementById("addTask");
const taskList       = document.getElementById("taskList");
const completedList  = document.getElementById("completedList");
const emptyMsg       = document.getElementById("emptyMsg");

/***** === TO-DO PAGE === *****/
if (taskList) {
  renderTodo();
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keyup", e => e.key === "Enter" && addTask());

  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ text, done:false });
    taskInput.value = "";
    save(); renderTodo();
  }

  function renderTodo() {
    taskList.innerHTML = "";
    tasks.forEach((t,i) => {
      const li = document.createElement("li");
      li.className = t.done ? "done" : "";
      li.innerHTML = `
        <span>${t.text}</span>
        <div class="actions">
          <button class="complete-btn" title="Mark done" onclick="toggleTask(${i})">✓</button>
          <button class="delete-btn"   title="Delete"    onclick="deleteTask(${i})">✕</button>
        </div>`;
      taskList.appendChild(li);
    });
  }
}

/***** === COMPLETED PAGE === *****/
if (completedList) {
  renderCompleted();
  function renderCompleted() {
    const done = tasks.filter(t=>t.done);
    completedList.innerHTML = "";
    if (!done.length) {
      emptyMsg.textContent = "No tasks finished yet.";
    } else {
      emptyMsg.textContent = "";
      done.forEach(t=>{
        const li=document.createElement("li");
        li.textContent=t.text;
        completedList.appendChild(li);
      });
    }
  }
}

/***** shared actions *****/
function toggleTask(i){
  tasks[i].done = !tasks[i].done; save();
  taskList && renderTodo(); completedList && renderCompleted();
}
function deleteTask(i){
  tasks.splice(i,1); save();
  taskList && renderTodo(); completedList && renderCompleted();
}
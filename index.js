// Task Class
class Task {
    taskId;
    task;
    ui;

    constructor(taskId, task) {
        this.taskId = taskId;
        this.task = task;

        this.createUI();

        this.ui.onclick = () => this.toggleComplete();

        document.getElementById("tasks").append(this.ui);
    }

    createUI() {
        this.ui = document.createElement("p");
        if (this.task.completed == true) {
            this.ui.className = "task completed";
        } else this.ui.className = "task";
        this.ui.textContent = this.task.task;
    }

    toggleComplete() {
        this.ui.className = "task completed";
        
        setTimeout(() => {
            this.ui.remove();
            localStorage.removeItem(this.taskId);
            updateTaskCount();
        }, 500);
    }
}

// Load all tasks from local storage
for (let i = 0; i < localStorage.length; i++) {
    const taskId = localStorage.key(i);
    if (!taskId.startsWith("task")) continue;
    else {
        const task = JSON.parse(localStorage.getItem(taskId));
        new Task(taskId, task)
    }
}

// Set Date in widget
let date = document.getElementById("date");
date.innerHTML = new Date().toDateString();

// New task handler
function createTask () {
    if (taskInput.value == "") return;
    let task = {
        taskId : `task${localStorage.length +1}`,
        task: taskInput.value,
        completed: false
    }

    new Task(task.taskId, task);
    localStorage.setItem(task.taskId, JSON.stringify(task))
    updateTaskCount();
    taskInput.value = "";
}
let taskInput = document.getElementById("createTask");

taskInput.addEventListener("keypress", (keyboardEvent) => {
    if (keyboardEvent.code != "Enter") return;
    createTask();
})

// Updating task count in widget
const taskRemaining = document.getElementById("taskCount");
function updateTaskCount() {
    taskRemaining.innerHTML = localStorage.length;
    if (localStorage.length == 0) document.getElementById("taskNotice").style.display = "block";
    else document.getElementById("taskNotice").style.display = "none";
}

updateTaskCount()
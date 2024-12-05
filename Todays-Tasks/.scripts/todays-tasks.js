const taskInput = document.getElementById('taskInput');
const tasklist = document.getElementById('taskList');

loadTasks();
selectAllLi();

/*************************** Event Listener ***************************/

/**************************** Add & Delete ****************************/

function preprocessInput() {
    const newTask = taskInput.value.trim();
    if (newTask) {
        addTask(newTask);
        taskInput.value = '';
        saveTask();
    }
    else {
        alert("Can't add a blank task")
    }
}

function addTask(newTask) {
    const addTask = document.createElement('li');
    addTask.textContent = newTask;
    taskList.appendChild(addTask)
    deleteTask(addTask);
    addTask.setAttribute('draggable', true);
    selectAllLi();
}

function deleteTask(deleteTask) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteTask';
    deleteTask.appendChild(deleteButton);
    tasklist.appendChild(deleteTask);
    deleteButton.addEventListener('click', function() {
        tasklist.removeChild(deleteTask);
        saveTask();
    })
}

/**************************** LocalStorage ****************************/

function saveTask() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.replace('X', '').trim());
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTask);
}

/**************************** Drag & Drop *****************************/

let draggedItem = null;

function selectAllLi() {
    const listItems = document.querySelectorAll('li');

    listItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
    const hoveringItem = this;
    const list = this.parentElement;
    const draggingItem = document.querySelector('.dragging');

    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
        list.appendChild(draggingItem);
    } else {
        list.insertBefore(draggingItem, afterElement);
    }
}

function handleDrop() {
    this.classList.remove('dragging');
}

function handleDragEnd() {
    this.classList.remove('dragging');
    saveTask();
}

function getDragAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
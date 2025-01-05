
/******************************* Import *******************************

import {
    taskInput
}
from 'common.js';
*/

/************************** Local Variables ***************************/

const taskList = document.getElementById('quadrant');

// Load tasks from LocalStorage
const todaysTasks = JSON.parse(localStorage.getItem('todaysTasks')) || [];
const allTasksQuadrant1 = JSON.parse(localStorage.getItem('allTasksQuadrant1')) || [];
const allTasksQuadrant2 = JSON.parse(localStorage.getItem('allTasksQuadrant2')) || [];
const allTasksQuadrant3 = JSON.parse(localStorage.getItem('allTasksQuadrant3')) || [];
const allTasksQuadrant4 = JSON.parse(localStorage.getItem('allTasksQuadrant4')) || [];
const archivedTasksQuadrant1 = JSON.parse(localStorage.getItem('archivedTasksQuadrant1')) || [];
const archivedTasksQuadrant2 = JSON.parse(localStorage.getItem('archivedTasksQuadrant2')) || [];
const archivedTasksQuadrant3 = JSON.parse(localStorage.getItem('archivedTasksQuadrant3')) || [];
const archivedTasksQuadrant4 = JSON.parse(localStorage.getItem('archivedTasksQuadrant4')) || [];

displayTasks();

// selectAllLi();

/**************************** DisplayTasks ****************************/

function displayTasks() {

    // Delete all existing 'li'
    taskList.innerHTML = '';

    for (var i = 0, len = todaysTasks.length; i < len; i++) {

        // Split input into elements of array
        let splitTask = todaysTasks[i].split(";");

        // Index
        let index = i;

        // CreateElement - li - listitem
        const listItem = document.createElement('li');
        taskList.appendChild(listItem);
            
        // CreateElement - div - divDeadline
        const divDeadline = document.createElement('div');
        divDeadline.textContent = splitTask[1];
        divDeadline.className = 'deadline-and-schedule';
        listItem.appendChild(divDeadline);
        
        // CreateElement - div - divSchedule
        const divSchedule = document.createElement('div');
        divSchedule.textContent = splitTask[2];
        divSchedule.className = 'deadline-and-schedule';
        listItem.appendChild(divSchedule);
        
        // CreateElement - div - divTask
        const divTask = document.createElement('div');
        divTask.textContent = splitTask[0];
        divTask.className = 'task';
        listItem.appendChild(divTask);

        // CreateElement - div - divUpdate
        const divUpdate = document.createElement('div');
        divUpdate.className = 'update';
        listItem.appendChild(divUpdate);

        // CreateElement - button - todayButton
        const todayButton = document.createElement('button');
        todayButton.textContent = 'T';
        todayButton.className = 'update-buttons';
        todayButton.addEventListener('click', () => {
            let allTasksQuadrant = splitTask[1] != "" && splitTask[3] == "/" ? allTasksQuadrant1 : splitTask[1] == "" && splitTask[3] == "/" ? allTasksQuadrant2 : splitTask[1] != "" && splitTask[3] == "" ? allTasksQuadrant3 : allTasksQuadrant4;
            allTasksQuadrant.push(todaysTasks[index]);
            todaysTasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
        divUpdate.appendChild(todayButton);

        // CreateElement - button - archiveButton
        const archiveButton = document.createElement('button');
        archiveButton.textContent = 'A';
        archiveButton.className = 'update-buttons';
        archiveButton.addEventListener('click', () => {
            let allTasksQuadrant = splitTask[1] != "" && splitTask[3] == "/" ? archivedTasksQuadrant1 : splitTask[1] == "" && splitTask[3] == "/" ? archivedTasksQuadrant2 : splitTask[1] != "" && splitTask[3] == "" ? archivedTasksQuadrant3 : archivedTasksQuadrant4;
            allTasksQuadrant.push(todaysTasks[index]);
            todaysTasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
        divUpdate.appendChild(archiveButton);

        // CreateElement - button - editButton
        const editButton = document.createElement('button');
        editButton.textContent = 'E';
        editButton.className = 'update-buttons';
        editButton.addEventListener('click', () => {
        });
        divUpdate.appendChild(editButton);

        // CreateElement - button - deleteButton
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'update-buttons';
        deleteButton.addEventListener("click", () => {
            todaysTasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
        divUpdate.appendChild(deleteButton);
    };
};

/**************************** LocalStorage ****************************/

function saveTasks() {
    localStorage.setItem('todaysTasks', JSON.stringify(todaysTasks));
    localStorage.setItem('allTasksQuadrant1', JSON.stringify(allTasksQuadrant1));
    localStorage.setItem('allTasksQuadrant2', JSON.stringify(allTasksQuadrant2));
    localStorage.setItem('allTasksQuadrant3', JSON.stringify(allTasksQuadrant3));
    localStorage.setItem('allTasksQuadrant4', JSON.stringify(allTasksQuadrant4));
    localStorage.setItem('archivedTasksQuadrant1', JSON.stringify(archivedTasksQuadrant1));
    localStorage.setItem('archivedTasksQuadrant2', JSON.stringify(archivedTasksQuadrant2));
    localStorage.setItem('archivedTasksQuadrant3', JSON.stringify(archivedTasksQuadrant3));
    localStorage.setItem('archivedTasksQuadrant4', JSON.stringify(archivedTasksQuadrant4));
};






































/*
const taskInput = document.getElementById('taskInput');
const tasklist = document.getElementById('taskList');

loadTasks();
selectAllLi();

/**************************** Add & Delete ****************************

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

/**************************** LocalStorage ****************************

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

/**************************** Drag & Drop *****************************

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
*/
const taskInput = document.getElementById('taskInput');
const quadrant1 = document.getElementById('quadrant1');
const quadrant2 = document.getElementById('quadrant2');
const quadrant3 = document.getElementById('quadrant3');
const quadrant4 = document.getElementById('quadrant4');

loadTasks();
selectAllLi();

/*************************** Event Listener ***************************/

/**************************** Add & Delete ****************************/

function preprocessInput() {

    let newTask = taskInput.value.trim();

    if (newTask) {

        newTask = newTask.split(";");
        
        if (newTask[1] == undefined || newTask[1] == "") {
            alert("Enter a Quadrant (1, 2, 3 or 4)");
        }
        else if (newTask[1] == 1) {
        
            let quadrant = quadrant1
        
            addTask(newTask, quadrant);
            saveTask();
            taskInput.value = '';
        }
        else if (newTask[1] == 2) {
        
            let quadrant = quadrant2
        
            addTask(newTask, quadrant);
            saveTask();
            taskInput.value = '';
        }
        else if (newTask[1] == 3) {
        
            let quadrant = quadrant3
        
            addTask(newTask, quadrant);
            saveTask();
            taskInput.value = '';
        }
        else if (newTask[1] == 4) {
        
            let quadrant = quadrant4
        
            addTask(newTask, quadrant);
            saveTask();
            taskInput.value = '';
        }
        else {
            alert("Incorrect format. Please check again.")
        }
    }
    else {
        alert("Can't add a blank task.")
    }
}

/**************************** Add & Delete ****************************/

function addTask(newTask, quadrant) {
    const listItem = document.createElement('li');
    listItem.textContent = newTask[0];
    quadrant.appendChild(listItem)
    deleteTask(listItem, quadrant);
    listItem.setAttribute('draggable', true);
    selectAllLi();
}

function deleteTask(listItem, quadrant) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteTask';
    listItem.appendChild(deleteButton);
    //
    quadrant.appendChild(listItem);
    deleteButton.addEventListener('click', function() {
        quadrant.removeChild(listItem);
        saveTask();
    })
}

/**************************** LocalStorage ****************************/

function saveTask() {

    let allTasks = [];
    
    quadrant1.querySelectorAll('li').forEach(function(item) {
        allTasks.push([item.textContent.replace('X', '').trim(), 1]);
    })
    quadrant2.querySelectorAll('li').forEach(function(item) {
        allTasks.push([item.textContent.replace('X', '').trim(), 2]);
    })
    quadrant3.querySelectorAll('li').forEach(function(item) {
        allTasks.push([item.textContent.replace('X', '').trim(), 3]);
    })
    quadrant4.querySelectorAll('li').forEach(function(item) {
        allTasks.push([item.textContent.replace('X', '').trim(), 4]);
    })
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function loadTasks() {

    const allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    
    let len = allTasks.length;
    for (let i = 0; i < len; i++) {
        addTask(allTasks[i][0], allTasks[i][1])
        /* preprocessInput(allTasks[i]) */
    }
    
    /* allTasks.forEach(preprocessInput(allTasks[0], allTasks[1])); */
}

/**************************** Drag & Drop *****************************/

let draggedItem = null;

function selectAllLi() {

    const allListItems = document.querySelectorAll('li');

    allListItems.forEach(item => {
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
    },
    { offset: Number.NEGATIVE_INFINITY }
    ).element;
}
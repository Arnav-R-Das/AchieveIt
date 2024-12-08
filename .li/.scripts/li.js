const taskInput = document.getElementById('taskInput');
const quadrant1 = document.getElementById('quadrant1');
const quadrant2 = document.getElementById('quadrant2');
const quadrant3 = document.getElementById('quadrant3');
const quadrant4 = document.getElementById('quadrant4');


// Load tasks from LocalStorage
// const allTasks = loadTasks();
// displayTasks();

// selectAllLi();


/**********************************************************************/

function preprocessInput() {

    // Take input
    let newTask = taskInput.value;

    // Split Input
    newTask = newTask.split(";");

    // Validate Input
    let len = newTask.length;
    if (len != 4) {
        if (len < 4) {
            len = 4 - len;
            if (len == 1) {
                alert("There is a missing semicolon ( ; ) \n\nCorrect format: \n>>> Task ; Deadline ; Schedule ; Impact");
            }
            else {
                alert("There are " + len + " missing semicolons ( ; ) \n\nCorrect format: \n>>> Task ; Deadline ; Schedule ; Impact");}
        }
        else {
            len = len - 4;
            if (len == 1) {
                alert("There is an extra semicolon ( ; ) \n\nCorrect format: \n>>> Task ; Deadline ; Schedule ; Impact");
            }
            else {
                alert("There are " + len + " extra semicolons ( ; ) \n\nCorrect format: \n>>> Task ; Deadline ; Schedule ; Impact");
            }
        }
    }
    else {

        // Trim Whitespace
        let i = 0;
        for (; i < 4; i++) {
            newTask[i] = newTask[i].trim();
        }

        // Validate Task
        if (newTask[0] == "") {
            alert("Can't add an empty task. \nEnter a task.");
        }
        else {

            // Validate Deadline
            if (newTask[1] != "d" && newTask[1] != "") {
                alert("Please correct the format of DEADLINE");
            }
            else {

                // Validate Schedule
                if (newTask[2] != "s" && newTask[2] != "") {
                    alert("Please correct the format of SCHEDULE");
                }
                else {

                    // Validate Impact
                    if (newTask[3] != "/" && newTask[3] != "") {
                        alert("Please correct the format of IMPACT \n\nFor tasks with Long-term Impact \n>>> Enter / \n\n For tasks with No Long-term Impact \n>>> Leave it empty");
                    }
                    else {
                        // allTasks.push(newTask);
                        // saveTasks();
                        // displayTasks();
                        taskInput.value = '';
                    }
                }
            }
        }
    }

    /*

    if (newTask) {
        
        if (newTask[1] == undefined || newTask[1] == "") {
            alert("Enter a Quadrant (1, 2, 3 or 4)");
        }
        else if (newTask[1] == 1 || newTask[1] == 2 || newTask[1] == 3 || newTask[1] == 4) {
            allTasks.push(newTask);
            saveTasks();
            displayTasks();
            taskInput.value = '';
        }
        else {
            alert("Incorrect input/format. Please check again.");
        }
    }
    else {
        alert("Can't add a blank task.");
    }
    */
}

/**************************** DisplayTasks ****************************

function displayTasks() {

    // Delete all existing 'li'
    [quadrant1, quadrant2, quadrant3, quadrant4].forEach(q => q.innerHTML = '');

    // Loop
    for (i = 0, len = allTasks.length; i < len; i++) {

        // Split input into elements of array
        let splitInput = allTasks[i].split(";");

        // Identify quadrant
        let quadrant = splitInput[1] == 1 ? quadrant1 : splitInput[1] == 2 ? quadrant2 : splitInput[1] == 3 ? quadrant3 : quadrant4;

        // CreateElement 'li'
        const listItem = document.createElement('li');
        listItem.textContent = splitInput[0];
        quadrant.appendChild(listItem);

        // Add Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deleteTask';
        deleteButton.addEventListener('click', () => {
            allTasks.splice(i, 1);
            saveTasks();
            displayTasks();
        })
        listItem.appendChild(deleteButton);

        // Move to Today's tasks
        const TodaysTaskButton = document.createElement('button');
        TodaysTaskButton.textContent = 'T';
        TodaysTaskButton.className = 'deleteTask';
        TodaysTaskButton.addEventListener('click', () => {
        })
        listItem.appendChild(TodaysTaskButton);

        // Move to Archive
        const ArchiveButton = document.createElement('button');
        ArchiveButton.textContent = 'A';
        ArchiveButton.className = 'deleteTask';
        ArchiveButton.addEventListener('click', () => {
        })
        listItem.appendChild(ArchiveButton);
    }
}

/**************************** LocalStorage ****************************

function saveTasks() {
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function loadTasks() {
    return JSON.parse(localStorage.getItem('allTasks')) || [];
}

/**************************** Drag & Drop *****************************

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
    
    // Save tasks after drag ends
    saveTasks();
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

*/
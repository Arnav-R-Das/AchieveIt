const taskInput = document.getElementById('taskInput');
const quadrant1 = document.getElementById('quadrant1');
const quadrant2 = document.getElementById('quadrant2');
const quadrant3 = document.getElementById('quadrant3');
const quadrant4 = document.getElementById('quadrant4');


// Load tasks from LocalStorage
// const demoTasks = loadTasks();
const demoTasks = [];
displayTasks();

// selectAllLi();


/**********************************************************************/

function preprocessInput() {

    // Take input
    let newTask = taskInput.value;

    // Split Input
    let validateTask = newTask.split(";");

    // Validate Input
    var len = validateTask.length;
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
        var i = 0;
        for (; i < 4; i++) {
            validateTask[i] = validateTask[i].trim();
        }

        // Validate Task
        if (validateTask[0] == "") {
            alert("Can't add an empty task. \nEnter a task.");
        }
        else {

            // Validate Deadline
            // if (validateDate(validateTask[1])) {
            //     alert("Please correct the format of DEADLINE");
            // }
            // else {

                // Validate Schedule
                // if (validateDate(validateTask[2])) {
                //     alert("Please correct the format of SCHEDULE");
                // }
                // else {

                    // Validate Impact
                    if (validateTask[3] != "/" && validateTask[3] != "") {
                        alert("Please correct the format of IMPACT \n\nFor tasks with Long-term Impact \n>>> Enter / \n\nFor tasks with No Long-term Impact \n>>> Leave it empty");
                    }
                    else {

                        // Concatinate Validated Task
                        let validTask = "";
                        var i = 0;
                        validTask = validTask.concat(" ", validateTask[i]).trim();
                        i++;
                        for (; i < 4; i++) {
                            validTask = validTask.concat(";", validateTask[i]);
                        }

                        demoTasks.push(validTask);
                        saveTasks();
                        displayTasks();
                        taskInput.value = '';
                    }

                // }
            // }
        }
    }
}

function validateDate(x) {

    /*
    // Month
    let month = x.toLowerCase();
    switch(month) {
        case "jan":
        case "01":
        case "1":
            alert("January");
            break;

        case "feb":
        case "02":
        case "2":
            alert("February");
            break;

        case "mar":
        case "03":
        case "3":
            alert("March");
            break;
        
        case "apr":
        case "04":
        case "4":
            alert("April");
            break;

        case "may":
        case "05":
        case "5":
            alert("May");
            break;

        case "jun":
        case "06":
        case "6":
            alert("June");
            break;

        case "jul":
        case "07":
        case "7":
            alert("July");
            break;

        case "aug":
        case "08":
        case "8":
            alert("August");
            break;

        case "sep":
        case "09":
        case "9":
            alert("September");
            break;

        case "oct":
        case "10":
            alert("October");
            break;

        case "nov":
        case "11":
            alert("November");
            break;

        case "dec":
        case "12":
            alert("December");
            break;

        default:
            alert("Not found");
    }
    */
}

/**************************** DisplayTasks ****************************/

function displayTasks() {

    // Delete all existing 'li'
    [quadrant1, quadrant2, quadrant3, quadrant4].forEach(q => q.innerHTML = '');

    // Loop
    for (var i = 0, len = demoTasks.length; i < len; i++) {

        // Split input into elements of array
        let splitiofallTasks = demoTasks[i].split(";");

        // Identify quadrant
        var quadrant;

        // Deadline
        if (splitiofallTasks[1] != "") {
            if (splitiofallTasks[3] == "/") {
                quadrant = quadrant1;
            }
            else {
                quadrant = quadrant3;
            }
        }
        // No Deadline
        else {
            if (splitiofallTasks[3] == "/") {
                quadrant = quadrant2;
            }
            else {
                quadrant = quadrant4;
            }
        }

        // CreateElement 'li'
        const listItem = document.createElement('li');
        
        // CreateElement Deadline
        if (splitiofallTasks[1] != "") {
            const divDeadline = document.createElement('div');
            divDeadline.textContent = splitiofallTasks[1];
            divDeadline.className = 'time';
            listItem.appendChild(divDeadline);
        }
        
        // CreateElement Schedule
        const divSchedule = document.createElement('div');
        divSchedule.textContent = splitiofallTasks[2];
        divSchedule.className = 'time';
        listItem.appendChild(divSchedule);
        
        // CreateElement Task
        const divTask = document.createElement('div');
        divTask.textContent = splitiofallTasks[0];
        divTask.className = 'task';
        listItem.appendChild(divTask);

        // Append li to quadrant
        quadrant.appendChild(listItem);

        /*
        // Add Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deleteTask';
        deleteButton.addEventListener('click', () => {
            demoTasks.splice(i, 1);
            saveTasks();
            displayTasks();
        })
        listItem.appendChild(deleteButton);

        // Add Today's tasks Button
        const TodaysTaskButton = document.createElement('button');
        TodaysTaskButton.textContent = 'T';
        TodaysTaskButton.className = 'deleteTask';
        TodaysTaskButton.addEventListener('click', () => {
        })
        listItem.appendChild(TodaysTaskButton);

        // Add Archive Button
        const ArchiveButton = document.createElement('button');
        ArchiveButton.textContent = 'A';
        ArchiveButton.className = 'deleteTask';
        ArchiveButton.addEventListener('click', () => {
        })
        listItem.appendChild(ArchiveButton);
        */
    }
}

/**************************** LocalStorage ****************************/

function saveTasks() {
    localStorage.setItem('demoTasks', JSON.stringify(demoTasks));
}

/*
function loadTasks() {
    return JSON.parse(localStorage.getItem('demoTasks')) || [];
}
*/

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
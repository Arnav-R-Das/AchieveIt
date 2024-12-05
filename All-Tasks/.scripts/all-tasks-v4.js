const taskInput = document.getElementById('taskInput');
const quadrant1 = document.getElementById('quadrant1');
const quadrant2 = document.getElementById('quadrant2');
const quadrant3 = document.getElementById('quadrant3');
const quadrant4 = document.getElementById('quadrant4');

// Load tasks from LocalStorage
const allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
displayTasks();

// selectAllLi();

/**********************************************************************/

function validateInput() {

    // Trim whitespace
    let newTask = taskInput.value.trim();

    // Validate
    if (newTask) {

        let validateInput = newTask.split(";");

        if (validateInput[1] == undefined || validateInput[1] == "") {
            alert("Enter a Quadrant (1, 2, 3 or 4)");
        }
        else if (validateInput[1] == 1 || validateInput[1] == 2 || validateInput[1] == 3 || validateInput[1] == 4) {
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
}

function displayTasks() {

    // Delete all existing 'li'
    [quadrant1, quadrant2, quadrant3, quadrant4].forEach(q => q.innerHTML = '');

    // Loop
    allTasks.forEach((task, index) => {

        // Split input into elements of array
        let [taskText, quadrantNum] = task.split(";");

        // Identify quadrant
        let quadrant = quadrantNum == 1 ? quadrant1 : quadrantNum == 2 ? quadrant2 : quadrantNum == 3 ? quadrant3 : quadrant4;

        // Create 'li'
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        /*
        listItem.setAttribute('draggable', true);
        listItem.setAttribute('data-index', i);
        listItem.addEventListener('dragstart', handleDragStart);
        listItem.addEventListener('dragend', handleDragEnd);
        */
        quadrant.appendChild(listItem);

        // Add Delete button
        addDeleteButton(listItem, index);
    });
}

function addDeleteButton(listItem, index) {

    // Create 'deleteButton'
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteTask';
    deleteButton.addEventListener('click', () => {
        allTasks.splice(index, 1);
        saveTasks();
        displayTasks();
    });
    listItem.appendChild(deleteButton);
}

/**************************** LocalStorage ****************************/

function saveTasks() {
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

/**************************** Drag & Drop *****************************

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-index'));
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

[quadrant1, quadrant2, quadrant3, quadrant4].forEach((quadrant, index) => {
    quadrant.addEventListener('dragover', e => e.preventDefault());
    quadrant.addEventListener('drop', e => {
        e.preventDefault();
        const taskIndex = e.dataTransfer.getData('text/plain');
        if (taskIndex !== null) {
            allTasks[taskIndex] = `${allTasks[taskIndex].split(";")[0]};${index + 1}`;
            saveTasks();
            displayTasks();
        }
    });
});

*/
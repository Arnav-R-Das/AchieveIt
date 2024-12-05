const taskInput = document.getElementById('taskInput');
const quadrant1 = document.getElementById('quadrant1');
const quadrant2 = document.getElementById('quadrant2');
const quadrant3 = document.getElementById('quadrant3');
const quadrant4 = document.getElementById('quadrant4');

loadTasks();

/**************************** Add & Delete ****************************/

function preprocessInput() {
    let newInput = taskInput.value.trim();
    if (newInput) {
        newInput = newInput.split(";");
            // alert(newInput[1])
        if (newInput[1] == undefined || newInput[1] == "") {
            alert("Enter a Quadrant (1, 2, 3 or 4)");
        }
        else if (newInput[1] == 1) {
                // alert("A");
            let quadrant = quadrant1
            addTask(newInput, quadrant);
            taskInput.value = '';
        }
        else if (newInput[1] == 2) {
                // alert("B");
            let quadrant = quadrant2
            addTask(newInput, quadrant);
            taskInput.value = '';
        }
        else if (newInput[1] == 3) {
                // alert("C");
            let quadrant = quadrant3
            addTask(newInput, quadrant);
            taskInput.value = '';
        }
        else if (newInput[1] == 4) {
                // alert("D");
            let quadrant = quadrant4
            addTask(newInput, quadrant);
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
*/

function addTask(newInput, quadrant) {
    const addTask = document.createElement('li');
    addTask.textContent = newInput[0];
    quadrant.appendChild(addTask)
    deleteTask(addTask, quadrant);
    addTask.setAttribute('draggable', true);
    selectAllLi();
}

function deleteTask(deleteTask, quadrant) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteTask';
    deleteTask.appendChild(deleteButton);
    //
    quadrant.appendChild(deleteTask);
    deleteButton.addEventListener('click', function() {
    quadrant.removeChild(deleteTask);
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

*/
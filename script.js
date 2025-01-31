
/************************** Global Variables **************************/

    // document.getElementById
        const quadrant1 = document.getElementById('quadrant1');
        const quadrant2 = document.getElementById('quadrant2');
        const quadrant3 = document.getElementById('quadrant3');
        const quadrant4 = document.getElementById('quadrant4');
        const singlelist = document.getElementById('singlelist');

    // Get from localstorage
        const todaysTasks = JSON.parse(localStorage.getItem('todaysTasks')) || [];
        const allTasksQuadrant1 = JSON.parse(localStorage.getItem('allTasksQuadrant1')) || [];
        const allTasksQuadrant2 = JSON.parse(localStorage.getItem('allTasksQuadrant2')) || [];
        const allTasksQuadrant3 = JSON.parse(localStorage.getItem('allTasksQuadrant3')) || [];
        const allTasksQuadrant4 = JSON.parse(localStorage.getItem('allTasksQuadrant4')) || [];
        const archivedTasksQuadrant1 = JSON.parse(localStorage.getItem('archivedTasksQuadrant1')) || [];
        const archivedTasksQuadrant2 = JSON.parse(localStorage.getItem('archivedTasksQuadrant2')) || [];
        const archivedTasksQuadrant3 = JSON.parse(localStorage.getItem('archivedTasksQuadrant3')) || [];
        const archivedTasksQuadrant4 = JSON.parse(localStorage.getItem('archivedTasksQuadrant4')) || [];

    // Other
        const views = [
            [allTasksQuadrant1, allTasksQuadrant2, allTasksQuadrant3, allTasksQuadrant4],
            [todaysTasks],
            [archivedTasksQuadrant1, archivedTasksQuadrant2, archivedTasksQuadrant3, archivedTasksQuadrant4]
        ]
        const settings = JSON.parse(localStorage.getItem('settings')) || [0, false];
            // settings[0]: views
            // settings[1]: settings

/*************************** EventListeners ***************************/

    // Insert/Update input
        userInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                preprocessInput();
            }
        });

/*********************** Initial Function calls ***********************/

    // Display tasks
        displayTasks();

    // Switch views
        if (settings[0] == 0) {
            viewAll();
        }
        else if (settings[0] == 1) {
            viewTdy();
        }
        else if (settings[0] == 2) {
            viewArc();
        }

    // Switch color modes
        if (settings[1]) {
            darkMode();
        }
        else {
            lightMode();
        }

/***************************** Functions ******************************/

    // Preprocess input
        function preprocessInput() {

            // Take input
            let newTask = userInput.value;

            // Split Input
            let validateTask = newTask.split(";");

            // Validate Input
            var len = validateTask.length;
            if (len != 4) {
                if (len < 4) {
                    len = 4 - len;
                    if (len == 1) {
                        alert("1 missing semicolon \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");
                    }
                    else {
                        alert(len + " missing semicolons \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");}
                }
                else {
                    len = len - 4;
                    if (len == 1) {
                        alert("1 extra semicolon \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");
                    }
                    else {
                        alert(len + " extra semicolons \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");
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
                                alert("For tasks with Long-term Impact \n>>> Enter / \n\nFor tasks with No Long-term Impact \n>>> Leave it empty");
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

                                if (settings[0] == 0 || settings[0] == 2) {
                                    if (validateTask[1] != "") {
                                        if (validateTask[3] == "/") {
                                            views[settings[0]][0].push(validTask);
                                        }
                                        else {
                                            views[settings[0]][2].push(validTask);
                                        }
                                    }
                                    else {
                                        if (validateTask[3] == "/") {
                                            views[settings[0]][1].push(validTask);
                                        }
                                        else {
                                            views[settings[0]][3].push(validTask); 
                                        }
                                    }
                                }
                                else if (settings[0] == 1) {
                                    todaysTasks.push(validTask);
                                }

                                saveTasks();
                                displayTasks();
                                userInput.value = '';
                            }

                        // }
                    // }
                }
            }
        }
        /*
        function validateDate(x) {
            // Month
            let month = x.toLowerCase();
            switch(month) {
                case "":
                case "01":
                case "1":
                    alert("uary");
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
        }
        */

    // Display tasks
        function displayTasks() {

            // Delete all existing 'li'
            [quadrant1, quadrant2, quadrant3, quadrant4, singlelist].forEach(q => q.innerHTML = '');

            let lists = views[settings[0]];
            
            for (var i = 0; i < views[settings[0]].length; i++) {
                for (var j = 0, len = lists[i].length; j < len; j++) {

                    // Split each element of the array into Task, Deadline, Schedule & Impact
                    let splitTask = lists[i][j].split(";");

                    // Index
                    let index = j;

                    // Identify quadrant
                    let list;
                    if (settings[0] == 0 || settings[0] == 2) {
                        list = i == 0 ? quadrant1 : i == 1 ? quadrant2 : i == 2 ? quadrant3 : quadrant4;
                    }
                    else {
                        list = singlelist;
                    }

                    // Create li element
                    const listItem = document.createElement('li');
                    listItem.className = 'taskli';
                    list.appendChild(listItem);
                    
                    /* CreateElement - div - divQuadrant
                    if (settings[0] == 1) {
                        const divQuadrant = document.createElement('div');
                        if (splitTask[1] != "") {
                            if (splitTask[3] == "/") {
                                divQuadrant.textContent = "1";
                            }
                            else {
                                divQuadrant.textContent = "3";
                            }
                        }
                        else if (splitTask[1] == "") {
                            if (splitTask[3] == "/") {
                                divQuadrant.textContent = "2";
                            }
                            else {
                                divQuadrant.textContent = "4";
                            }
                        }
                        divQuadrant.className = 'col-info';
                        listItem.appendChild(divQuadrant);
                    }
                    */

                    // Create "Deadline" div
                    if (splitTask[1] != "" || settings[0] == 1) {
                        const divDeadline = document.createElement('div');
                        divDeadline.textContent = splitTask[1];
                        divDeadline.className = 'col-info';
                        listItem.appendChild(divDeadline);
                    }
                    
                    // Create "Schedule" div
                    const divSchedule = document.createElement('div');
                    divSchedule.textContent = splitTask[2];
                    divSchedule.className = 'col-info';
                    listItem.appendChild(divSchedule);
                    
                    // Create "Task" div
                    const divTask = document.createElement('div');
                    divTask.textContent = splitTask[0];
                    divTask.className = 'col-task';
                    listItem.appendChild(divTask);

                    // Create "Update" div
                    const divUpdate = document.createElement('div');
                    divUpdate.className = 'col-update';
                    listItem.appendChild(divUpdate);

                    // Create "Move to/from today" button
                    const todayButton = document.createElement('button');
                    todayButton.textContent = 'T';
                    todayButton.className = 'col-update-buttons';
                    todayButton.addEventListener('click', () => {
                        if (settings[0] == 0 || settings[0] == 2) {
                            let i = list == quadrant1 ? views[settings[0]][0] : list == quadrant2 ? views[settings[0]][1] : list == quadrant3 ? views[settings[0]][2] : views[settings[0]][3];
                            todaysTasks.push(i[index]);
                            i.splice(index, 1);
                        }
                        else {
                            let i = splitTask[1] != "" && splitTask[3] == "/" ? allTasksQuadrant1 : splitTask[1] == "" && splitTask[3] == "/" ? allTasksQuadrant2 : splitTask[1] != "" && splitTask[3] == "" ? allTasksQuadrant3 : allTasksQuadrant4;
                            i.push(todaysTasks[index]);
                            todaysTasks.splice(index, 1);
                        }
                        saveTasks();
                        displayTasks();
                    })
                    divUpdate.appendChild(todayButton);

                    // Create "Archive/Unarchive" button
                    const archiveButton = document.createElement('button');
                    archiveButton.textContent = 'A';
                    archiveButton.className = 'col-update-buttons';
                    archiveButton.addEventListener('click', () => {
                        let i = list == quadrant1 ? views[settings[0]][0] : list == quadrant2 ? views[settings[0]][1] : list == quadrant3 ? views[settings[0]][2] : views[settings[0]][3];
                        if (settings[0] == 0) {
                            let j = list == quadrant1 ? archivedTasksQuadrant1 : list == quadrant2 ? archivedTasksQuadrant2 : list == quadrant3 ? archivedTasksQuadrant3 : archivedTasksQuadrant4;
                            j.push(i[index]);
                            i.splice(index, 1);
                        }
                        else if (settings[0] == 1) {
                            let i = splitTask[1] != "" && splitTask[3] == "/" ? archivedTasksQuadrant1 : splitTask[1] == "" && splitTask[3] == "/" ? archivedTasksQuadrant2 : splitTask[1] != "" && splitTask[3] == "" ? archivedTasksQuadrant3 : archivedTasksQuadrant4;
                            i.push(todaysTasks[index]);
                            todaysTasks.splice(index, 1);
                        }
                        else if (settings[0] == 2) {
                            let j = list == quadrant1 ? allTasksQuadrant1 : list == quadrant2 ? allTasksQuadrant2 : list == quadrant3 ? allTasksQuadrant3 : allTasksQuadrant4;
                            j.push(i[index]);
                            i.splice(index, 1);
                        }
                        saveTasks();
                        displayTasks();
                    })
                    divUpdate.appendChild(archiveButton);

                    // Create "Edit" button
                    const editButton = document.createElement('button');
                    editButton.textContent = 'E';
                    editButton.className = 'col-update-buttons';
                    editButton.addEventListener('click', () => {
                        let i = list == quadrant1 ? views[settings[0]][0] : list == quadrant2 ? views[settings[0]][1] : list == quadrant3 ? views[settings[0]][2] : list == quadrant4 ? views[settings[0]][3] : todaysTasks;
                        userInput.value = i[index];
                        userInput.focus();
                        i.splice(index, 1);
                        saveTasks();
                        displayTasks();
                    })
                    divUpdate.appendChild(editButton);

                    // Create "Delete" button
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'X';
                    deleteButton.className = 'col-update-buttons';
                    deleteButton.addEventListener("click", () => {
                        let i = list == quadrant1 ? views[settings[0]][0] : list == quadrant2 ? views[settings[0]][1] : list == quadrant3 ? views[settings[0]][2] : list == quadrant4 ? views[settings[0]][3] : todaysTasks;
                        i.splice(index, 1);
                        saveTasks();
                        displayTasks();
                    });
                    divUpdate.appendChild(deleteButton);

                    // Highlight impactful tasks in Today's view
                    if (settings[0] == 1 && splitTask[3] == "/") {
                        listItem.style.setProperty('background-color', 'var(--background-color-list-highlight)');
                        divUpdate.style.setProperty('background-color', 'var(--background-color-list-highlight)');
                        divUpdate.style.setProperty('box-shadow', '-20px 0px 10px -5px var(--background-color-list-highlight)');

                        todayButton.style.setProperty('background-color', 'var(--background-color-list-highlight)');
                        archiveButton.style.setProperty('background-color', 'var(--background-color-list-highlight)');
                        editButton.style.setProperty('background-color', 'var(--background-color-list-highlight)');
                        deleteButton.style.setProperty('background-color', 'var(--background-color-list-highlight)');
                    }
                }
            }

            attachDragAndDrop();
        }

    // Save to localstorage
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
        }

    // Drag & drop
        function attachDragAndDrop() {
            [quadrant1, quadrant2, quadrant3, quadrant4, singlelist].forEach((quadrant, index) => {
                quadrant.dataset.index = index;
                enableDragAndDrop(quadrant);
            });
        }
        function enableDragAndDrop(quadrant) {
            const tasks = quadrant.querySelectorAll('.taskli');

            tasks.forEach(task => {
                task.setAttribute('draggable', true);

                task.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', e.target.dataset.index);
                    e.target.classList.add('dragging');
                });

                task.addEventListener('dragend', (e) => {
                    e.target.classList.remove('dragging');
                });
            });

            quadrant.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfterElement(quadrant, e.clientY);
                const draggingElement = quadrant.querySelector('.dragging');

                if (afterElement == null) {
                    quadrant.appendChild(draggingElement);
                } else {
                    quadrant.insertBefore(draggingElement, afterElement);
                }
            });
            
            quadrant.addEventListener('drop', (e) => {
                e.preventDefault();
                const newOrder = Array.from(quadrant.querySelectorAll('.taskli')).map(task => task.textContent.trim());
                const quadrantIndex = parseInt(quadrant.dataset.index, 10);

                views[settings[0]][quadrantIndex] = newOrder;
                saveTasks();
            });
        }
        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.taskli:not(.dragging)')];

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

    // Switch views
        function viewAll() {
            document.getElementById('view-singlelist').style.display = 'none';
            document.getElementById('view-matrix').style.display = 'block';
            document.getElementById('All').style.outline = '1px solid var(--color-border)';
            document.getElementById('Tdy').style.outline = 'none';
            document.getElementById('Arc').style.outline = 'none';
            settings[0] = 0;
            localStorage.setItem('settings', JSON.stringify(settings));
            displayTasks();
        }
        function viewTdy() {
            document.getElementById('view-matrix').style.display = 'none';
            document.getElementById('view-singlelist').style.display = 'block';
            document.getElementById('Tdy').style.outline = '1px solid var(--color-border)';
            document.getElementById('All').style.outline = 'none';
            document.getElementById('Arc').style.outline = 'none';
            settings[0] = 1;
            localStorage.setItem('settings', JSON.stringify(settings));
            displayTasks();
        }
        function viewArc() {
            document.getElementById('view-singlelist').style.display = 'none';
            document.getElementById('view-matrix').style.display = 'block';
            document.getElementById('Arc').style.outline = '1px solid var(--color-border)';
            document.getElementById('All').style.outline = 'none';
            document.getElementById('Tdy').style.outline = 'none';
            settings[0] = 2;
            localStorage.setItem('settings', JSON.stringify(settings));
            displayTasks();
        }

    // Switch color modes
        function darkMode() {

            document.getElementById('darkMode').style.display = 'none';
            document.getElementById('lightMode').style.display = 'block';

            document.querySelector(':root').style.setProperty('--color-font', 'hsl(0, 0%, 100%)');
            document.querySelector(':root').style.setProperty('--color-border', 'hsl(0, 0%, 25%)');
            document.querySelector(':root').style.setProperty('--background-color-main', 'hsl(0, 0%, 0%)');
            document.querySelector(':root').style.setProperty('--background-color-list', 'hsl(0, 0%, 10%)');
            document.querySelector(':root').style.setProperty('--background-color-list-highlight', 'hsl(0, 0%, 7.5%)');

            settings[1] = true;
            localStorage.setItem('settings', JSON.stringify(settings));

        }
        function lightMode() {

            document.getElementById('lightMode').style.display = 'none';
            document.getElementById('darkMode').style.display = 'block';

            document.querySelector(':root').style.setProperty('--color-font', 'hsl(0, 0%, 0%)');
            document.querySelector(':root').style.setProperty('--color-border', 'hsl(0, 0%, 75%)');
            document.querySelector(':root').style.setProperty('--background-color-main', 'hsl(0, 0%, 90%)');
            document.querySelector(':root').style.setProperty('--background-color-list', 'hsl(0, 0%, 100%)');
            document.querySelector(':root').style.setProperty('--background-color-list-highlight', 'hsl(0, 0%, 97.5%)');

            settings[1] = false;
            localStorage.setItem('settings', JSON.stringify(settings));

        }

/******************************* Loops ********************************/

    // Display date, day & time
        setInterval(() => {

            let today = new Date();

            // let yearRN = today.getFullYear();
            switch(today.getMonth()) {
                case 0:
                    monthRN = "JAN";
                    break;
                case 1:
                    monthRN = "FEB";
                    break;
                case 2:
                    monthRN = "MAR";
                    break;
                case 3:
                    monthRN = "APR";
                    break;
                case 4:
                    monthRN = "MAY";
                    break;
                case 5:
                    monthRN = "JUN";
                    break;
                case 6:
                    monthRN = "JUL";
                    break;
                case 7:
                    monthRN = "AUG";
                    break;
                case 8:
                    monthRN = "SEP";
                    break;
                case 9:
                    monthRN = "OCT";
                    break;
                case 10:
                    monthRN = "NOV";
                    break;
                case 11:
                    monthRN = "DEC";
                    break;
            }
            // let dayRN = today().getDay();
            let dateRN = today.getDate();
            let meridiemRN = "AM";
            let hourRN = today.getHours();
            switch(hourRN) {
                case 0:
                    hourRN = "12";
                    break;
                case 12:
                    meridiemRN = "PM";
                    break;
                case 13:
                    hourRN = "1";
                    meridiemRN = "PM";
                    break;
                case 14:
                    hourRN = "2";
                    meridiemRN = "PM";
                    break;
                case 15:
                    hourRN = "3";
                    meridiemRN = "PM";
                    break;
                case 16:
                    hourRN = "4";
                    meridiemRN = "PM";
                    break;
                case 17:
                    hourRN = "5";
                    meridiemRN = "PM";
                    break;
                case 18:
                    hourRN = "6";
                    meridiemRN = "PM";
                    break;
                case 19:
                    hourRN = "7";
                    meridiemRN = "PM";
                    break;
                case 20:
                    hourRN = "8";
                    meridiemRN = "PM";
                    break;
                case 21:
                    hourRN = "9";
                    meridiemRN = "PM";
                    break;
                case 22:
                    hourRN = "10";
                    meridiemRN = "PM";
                    break;
                case 23:
                    hourRN = "11";
                    meridiemRN = "PM";
                    break;
            }
            let minutesRN = today.getMinutes();
            switch (minutesRN) {
                case 0:
                    minutesRN = "00";
                    break;
                case 1:
                    minutesRN = "01";
                    break;
                case 2:
                    minutesRN = "02";
                    break;
                case 3:
                    minutesRN = "03";
                    break;
                case 4:
                    minutesRN = "04";
                    break;
                case 5:
                    minutesRN = "05";
                    break;
                case 6:
                    minutesRN = "06";
                    break;
                case 7:
                    minutesRN = "07";
                    break;
                case 8:
                    minutesRN = "08";
                    break;
                case 9:
                    minutesRN = "09";
                    break;
            }
            // let secondsRN = today.getSeconds();
            
            document.getElementById('week').textContent = "W?";
            document.getElementById('date').textContent = monthRN + " " + dateRN;
            document.getElementById('time').textContent = hourRN + ":" + minutesRN + " " + meridiemRN;

        }, 1000);
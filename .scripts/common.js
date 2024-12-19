
/************************** Local Variables ***************************/

const taskInput = document.getElementById('taskInput');

const colorMode = JSON.parse(localStorage.getItem('colorMode')) || [];

/**************************** Color Modes *****************************/

if (colorMode[0]) {
    darkMode();
}
else {
    lightMode();
}

function darkMode() {

    document.getElementById('darkMode').style.display = 'none';
    document.getElementById('lightMode').style.display = 'block';

    document.querySelector(':root').style.setProperty('--color-font', 'hsl(0, 0%, 100%)');
    document.querySelector(':root').style.setProperty('--color-border', 'hsl(0, 0%, 25%)');
    document.querySelector(':root').style.setProperty('--color-background-main', 'hsl(0, 0%, 0%)');
    document.querySelector(':root').style.setProperty('--color-background-list', 'hsl(0, 0%, 10%)');

    colorMode[0] = true;
    localStorage.setItem('colorMode', JSON.stringify(colorMode));

}

function lightMode() {

    document.getElementById('lightMode').style.display = 'none';
    document.getElementById('darkMode').style.display = 'block';

    document.querySelector(':root').style.setProperty('--color-font', 'hsl(0, 0%, 0%)');
    document.querySelector(':root').style.setProperty('--color-border', 'hsl(0, 0%, 85%)');
    document.querySelector(':root').style.setProperty('--color-background-main', 'hsl(0, 0%, 95%)');
    document.querySelector(':root').style.setProperty('--color-background-list', 'hsl(0, 0%, 100%)');

    colorMode[0] = false;
    localStorage.setItem('colorMode', JSON.stringify(colorMode));

}

/******************************* Clock ********************************/

setInterval(() => {

    let today = new Date();
    // let todaysYear = today.getFullYear();
    let todaysMonth = today.getMonth();
    let todaysDate = today.getDate();
    let todaysHours  = today.getHours();
    let todaysMinutes = today.getMinutes();
    // let todaysSeconds = today.getSeconds();
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    document.getElementById('week').textContent = "W?";
    document.getElementById('date').textContent = months[todaysMonth] + " " + todaysDate;
    document.getElementById('time').textContent = todaysHours + ":" + todaysMinutes;

}, 1000);

/******************************* Export *******************************

export {
    taskInput
};

*/
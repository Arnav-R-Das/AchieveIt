
/************************** Local Variables ***************************/

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
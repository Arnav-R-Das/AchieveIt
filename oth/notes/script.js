const notebox = document.getElementById('notebox');
const savedText = JSON.parse(localStorage.getItem('savedText')) || [""];

load();

function save() {
    x = notebox.value;
    localStorage.setItem('savedText', JSON.stringify(x));
}

function load() {
    notebox.value = savedText;
}

function indent() {
    
}
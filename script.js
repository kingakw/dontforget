let NOTE_INPUT;
let ALERT_INFO; // info o braku zadań / konieczności dodania tekstu
let ADD_BTN; // przycisk ADD - dodaje nowe elementy do listy
let UL_LIST; // nasza lista zadań, tagi <ul></ul>
let NEW_TASK; // nowo dodany LI, nowe zadanie
let ALL_TASKS; // lista wszystkich dodanych LI
let POPUP;
let POPUP_INFO; // alert w popupie, jak się doda pusty tekst
//let EDITED_NOTE;
let POPUP_INPUT;
let SAVE_POPUP_BTN;
let CLOSE_TODO_BTN;

let ID = 0;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    NOTE_INPUT = document.querySelector('.note-input');
    ALERT_INFO = document.querySelector('.alert-info');
    ADD_BTN = document.querySelector('.add-btn');
    UL_LIST = document.querySelector('.note-list ul');
    ALL_TASKS = document.getElementsByTagName('li');
    POPUP = document.querySelector('.popup');
    POPUP_INFO = document.querySelector('.popup-info');
    POPUP_INPUT = document.querySelector('.popup-input');
    SAVE_POPUP_BTN = document.querySelector('.accept');
    CLOSE_TODO_BTN = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    ADD_BTN.addEventListener('click', addNewTask);
    NOTE_INPUT.addEventListener('keyup', enterCheck);
    UL_LIST.addEventListener('click', checkClick);
}


const addNewTask = () => {
    if (NOTE_INPUT.value !== ''){
        ID++;
        NEW_TASK = document.createElement('li');
        NEW_TASK.innerText = NOTE_INPUT.value;
        NEW_TASK.setAttribute('id', `note-${ID}`);
        UL_LIST.appendChild(NEW_TASK);

        NOTE_INPUT.value = '';
        ALERT_INFO.innerText = '';
        addNoteTools();
    }else{
        ALERT_INFO.innerText = 'Write what needs to be done!'
    }
}

const addNoteTools = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    NEW_TASK.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    toolsPanel.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = `EDIT`;
    toolsPanel.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`
    toolsPanel.appendChild(deleteBtn);
}

const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const checkClick = e => {
    if (e.target.classList.value !== ''){
        if (e.target.closest('button').classList.contains('complete')) {
            e.target.closest('li').classList.toggle('completed');
            e.target.closest('button').classList.toggle('completed');
        } else if  (e.target.closest('button').classList.contains('edit')) {
            editTask(e);
        }else if  (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e);
        }
    }
}

const deleteTask = e => {
    const deleteLine = e.target.closest('li');
    deleteLine.remove();

    if (ALL_TASKS.length === 0){
        ALERT_INFO.innerText ='No tasks';
    }
}

document.addEventListener('DOMContentLoaded', main);

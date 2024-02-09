const localStorageKey = 'savedNotes';

const defaultNoteColor = '#3a9405';

function loadNotes() {
    let localData = localStorage.getItem(localStorageKey);
    return localData ? JSON.parse(localData) : [];
}

let notes = loadNotes();

function saveNotes() {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
}

function displayNotes() {
    let noteContainer = document.getElementById('note_container');
    let templateElement = document.getElementById('note_template');

    noteContainer.innerHTML = '';

    notes.forEach((note, index) => {
        let noteElement = templateElement.cloneNode(true);

        noteElement.querySelector('p[name=note-title]').innerText = note.title;
        noteElement.querySelector('p[name=note-content]').innerText = note.content;

        let timestamp = new Date(note.timestamp);
        let formattedDate = `${timestamp.getDate()}-${timestamp.getMonth() + 1}-${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}`;
        noteElement.querySelector('p[name=note-date]').innerText = formattedDate;

        noteElement.querySelectorAll('img[class=note-icon]').forEach(element => {
            element.setAttribute('id', index);
        });

        noteElement.querySelector('img[name=pin_note]').addEventListener('click', function() { pinNote(this.getAttribute('id')); });
        noteElement.querySelector('img[name=delete_note]').addEventListener('click', function() { deleteNote(this.getAttribute('id')); });

        noteElement.style.backgroundColor = note.color || defaultNoteColor;
        noteElement.classList.add('note');
        noteElement.removeAttribute('hidden');

        noteContainer.appendChild(noteElement);
    });
}

function createNote() {
    let title = document.querySelector('input[name=note_title]').value;
    let content = document.querySelector('textarea[name=note_content]').value;
    let color = document.querySelector('input[name=note_color]').value || defaultNoteColor;

    let note = { title, content, color, timestamp: Date.now() };
    notes.push(note);

    saveNotes();
    displayNotes();
}

function deleteNote(id) {
    notes.splice(id, 1);
    saveNotes();
    displayNotes();
}

function pinNote(id) {
    let note = notes.splice(id, 1)[0];
    notes.unshift(note);
    saveNotes();
    displayNotes();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input[name=note_color]').value = defaultNoteColor;
    document.querySelector('input[name=save_note]').addEventListener('click', createNote);
    displayNotes();
});

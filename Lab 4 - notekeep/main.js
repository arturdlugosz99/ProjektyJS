// Klucz używany do zapisywania i odczytywania notatek z localStorage
const localStorageKey = 'savedNotes';

// Domyślny kolor notatki
const defaultNoteColor = '#3a9405';

// Funkcja do ładowania notatek z localStorage
function loadNotes() {
    let localData = localStorage.getItem(localStorageKey);
    // Parsowanie JSON lub zwracanie pustej tablicy, jeśli nie ma danych
    return localData ? JSON.parse(localData) : [];
}

// Ładowanie notatek do zmiennej
let notes = loadNotes();

// Funkcja zapisująca aktualny stan notatek do localStorage
function saveNotes() {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
}

// Funkcja wyświetlająca notatki na stronie
function displayNotes() {
    let noteContainer = document.getElementById('note_container'); // Kontener na notatki
    let templateElement = document.getElementById('note_template'); // Szablon notatki

    noteContainer.innerHTML = ''; // Czyszczenie kontenera przed dodaniem notatek

    notes.forEach((note, index) => {
        let noteElement = templateElement.cloneNode(true); // Klonowanie szablonu dla każdej notatki

        // Wypełnianie notatki danymi
        noteElement.querySelector('p[name=note-title]').innerText = note.title;
        noteElement.querySelector('p[name=note-content]').innerText = note.content;

        // Formatowanie i wyświetlanie daty utworzenia notatki
        let timestamp = new Date(note.timestamp);
        let formattedDate = `${timestamp.getDate()}-${timestamp.getMonth() + 1}-${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}`;
        noteElement.querySelector('p[name=note-date]').innerText = formattedDate;

        // Przypisywanie identyfikatora do ikon
        noteElement.querySelectorAll('img[class=note-icon]').forEach(element => {
            element.setAttribute('id', index);
        });

        // Dodawanie obsługi zdarzeń dla ikon przypinania i usuwania
        noteElement.querySelector('img[name=pin_note]').addEventListener('click', function() { pinNote(this.getAttribute('id')); });
        noteElement.querySelector('img[name=delete_note]').addEventListener('click', function() { deleteNote(this.getAttribute('id')); });

        // Ustawienie koloru tła notatki
        noteElement.style.backgroundColor = note.color || defaultNoteColor;
        noteElement.classList.add('note'); // Dodanie klasy dla stylizacji
        noteElement.removeAttribute('hidden'); // Usunięcie atrybutu ukrywającego

        noteContainer.appendChild(noteElement); // Dodanie notatki do kontenera
    });
}

// Funkcja tworząca nową notatkę
function createNote() {
    // Pobieranie danych z formularza
    let title = document.querySelector('input[name=note_title]').value;
    let content = document.querySelector('textarea[name=note_content]').value;
    let color = document.querySelector('input[name=note_color]').value || defaultNoteColor;

    // Tworzenie obiektu notatki i dodawanie do tablicy
    let note = { title, content, color, timestamp: Date.now() };
    notes.push(note);

    // Zapisywanie notatek i odświeżanie widoku
    saveNotes();
    displayNotes();
}

// Funkcja usuwająca notatkę
function deleteNote(id) {
    notes.splice(id, 1); // Usunięcie notatki o danym indeksie
    saveNotes(); // Zapisywanie zmian
    displayNotes(); // Odświeżanie widoku
}

// Funkcja przypinająca notatkę (przenosi na początek listy)
function pinNote(id) {
    let note = notes.splice(id, 1)[0]; // Usunięcie notatki i zapisanie jej do zmiennej
    notes.unshift(note); // Dodanie notatki na początek tablicy
    saveNotes(); // Zapisywanie zmian
    displayNotes(); // Odświeżanie widoku
}

// Obsługa zdarzenia ładowania strony
document.addEventListener('DOMContentLoaded', function() {
    // Ustawienie domyślnego koloru dla selektora kolorów
    document.querySelector('input[name=note_color]').value = defaultNoteColor;
    // Dodanie obsługi kliknięcia dla przycisku zapisu notatki
    document.querySelector('input[name=save_note]').addEventListener('click', createNote);
    // Wyświetlenie notatek
    displayNotes();
});

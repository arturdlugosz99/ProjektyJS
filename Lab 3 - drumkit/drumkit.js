// Nasłuchiwanie zdarzenia naciśnięcia klawisza na całym dokumencie.
document.addEventListener('keypress', onKeyPress);

// Tablica przechowująca wszystkie nagrania.
let records = [];
// Zmienna stanu wskazująca, czy trwa nagrywanie.
let isRecording = false;
// Tablica przechowująca dźwięki w trakcie jednego nagrania.
let record = [];

// Klasa reprezentująca dźwięk, zawiera klawisz i znacznik czasu.
class Sound {
    constructor(key) {
        this.key = key;
        this.timestamp = Date.now();
    }
}

// Funkcja obsługująca zdarzenie naciśnięcia klawisza.
function onKeyPress(event) {
    const key = event.key;
    let sound = '';
    // Pobieranie elementu odpowiadającego naciśniętemu klawiszowi.
    const keyElement = document.querySelector(`#${key}`);
    
    // Przypisanie dźwięków do konkretnych klawiszy.
    switch (key) {
        case 'q': sound = 'boom'; break;
        case 'w': sound = 'tom'; break;
        case 'e': sound = 'hihat'; break;
        case 'a': sound = 'kick'; break;
        case 's': sound = 'openhat'; break;
        case 'd': sound = 'ride'; break;
        case 'z': sound = 'snare'; break;
        case 'x': sound = 'clap'; break;
        case 'c': sound = 'tink'; break;
        default: sound = 'default'; break;
    }

    // Wizualne wyróżnienie naciśniętego klawisza.
    keyElement.classList.add('keyPressed');
    setTimeout(() => {
        keyElement.classList.remove('keyPressed');
    }, 100);

    // Jeśli trwa nagrywanie, dodaj dźwięk do nagrania.
    if (isRecording) record.push(new Sound(sound));
    // Odtwarzanie dźwięku.
    playSound(sound);
}

// Funkcja odtwarzająca dźwięk.
function playSound(sound) {
    const audioTag = document.querySelector(`#${sound}`);
    audioTag.currentTime = 0;
    audioTag.play();
}

// Funkcja odtwarzająca nagranie.
function playRecord(record) {
    record.forEach((sound) => {
        setTimeout(() => {
            playSound(sound.key);
        }, sound.timestamp - record[0].timestamp);
    });
}

// Funkcja wyświetlająca listę nagrań.
function showRecords() {
    const recordsList = document.querySelector('.records');
    recordsList.innerHTML = '';
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.classList.add('record');
        li.textContent = `Record ${index + 1}`;
        li.addEventListener('click', () => {
            if (isRecording) {
                alert("Nie można odtwarzać podczas nagrywania.");
            } else {
                playRecord(record);
            }
        });
        recordsList.appendChild(li);
    });
}

// Przycisk rozpoczynający/zatrzymujący nagrywanie.
const recordButton = document.querySelector('#record');
recordButton.addEventListener('click', () => {
    isRecording = !isRecording;
    if (isRecording) {
        recordButton.textContent = 'Zatrzymaj nagrywanie';
        recordButton.classList.add('recording');
    } else {
        recordButton.textContent = 'Nagrywaj';
        recordButton.classList.remove('recording');
        records.push(record);
        record = [];
        showRecords();
    }
});

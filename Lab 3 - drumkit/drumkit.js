document.addEventListener('keypress', onKeyPress);

let records = [];
let isRecording = false;
let record = [];

class Sound {
    constructor(key) {
        this.key = key;
        this.timestamp = Date.now();
    }
}

function onKeyPress(event) {
    const key = event.key;
    let sound = '';
    const keyElement = document.querySelector(`#${key}`);
    
    switch (key) {
        case 'q':
            sound = 'boom';
            break;
        case 'w':
            sound = 'tom';
            break;
        case 'e':
            sound = 'hihat';
            break;
        case 'a':
            sound = 'kick';
            break;
        case 's':
            sound = 'openhat';
            break;
        case 'd':
            sound = 'ride';
            break;
        case 'z':
            sound = 'snare';
            break;
        case 'x':
            sound = 'clap';
            break;
        case 'c':
            sound = 'tink';
            break;
        default:
            sound = 'default';
            break;
    }

    keyElement.classList.add('keyPressed');
    setTimeout(() => {
        keyElement.classList.remove('keyPressed');
    }, 100);

    if (isRecording) record.push(new Sound(sound));
    playSound(sound);
}

function playSound(sound) {
    const audioTag = document.querySelector(`#${sound}`);
    audioTag.currentTime = 0;
    audioTag.play();
}

function playRecord(record) {
    record.forEach((sound) => {
        setTimeout(() => {
            playSound(sound.key);
        }, sound.timestamp - record[0].timestamp);
    });
}

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

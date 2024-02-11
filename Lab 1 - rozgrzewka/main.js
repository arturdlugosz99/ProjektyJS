// Sekcja 1: Obliczenia na czterech wartościach wprowadzonych przez użytkownika
const values = document.querySelectorAll('.value');
const btnCalculate = document.querySelector('#calculate');

const sumCalc = document.querySelector('#sum');
const avgCalc = document.querySelector('#avg');
const minCalc = document.querySelector('#min');
const maxCalc = document.querySelector('#max');

btnCalculate.addEventListener('click', () => {
    let sum = 0;
    let min = null;
    let max = null;
    let count = 0;

    values.forEach(value => {
        const num = parseFloat(value.value); // Zmienione na parseFloat
        if (!isNaN(num)) {
            sum += num;
            min = min === null ? num : Math.min(min, num);
            max = max === null ? num : Math.max(max, num);
            count++;
        }
    });

    const avg = sum / count; // Dzielenie przez liczbę wprowadzonych wartości

    sumCalc.textContent = `Suma: ${sum}`;
    avgCalc.textContent = `Średnia: ${count > 0 ? avg : 0}`; // Obsługa przypadku braku wartości
    minCalc.textContent = `Min: ${min !== null ? min : 'Brak danych'}`;
    maxCalc.textContent = `Max: ${max !== null ? max : 'Brak danych'}`;
});

// Sekcja 2: Dynamiczne dodawanie pól input do wprowadzania liczb
const result2 = document.querySelector('#result2');
const addBtn = document.querySelector('#add');

addBtn.addEventListener('click', () => {
    const div = document.createElement("div");
    const input = document.createElement('input');
    input.type = "number";
    input.className = "value";

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Usuń";
    removeBtn.addEventListener('click', (ev) => {
        ev.currentTarget.parentNode.remove();
        Calculate();
    });

    div.appendChild(input);
    div.appendChild(removeBtn);

    document.querySelector("#fields").appendChild(div);
    Calculate();
});

function Calculate(){
    const nums = document.querySelectorAll('.value');
    let sum = 0;
    let min = null;
    let max = null;
    let count = 0;

    nums.forEach(num => {
        const value = parseFloat(num.value); // Zmienione na parseFloat
        if (!isNaN(value)) {
            sum += value;
            min = min === null ? value : Math.min(min, value);
            max = max === null ? value : Math.max(max, value);
            count++;
        }
    });

    const avg = sum / count; // Dzielenie przez liczbę wprowadzonych wartości

    result2.textContent = `Suma: ${sum}, Średnia: ${count > 0 ? avg : 0}, Min: ${min !== null ? min : 'Brak danych'}, Max: ${max !== null ? max : 'Brak danych'}`;
}

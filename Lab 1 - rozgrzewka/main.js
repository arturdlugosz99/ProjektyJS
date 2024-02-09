// Sekcja 1: Obliczenia na czterech wartościach wprowadzonych przez użytkownika
const values = document.querySelectorAll('.value');
const btnCalculate = document.querySelector('#calculate');

const sumCalc = document.querySelector('#sum');
const avgCalc = document.querySelector('#avg');
const minCalc = document.querySelector('#min');
const maxCalc = document.querySelector('#max');

btnCalculate.addEventListener('click', () => {
    let sum = 0;
    let min = Infinity;
    let max = -Infinity;

    values.forEach(value => {
        const num = parseInt(value.value);
        sum += num;
        min = Math.min(min, num);
        max = Math.max(max, num);
    });

    const avg = sum / values.length;

    sumCalc.textContent = `Suma: ${sum}`;
    avgCalc.textContent = `Średnia: ${avg}`;
    minCalc.textContent = `Min: ${min}`;
    maxCalc.textContent = `Max: ${max}`;
});

// Sekcja 2: Dynamiczne dodawanie pól input do wprowadzania liczb
const result2 = document.querySelector('#result2');
const addBtn = document.querySelector('#add');

addBtn.addEventListener('click', () => {
    const div = document.createElement("div");
    const input = document.createElement('input');
    input.type = "number";
    input.value = 0;
    input.className = "value";

    input.addEventListener('input', () => {
        Calculate();
    });

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "Usuń";
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
    let min = Infinity;
    let max = -Infinity;

    nums.forEach(num => {
        const value = parseInt(num.value);
        sum += value;
        min = Math.min(min, value);
        max = Math.max(max, value);
    });

    const avg = sum / nums.length;

    result2.textContent = `Suma: ${sum}, Średnia: ${avg}, Min: ${min}, Max: ${max}`;
}

// Pobranie elementów canvas i przycisków z dokumentu HTML
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ballCountInput = document.getElementById('ballCount');
let fpscounter = document.getElementById("fps");

// Ustawienia początkowe
let connectionDistance = 100; // Maksymalna odległość, na której piłki będą połączone linią
let lineWidth = 2; // Grubość linii łączącej piłki
let balls = []; // Tablica do przechowywania wszystkich piłek
let animationId; // Identyfikator ramki animacji, używany do kontroli animacji

// Funkcja do generowania losowej liczby całkowitej w zadanym zakresie
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funkcja do generowania losowego koloru w formacie hex
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Funkcja tworząca nową piłkę z losowymi parametrami (pozycja, kolor, prędkość)
function createBall() {
  return {
    x: getRandomInt(20, canvas.width - 20),
    y: getRandomInt(20, canvas.height - 20),
    radius: 10,
    dx: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1), // Prędkość w poziomie
    dy: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1), // Prędkość w pionie
    color: getRandomColor(), // Kolor piłki
  };
}

// Funkcja rysująca piłkę na płótnie
function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Funkcja rysująca linię między dwoma piłkami
function drawLine(ball1, ball2) {
  ctx.beginPath();
  ctx.moveTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}

// Główna funkcja aktualizująca stan animacji i rysująca klatkę
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyszczenie canvas

  balls.forEach((ball, i) => {
    // Aktualizacja pozycji piłki
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Odbicie od ścian z "elastycznym" efektem
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx * 0.9;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy * 0.9;
    }

    drawBall(ball); // Rysowanie piłki

    // Rysowanie linii między piłkami, które są wystarczająco blisko siebie
    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2);
      if (distance < connectionDistance) {
        drawLine(ball, otherBall);
      }
    }
  });

  animationId = requestAnimationFrame(update); // Zaplanowanie następnej klatki
}

// Funkcja inicjująca animację z zadaną liczbą piłek
function startAnimation() {
  const count = parseInt(ballCountInput.value) || 10; // Odczytanie liczby piłek z inputa
  balls = []; // Resetowanie tablicy piłek
  for (let i = 0; i < count; i++) {
    balls.push(createBall()); // Tworzenie nowych piłek
  }

  cancelAnimationFrame(animationId); // Zatrzymanie poprzedniej animacji, jeśli jest aktywna
  update(); // Rozpoczęcie nowej animacji
}

// Funkcja resetująca animację
function resetAnimation() {
  balls = []; // Czyszczenie tablicy piłek
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyszczenie canvas
  cancelAnimationFrame(animationId); // Zatrzymanie animacji
}

// Funkcje zmieniające parametry animacji
function changeConnectionDistance(value) {
  connectionDistance = value; // Zmiana maksymalnej odległości połączenia między piłkami
}

function changeLineWidth(value) {
  lineWidth = value; // Zmiana grubości linii
}

let frameCount = 0; // Licznik klatek do obliczenia FPS

// Funkcja aktualizująca licznik klatek
function updateFrame() {
  frameCount++;
  requestAnimationFrame(updateFrame);
}

updateFrame(); // Rozpoczęcie liczenia klatek

// Ustawienie interwału do obliczania i wyświetlania FPS co sekundę
setInterval(() => {
  let fps = frameCount;
  frameCount = 0;
  fpscounter.innerHTML = fps + " fps"; // Aktualizacja tekstu wyświetlającego FPS
}, 1000);

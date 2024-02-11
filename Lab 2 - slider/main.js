// Pobranie wszystkich przycisków nawigacji slidera.
const slideButtons = document.querySelectorAll('.slideNav');
// Pobranie kontenera slidera.
const sliderContainer = document.querySelector('#slider-wrapper');
// Pobranie wszystkich slajdów.
const slides = document.querySelectorAll('.slide');
// Zmienna przechowująca indeks bieżącego slajdu.
let currentSlideIndex = 0;
// Szerokość slajdu, używana do obliczenia przesunięcia.
let slideWidth = 800;
// Flaga wskazująca, czy slider jest wstrzymany.
let isPaused = false;
// Zmienna dla interwału automatycznego przewijania slajdów.
let interval;

// Funkcja uruchamiająca slider.
function startSlider() {
    interval = setInterval(() => {
        // Przechodzi do następnego slajdu, jeśli slider nie jest wstrzymany.
        if (!isPaused) {
            nextSlide();
        }
    }, 3000); // Czas oczekiwania między automatycznymi zmianami slajdów.
}

// Uruchomienie slidera.
startSlider();

// Funkcja przechodząca do wybranego slajdu.
function goToSlide(index) {
    const targetTranslateX = -slideWidth * index; // Obliczenie przesunięcia.
    sliderContainer.style.transform = `translateX(${targetTranslateX}px)`; // Zastosowanie przesunięcia.
    currentSlideIndex = index; // Aktualizacja bieżącego indeksu slajdu.
    setActiveSlide(index); // Ustawienie aktywnego slajdu.
}

// Obsługa kliknięcia przycisku.
function handleButtonClick(event) {
    const targetIndex = parseInt(event.target.dataset.index); // Pobranie indeksu z atrybutu data.
    // Sprawdzenie, czy indeks jest liczbą i różni się od bieżącego slajdu.
    if (!isNaN(targetIndex)) {
        if (targetIndex !== currentSlideIndex) {
            clearInterval(interval); // Zatrzymanie automatycznego przewijania.
            goToSlide(targetIndex); // Przejście do wybranego slajdu.
            startSlider(); // Ponowne uruchomienie slidera.
        }
    } else if (event.target.id === "play") {
        isPaused = false; // Wznowienie slidera.
    } else if (event.target.id === "pause") {
        isPaused = true; // Wstrzymanie slidera.
    } else if (event.target.id === "prev") {
        prevSlide(); // Przejście do poprzedniego slajdu.
    } else if (event.target.id === "next") {
        nextSlide(); // Przejście do następnego slajdu.
    }
}

// Funkcja przechodząca do poprzedniego slajdu.
function prevSlide() {
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Obliczenie nowego indeksu.
    goToSlide(newIndex); // Przejście do slajdu.
}

// Funkcja przechodząca do następnego slajdu.
function nextSlide() {
    const newIndex = (currentSlideIndex + 1) % slides.length; // Obliczenie nowego indeksu.
    goToSlide(newIndex); // Przejście do slajdu.
}

// Dodanie nasłuchiwania kliknięć do przycisków.
slideButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Funkcja ustawiająca aktywny slajd i przycisk.
function setActiveSlide(index) {
    slides.forEach(slide => slide.classList.remove('active')); // Usunięcie klasy 'active' ze wszystkich slajdów.
    slideButtons.forEach(button => button.classList.remove('active')); // Usunięcie klasy 'active' z przycisków.
    slides[index].classList.add('active'); // Dodanie klasy 'active' do aktywnego slajdu.
    slideButtons[index].classList.add('active'); // Dodanie klasy 'active' do aktywnego przycisku.
}

// Przejście do bieżącego slajdu i ustawienie go jako aktywny na starcie.
goToSlide(currentSlideIndex);
setActiveSlide(currentSlideIndex);

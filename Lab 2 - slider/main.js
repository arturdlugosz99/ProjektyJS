const slideButtons = document.querySelectorAll('.slideNav');
const sliderContainer = document.querySelector('#slider-wrapper');
const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0; 
let slideWidth = 800; 
let isPaused = false;
let interval;


function startSlider() {
    interval = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 3000);
}

startSlider();


function goToSlide(index) {
    const targetTranslateX = -slideWidth * index;
    sliderContainer.style.transform = `translateX(${targetTranslateX}px)`;
    currentSlideIndex = index;
}

function handleButtonClick(event) {
    const targetIndex = parseInt(event.target.dataset.index); 
    if (!isNaN(targetIndex)) {
        if (targetIndex !== currentSlideIndex) {
            clearInterval(interval); 
            goToSlide(targetIndex);
            startSlider(); 
        }
    } else if (event.target.id === "play") {
        isPaused = false;
    } else if (event.target.id === "pause") {
        isPaused = true;
    } else if (event.target.id === "prev") {
        prevSlide();
    } else if (event.target.id === "next") {
        nextSlide();
    }
}


function prevSlide() {
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
}


function nextSlide() {
    const newIndex = (currentSlideIndex + 1) % slides.length;
    goToSlide(newIndex);
}

slideButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function setActiveSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideButtons.forEach(button => button.classList.remove('active'));
    slides[index].classList.add('active');
    slideButtons[index].classList.add('active');
}

goToSlide(currentSlideIndex);
setActiveSlide(currentSlideIndex);

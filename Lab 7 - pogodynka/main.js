// Klucz do localStorage, gdzie przechowywane są dane o pogodzie
const localStorageKeyWeather = 'weatherApi';
// Klucz API do OpenWeatherMap
const weatherAPIKey = '27bb4bc7c58ad4562286aded0cb8e50b';

// Tablica przechowująca prognozy pogody
let forecasts = [];

// Funkcja pobierająca dane o pogodzie z API OpenWeatherMap
function getWeatherData(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`)
        .then(response => response.json())
        .then(data => {
            // Tworzenie obiektu pogody z pobranych danych
            const weather = {
                city: data.name,
                desc: data.weather[0].description,
                temp: Math.round(data.main.temp),
                image: data.weather[0].icon,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            };

            // Sprawdzenie, czy miasto już istnieje w prognozach
            const existingCityIndex = forecasts.findIndex(item => item.city === weather.city);

            // Aktualizacja danych, jeśli miasto już istnieje
            if (existingCityIndex !== -1) {
                forecasts[existingCityIndex] = weather;
                updateForecast(forecasts[existingCityIndex]);
            } else if (forecasts.length < 10) { // Dodanie nowej prognozy, jeśli nie przekroczono limitu
                forecasts.push(weather);
                localStorage.setItem(localStorageKeyWeather, JSON.stringify(forecasts));
                displayForecast(weather);
            } else {
                alert('Osiągnięto maksymalną liczbę miast (10).');
            }
        })
        .catch(err => console.log(err)); // Obsługa błędu
}

// Funkcja aktualizująca wyświetlanie pogody dla danego miasta
function updateForecast(weather) {
    // Wyszukiwanie kontenera dla miasta
    const weatherContainer = document.querySelector(`#weather_container [data-city="${weather.city}"]`);
    // Aktualizacja danych pogodowych w interfejsie użytkownika
    if(weatherContainer) {
        const tempElement = weatherContainer.querySelector('.temp');
        const windElement = weatherContainer.querySelector('.wind');
        const pressureElement = weatherContainer.querySelector('.pressure');
        const humidityElement = weatherContainer.querySelector('.humidity');

        tempElement.innerHTML = weather.temp + '°C';
        windElement.innerHTML = 'Wind  ' + weather.wind + ' m/s';
        pressureElement.innerHTML = 'Pressure  ' + weather.pressure + ' hPa';
        humidityElement.innerHTML = 'Humidity  ' + weather.humidity + ' %';
    }

    // Aktualizacja danych w localStorage
    localStorage.setItem(localStorageKeyWeather, JSON.stringify(forecasts));
}

// Funkcja wyświetlająca prognozę pogody dla danego miasta
function displayForecast(weather) {
    // Tworzenie elementów DOM dla danych pogodowych
    const weatherContainer = document.createElement('div');
    const cityElement = document.createElement('h1');
    const imgElement = document.createElement('div');
    const descElement = document.createElement('p');
    const tempElement = document.createElement('p');
    const windElement = document.createElement('p');
    const pressureElement = document.createElement('p');
    const humidityElement = document.createElement('p');

    // Dodawanie klas CSS do stworzonych elementów
    weatherContainer.classList.add('weather-container');
    cityElement.classList.add('city');
    imgElement.classList.add('weather-img');
    descElement.classList.add('desc');
    tempElement.classList.add('temp');
    windElement.classList.add('wind');
    pressureElement.classList.add('pressure');
    humidityElement.classList.add('humidity');

    // Ustawienie atrybutu dla kontenera, aby łatwo znaleźć kontener po mieście
    weatherContainer.setAttribute('data-city', weather.city);

    // Wypełnianie elementów danymi pogodowymi
    imgElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.image}@2x.png"/>`;
    cityElement.innerHTML = weather.city;
    descElement.innerHTML = weather.desc;
    tempElement.innerHTML = weather.temp + '°C';
    windElement.innerHTML = 'Wind  ' + weather.wind + ' m/s';
    pressureElement.innerHTML = 'Pressure  ' + weather.pressure + ' hPa';
    humidityElement.innerHTML = 'Humidity  ' + weather.humidity + ' %';

    // Dodawanie przycisku usuwania prognozy
    const deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '&#10006;';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', function () {
        deleteWeather(weatherContainer, weather);
    });

    cityElement.appendChild(deleteIcon);

    // Dodawanie elementów do kontenera i do dokumentu
    weatherContainer.appendChild(cityElement);
    weatherContainer.appendChild(imgElement);
    weatherContainer.appendChild(descElement);
    weatherContainer.appendChild(tempElement);
    weatherContainer.appendChild(windElement);
    weatherContainer.appendChild(pressureElement);
    weatherContainer.appendChild(humidityElement);

    document.getElementById('weather_container').appendChild(weatherContainer);
}

// Funkcja usuwająca prognozę pogody
function deleteWeather(htmlTag, weather) {
    htmlTag.remove(); // Usunięcie kontenera z dokumentu
    forecasts = forecasts.filter(item => item.city !== weather.city); // Usunięcie danych z tablicy
    localStorage.setItem(localStorageKeyWeather, JSON.stringify(forecasts)); // Aktualizacja localStorage
}

// Obsługa wysyłania formularza z nazwą miasta
function handleWeatherFormSubmit() {
    const cityInput = document.getElementById('city_input');
    const city = cityInput.value.trim();

    if (city !== '') {
        getWeatherData(city);
        cityInput.value = ''; // Czyszczenie pola formularza
    }
}

// Funkcja ładowania danych pogodowych z localStorage przy starcie
function getDataFromLocalStorage() {
    forecasts = [];
    const storedData = localStorage.getItem(localStorageKeyWeather);

    if (storedData) {
        forecasts = JSON.parse(storedData);
        forecasts.forEach(weather => {
            displayForecast(weather);
        });
    }
}

// Funkcja aktualizująca dane pogodowe dla wszystkich miast przy starcie
function updateWeatherDataOnStartup() {
    forecasts.forEach(city => {
        getWeatherData(city.city);
    });
}

// Wywołanie funkcji inicjalizujących
getDataFromLocalStorage();
updateWeatherDataOnStartup();

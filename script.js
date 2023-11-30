function getWeather() {
    const apiKey = 'ac7d7c2e8fa565e09e1b416db5ba0547'; 
    const city = document.getElementById('city-input').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const newUrl = window.location.href.split('?')[0] + `?city=${encodeURIComponent(city)}`;
    window.history.pushState({}, '', newUrl);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            const { name, main, weather } = data;

            weatherInfo.innerHTML = `
                <h2>Weather of ${name}</h2>
                <p>Temperature: ${Math.round(main.temp - 273.15)}°C</p>
                <p>Weather: ${weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    if (cityParam) {
        document.getElementById('city-input').value = decodeURIComponent(cityParam);
        getWeather();
    }
};

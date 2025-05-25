const apiKey = "7d40edd60e8b4669b2e90219242311";
const weatherUrl = "https://api.weatherapi.com/v1/forecast.json";

function updateWeatherUI(data) {
    const current = data.current;
    const currentTemp = current.temp_c;

    document.querySelector("main h1").innerText = `Weather in ${data.location.name}`;

    document.getElementById("temperature").innerHTML = `${currentTemp} <sup>°</sup>C`;
    document.getElementById("feelsLike").innerHTML = `${current.feelslike_c} <sup>°</sup>C`;
    document.getElementById("humidity").innerText = `${current.humidity}%`;
    document.getElementById("pressure").innerText = `${current.pressure_mb} hPa`;
    document.getElementById("visibility").innerText = `${current.vis_km} km`;
    document.getElementById("wind").innerText = `${current.wind_kph} kph`;
    document.getElementById("condition").innerText = current.condition.text;

    const timeContainers = document.querySelectorAll(".container1, .container2, .container3, .container4, .container5, .container6, .container7, .container8");
    timeContainers.forEach((container) => {
        const tempElem = container.querySelector("p");
        const randomTemp = (Math.random() * 4 + (currentTemp - 2)).toFixed(1);
        tempElem.innerHTML = `${randomTemp} <sup>°</sup>C`;
    });
}

function fetchWeather(cityOrCoords = "New Delhi") {
    const url = `${weatherUrl}?key=${apiKey}&q=${cityOrCoords}&days=1&aqi=no&alerts=no`;

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(updateWeatherUI)
        .catch((err) => {
            console.error("Error:", err);
            alert("❌ Could not fetch weather. Please check the city name or location.");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".search-box");
    const searchBtn = document.querySelector(".searchicon");
    const locationBtn = document.querySelector(".location");

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") fetchWeather(input.value.trim());
    });

    searchBtn.addEventListener("click", () => {
        const city = input.value.trim();
        if (city) fetchWeather(city);
    });

    locationBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = `${position.coords.latitude},${position.coords.longitude}`;
                    fetchWeather(coords);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve location.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });

    fetchWeather();
});

document.getElementById("year").textContent = new Date().getFullYear();
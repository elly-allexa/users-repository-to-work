function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}, ${hours}:${minutes}`;
}

function getDayAndMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let days = [
    "31",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  let month = date.getMonth();
  let day = date.getDate();

  return `${days[day]}/${months[month]}`;
}

function comonnWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temp");
  let city = response.data.city;
  let cityElement = document.querySelector("#app-city");
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  let condition = response.data.condition.description;
  let conditionElement = document.querySelector("#conditions");
  let icon = response.data.condition.icon_url;
  let iconElement = document.querySelector("#icon");
  let now = new Date();
  let time = document.querySelector("#current-time");

  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = `${city}`;
  windElement.innerHTML = `Wind: ${wind}km`;
  humidityElement.innerHTML = `Humidity : ${humidity}%`;
  conditionElement.innerHTML = `${condition}`;
  iconElement.setAttribute("src", `${icon}`);
  iconElement.setAttribute("alt", condition);

  time.innerHTML = formatDate(now);
}

function search(city) {
  let apiKey = `462ddfcdo6b39797fbf3801t94bacc7f`;
  let units = `metric`;
  let endApiUrl = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${endApiUrl}?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(comonnWeather);
}

function defaultCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputText").value;
  if (!searchInput || searchInput === undefined) {
    alert("Please, enter your city ☁️💫");
  } else {
    search(searchInput);
  }
}

function realPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = `462ddfcdo6b39797fbf3801t94bacc7f`;
  let units = `metric`;
  let apiEndpoint = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(comonnWeather);
}

function showNow(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(realPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let button = document.querySelector("button#search-button");
button.addEventListener("click", defaultCity);

let currentButton = document.querySelector("#currentLocationButton");
currentButton.addEventListener("click", showNow);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Odesa, Ukraine");

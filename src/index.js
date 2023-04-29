function dTime() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = now.getDate();
  let month = now.getMonth();
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
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let appDate = `${date}/${months[month]} ${days[day]} ${hour}:${minutes}`;
  let currentDate = document.querySelector("#data");
  currentDate.innerHTML = appDate;
}
dTime();
//

function comonnWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#app-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = `${temperature}`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity : ${response.data.main.humidity}%`;
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#weather-icon").innerHTML = null;
}

function search(city) {
  let units = "metric";
  let apiKey = "6576b922bfe6a5322a2e40d1f20f6b5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(comonnWeather);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputText").value;
  search(city);
}

let button = document.querySelector("button#search-button");
button.addEventListener("click", submitCity);

function realPosition(position) {
  let apiKey = "6576b922bfe6a5322a2e40d1f20f6b5c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(comonnWeather);
}

function showNow(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(realPosition);
}
let currentButton = document.querySelector("#currentLocationButton");
currentButton.addEventListener("click", showNow);

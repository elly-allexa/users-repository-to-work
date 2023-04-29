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

function comonnWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#app-city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = `${temperature}`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity : ${response.data.temperature.humidity}%`;
  document.querySelector("#conditions").innerHTML =
    response.data.condition.description;
  let icon = response.data.condition.icon_url;
  let iconSign = document.querySelector("#icon");
  iconSign.setAttribute("src", `${icon}`);
  iconSign.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = `462ddfcdo6b39797fbf3801t94bacc7f`;
  let units = `metric`;
  let endApiUrl = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${endApiUrl}?query=${city}&key=${apiKey}&units=${units}`;
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
let currentButton = document.querySelector("#currentLocationButton");
currentButton.addEventListener("click", showNow);

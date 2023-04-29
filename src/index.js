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
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  let icon = response.data.condition.icon_url;
  let iconSign = document.querySelector("#icon");
  let now = new Date();
  let time = document.querySelector("#current-time");
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
  iconSign.setAttribute("src", `${icon}`);
  iconSign.setAttribute("alt", response.data.condition.description);
  time.innerHTML = formatDate(now);
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

let button = document.querySelector("button#search-button");
button.addEventListener("click", submitCity);

let currentButton = document.querySelector("#currentLocationButton");
currentButton.addEventListener("click", showNow);

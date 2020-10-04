//Get current DATE/TIME (Sunday)

function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let currentDay = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  let day = days[currentDay];

  return `${day} ${currentHour}:${currentMinute}`;
}
let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//SEARCH CITY

//function displayWeatherCondition(response) {
//document.querySelector("#current-city").innerHTML = response.data.name;
//document.querySelector("#temperature").innerHTML = Math.round(
//response.data.main.temp
//);
//}
//

function showTemp(response) {
  let temp = response.data.main.temp;
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${Math.round(temp)} °f`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
}
//
function citySearch(city) {
  let apiKey = "3496594a9ef8153411db069c4fd12ea9";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);

  //apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  //axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchLocation = document.querySelector("#city-input");
  currentCity.innerHTML = `${searchLocation.value}`;
  citySearch(searchLocation.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchLocation.value}`;
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "imperial";
  let apiKey = "3496594a9ef8153411db069c4fd12ea9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

citySearch("district of columbia");

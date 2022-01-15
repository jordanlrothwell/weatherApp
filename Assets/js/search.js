// TODO: fix display of dates

let searchInputVal = document.location.search.replace("?q=", "");
let latitude;
let longitude;
let label;
let openWeatherAPIKey = "e76b72821d51dc3558071ffa27cf4d8d";
let positionStackAPIKey = "95146b7e1298435b4077c47321e25caa";
let weatherURL;
let coordinatesURL = `http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${searchInputVal}`;

let getData = function () {
  fetch(coordinatesURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      extractCoordinates(result);
    });
};

let getWeather = function () {
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      displayWeather(result);
    });
};

// FUNCTION: converts Kelvin to Celcius (rounding to 1 d.p.)
let k2c = function (k) {
  return (k - 273.15).toFixed(1);
};

// FUNCTION: converts unix timestamp to date object
let unixToDate = function (unix) {
  return new Date(unix * 1000);
};

// FUNCTION: gets coordinates for
let extractCoordinates = function (resultObj) {
  latitude = resultObj.data[0].latitude;
  longitude = resultObj.data[0].longitude;
  label = resultObj.data[0].label;
  weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${openWeatherAPIKey}`;
  getWeather();
};

// FUNCTION: extracts relevant information from our fetch call
let displayWeather = function (resultObj) {
  let mainContainer = document.getElementById("mainContainer");

  console.log(label);

  let cityLabel = document.createElement("h2");
  cityLabel.classList.add("display-4", "text-primary");
  cityLabel.innerHTML = `${label}`;

  let date = document.createElement("h3");
  date.classList.add("blockquote");
  date.innerHTML = `Date: ${unixToDate(resultObj.daily[0].dt)}`;

  let weather = document.createElement("p");
  weather.innerHTML = `Weather: ${resultObj.daily[0].weather[0].main}`;

  let temp = document.createElement("p");
  temp.classList.add("text-dark");
  temp.innerHTML = `Temperature: ${k2c(resultObj.daily[0].temp.day)}`;

  let UVI = document.createElement("p");
  UVI.classList.add("text-dark");
  UVI.innerHTML = `UV Index: ${resultObj.daily[0].uvi}`;

  let hum = document.createElement("p");
  hum.classList.add("text-dark");
  hum.innerHTML = `Humidity: ${resultObj.daily[0].humidity}`;

  let windsp = document.createElement("p");
  windsp.classList.add("text-dark");
  windsp.innerHTML = `Wind Speed: ${resultObj.daily[0].wind_speed}`;

  mainContainer.appendChild(cityLabel);
  mainContainer.appendChild(date);
  mainContainer.appendChild(weather);
  mainContainer.appendChild(temp);
  mainContainer.appendChild(UVI);
  mainContainer.appendChild(hum);
  mainContainer.appendChild(windsp);

  let fiveDayHeading = document.getElementById("fiveDayHeading");
  let fiveDayTitle = document.createElement("h2");
  fiveDayTitle.classList.add("display-5", "text-primary");
  fiveDayTitle.innerHTML = "5-day Forecast";

  fiveDayHeading.appendChild(fiveDayTitle);

  for (i = 1; i < 6; i++) {
    let fiveDayContainer = document.getElementById("fiveDayContainer");

    let card = document.createElement("div");
    card.classList.add("col-md");

    let date = document.createElement("h3");
    date.classList.add("blockquote");
    date.innerHTML = `Date: ${unixToDate(resultObj.daily[i].dt)}`;

    let weather = document.createElement("p");
    weather.innerHTML = `Weather: ${resultObj.daily[i].weather[0].main}`;

    let temp = document.createElement("p");
    temp.classList.add("text-dark");
    temp.innerHTML = `Temperature: ${k2c(resultObj.daily[i].temp.day)}`;

    let UVI = document.createElement("p");
    UVI.classList.add("text-dark");
    UVI.innerHTML = `UV Index: ${resultObj.daily[i].uvi}`;

    let hum = document.createElement("p");
    hum.classList.add("text-dark");
    hum.innerHTML = `Humidity: ${resultObj.daily[i].humidity}`;

    let windsp = document.createElement("p");
    windsp.classList.add("text-dark");
    windsp.innerHTML = `Wind Speed: ${resultObj.daily[i].wind_speed}`;

    card.appendChild(date);
    card.appendChild(weather);
    card.appendChild(temp);
    card.appendChild(UVI);
    card.appendChild(hum);
    card.appendChild(windsp);
    fiveDayContainer.appendChild(card);
  }
};

getData();

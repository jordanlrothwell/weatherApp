// declaring global variables
let searchInputVal = document.location.search.replace("?q=", "");
let latitude;
let longitude;
let label;
let openWeatherAPIKey = "e76b72821d51dc3558071ffa27cf4d8d";
let positionStackAPIKey = "95146b7e1298435b4077c47321e25caa";
let weatherURL;
let coordinatesURL = `http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${searchInputVal}`;
let weatherQueryHistoryArray;

// check if any existing searches
let checkForHistory = function () {
  weatherQueryHistoryArray =
    JSON.parse(localStorage.getItem("weatherQueryHistory")) ?? [];
};

checkForHistory();

// event handler for search on results page
let searchFormEl = document.querySelector("#search-form");

let handleSearchFormSubmit = function (event) {
  event.preventDefault();
  let searchInputVal = document.querySelector("#search-input").value;
  if (!searchInputVal) {
    console.error("You need to enter a value.");
    return;
  }
  let queryString = "./search-results.html?q=" + searchInputVal;
  location.assign(queryString);
};

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

// FUNCTION: to convert weather descriptions to icons
let convertToIcon = function (str) {
  if (str.includes("Clear")) {
    return str.replace(
      /Clear/gm,
      '<img src="/Assets/icons/clear.svg" alt="Clear">'
    );
  } else if (str.includes("Rain")) {
    return str.replace(
      /Rain/gm,
      '<img src="/Assets/icons/rain.svg" alt="Rain">'
    );
  } else if (str.includes("Snow")) {
    return str.replace(
      /Snow/gm,
      '<img src="/Assets/icons/snow.svg" alt="Snow">'
    );
  } else if (str.includes("Clouds")) {
    return str.replace(
      /Clouds/gm,
      '<img src="/Assets/icons/clouds.svg" alt="Clouds">'
    );
  }
};

// displays results in the table of previous searches for user/creates links to trigger search on each item
let updateHistoryTable = function () {
  let tableBodyEl = document.getElementById("tableBody");
  for (i = 0; i < weatherQueryHistoryArray.length; i++) {
    let newTableRowEl = document.createElement("tr");
    newTableRowEl.addEventListener("click", function (event) {
      event.preventDefault();
      let numbers = /\d*/g;
      let index = parseInt(this.textContent.match(numbers));
      let searchInputVal = weatherQueryHistoryArray[index - 1].queryLabel;
      let queryString = "./search-results.html?q=" + searchInputVal;
      location.assign(queryString);
    });
    let tableRowIndexEl = document.createElement("th");
    tableRowIndexEl.setAttribute("scope", "row");
    tableRowIndexEl.innerHTML = `${i + 1}`;
    let locationEl = document.createElement("td");
    locationEl.innerHTML = weatherQueryHistoryArray[i].queryLabel;
    let weatherEl = document.createElement("td");
    weatherEl.innerHTML = convertToIcon(weatherQueryHistoryArray[i].days[0][1]);
    newTableRowEl.appendChild(tableRowIndexEl);
    newTableRowEl.appendChild(locationEl);
    newTableRowEl.appendChild(weatherEl);
    tableBodyEl.appendChild(newTableRowEl);
  }
};

updateHistoryTable();

// our current query object (to add to search history if new)
let currentQueryObject = {
  queryLabel: "",
  days: [[], [], [], [], [], []],
};

// our base fetch function
let getData = function () {
  fetch(coordinatesURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      extractCoordinates(result);
    });
};

// a secondary fetch function to wrap into the first
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
let unixToDate = function (value) {
  return moment.unix(value).format("LL");
};

// FUNCTION: gets coordinates for
let extractCoordinates = function (resultObj) {
  latitude = resultObj.data[0].latitude;
  longitude = resultObj.data[0].longitude;
  label = resultObj.data[0].label;
  weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${openWeatherAPIKey}`;
  getWeather();
};

// smaller version of the function above which populates the table - this only populates with the result of the current search
let updateSearch = function () {
  let tableBodyEl = document.getElementById("tableBody");
  let newTableRowEl = document.createElement("tr");
  newTableRowEl.addEventListener("click", function (event) {
    let numbers = /\d*/g;
    event.preventDefault();
    let index = parseInt(this.textContent.match(numbers));
    let searchInputVal = weatherQueryHistoryArray[index - 1].queryLabel;
    let queryString = "./search-results.html?q=" + searchInputVal;
    location.assign(queryString);
  });
  let tableRowIndexEl = document.createElement("th");
  tableRowIndexEl.setAttribute("scope", "row");
  tableRowIndexEl.innerHTML = `${i + 1}`;
  let locationEl = document.createElement("td");
  locationEl.innerHTML = weatherQueryHistoryArray[i].queryLabel;
  let weatherEl = document.createElement("td");
  weatherEl.innerHTML = convertToIcon(weatherQueryHistoryArray[i].days[0][1]);
  newTableRowEl.appendChild(tableRowIndexEl);
  newTableRowEl.appendChild(locationEl);
  newTableRowEl.appendChild(weatherEl);
  tableBodyEl.appendChild(newTableRowEl);
};


// FUNCTION: displays the information from our search to page
let displayWeather = function (resultObj) {
  let mainContainer = document.getElementById("mainContainer");

  let cityLabel = document.createElement("h2");
  cityLabel.classList.add("display-4", "text-primary");
  cityLabel.innerHTML = `${label}`;

  let date = document.createElement("h3");
  date.classList.add("blockquote");
  date.innerHTML = `${unixToDate(resultObj.daily[0].dt)}`;

  let weather = document.createElement("p");
  weather.innerHTML = `Weather: ${convertToIcon(
    resultObj.daily[0].weather[0].main
  )}`;

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
    date.innerHTML = `${unixToDate(resultObj.daily[i].dt)}`;

    let weather = document.createElement("p");
    weather.innerHTML = `Weather: ${convertToIcon(
      resultObj.daily[i].weather[0].main
    )}`;

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
  currentQueryObject.queryLabel = `${label}`;
  for (i = 0; i < 6; i++) {
    currentQueryObject.days[i].push(
      unixToDate(resultObj.daily[i].dt),
      resultObj.daily[i].weather[0].main,
      k2c(resultObj.daily[i].temp.day),
      resultObj.daily[i].uvi,
      resultObj.daily[i].humidity,
      resultObj.daily[i].wind_speed
    );
  }
  let priorQueries = [];
  for (i = 0; i < weatherQueryHistoryArray.length; i++) {
    priorQueries.push(weatherQueryHistoryArray[i].queryLabel);
  }
  if (!priorQueries.includes(`${label}`)) {
    weatherQueryHistoryArray.push(currentQueryObject);
    updateSearch();
  }
  localStorage.setItem(
    "weatherQueryHistory",
    JSON.stringify(weatherQueryHistoryArray)
  );
};

getData();
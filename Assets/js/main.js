// event handler for user searches
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

// declaring some global variables
let searchInputVal = document.location.search.replace("?q=", "");
let latitude;
let longitude;
let label;
let openWeatherAPIKey = "e76b72821d51dc3558071ffa27cf4d8d";
let positionStackAPIKey = "95146b7e1298435b4077c47321e25caa";
let weatherURL;
let coordinatesURL = `http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${searchInputVal}`;
let weatherQueryHistoryArray;

// update the history on load
let checkForHistory = function () {
  weatherQueryHistoryArray =
    JSON.parse(localStorage.getItem("weatherQueryHistory")) ?? [];
};

checkForHistory();

// display history to page on load
let updateHistoryTable = function () {
  let tableBodyEl = document.getElementById("tableBody");
  for (i = 0; i < weatherQueryHistoryArray.length; i++) {
    let newTableRowEl = document.createElement("tr");
    newTableRowEl.addEventListener("click", function () {
      console.log("test");
    });
    let tableRowIndexEl = document.createElement("th");
    tableRowIndexEl.setAttribute("scope", "row");
    tableRowIndexEl.innerHTML = `${i + 1}`;
    let locationEl = document.createElement("td");
    locationEl.innerHTML = weatherQueryHistoryArray[i].queryLabel;
    let weatherEl = document.createElement("td");
    weatherEl.innerHTML = weatherQueryHistoryArray[i].days[0][1];
    newTableRowEl.appendChild(tableRowIndexEl);
    newTableRowEl.appendChild(locationEl);
    newTableRowEl.appendChild(weatherEl);
    tableBodyEl.appendChild(newTableRowEl);
  }
};

updateHistoryTable();
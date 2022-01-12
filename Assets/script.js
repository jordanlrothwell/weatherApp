let cityName = "London";
let apiKey = "e76b72821d51dc3558071ffa27cf4d8d";
let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

console.log(weatherURL);

let weatherInfo = {};

let getWeather = function () {
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
     extractData(result);
    });
};

// FUNCTION: converts Kelvin to Celcius (rounding to 1 d.p.)
let k2c = function (k) {
  return (k - 273.15).toFixed(1);
};

let extractData = function (resultObj) {
  for (i = 0; i < resultObj.list.length; i++) {
    console.log(
      `Weather for ${resultObj.list[i].dt_txt}: ${resultObj.list[i].weather[0].main}`
    );
  }
};

getWeather();
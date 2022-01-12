let cityName = "London";
let apiKey = "e76b72821d51dc3558071ffa27cf4d8d";
let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

console.log(weatherURL);

let weatherInfo = {};

let getWeather = function () {
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result)
    });
};

// FUNCTION: converts Kelvin to Celcius (rounding to 1 d.p.)
let k2c = function (k) {
  return (k - 273.15).toFixed(1);
};

let extractData = function (resultObj) {
  console.log(resultObj.weather[0].main);
  console.log(k2c(resultObj.main.temp));
}

getWeather();
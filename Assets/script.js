let cityName = "London";
let latitude = 51.5085;
let longitude = -0.1257;
let apiKey = "e76b72821d51dc3558071ffa27cf4d8d";
let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

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

let unixToDate = function (unix) {
  return new Date(unix * 1000);
};

let extractData = function (resultObj) {
  for (i = 0; i < resultObj.daily.length; i++) {
    console.log(
      `Weather for ${unixToDate(resultObj.daily[i].dt)}: ${
        resultObj.daily[i].weather[0].main
      }`
    );
  }
};

getWeather();

console.log(unixToDate(1641988800));

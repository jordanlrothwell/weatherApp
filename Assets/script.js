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

// FUNCTION: converts unix timestamp to date object
let unixToDate = function (unix) {
  return new Date(unix * 1000);
};

// FUNCTION: extracts relevant information from our fetch call
let extractData = function (resultObj) {
  for (i = 0; i < 5; i++) {
    console.log(
      `Date: ${unixToDate(resultObj.daily[i].dt)}\n
      Weather: ${resultObj.daily[i].weather[0].main}\n
      Temp: ${k2c(resultObj.daily[i].temp.day)}\n
      UVI: ${resultObj.daily[i].uvi}\n
      Humidity: ${resultObj.daily[i].humidity}\n
      Wind Speed: ${resultObj.daily[i].wind_speed}\n
      ---`
    );
  }
};

getWeather();
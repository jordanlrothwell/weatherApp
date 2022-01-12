let cityName = "London";
let apiKey = "e76b72821d51dc3558071ffa27cf4d8d";
let weatherURL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

console.log(weatherURL)


const getWeather = function () {
  fetch(weatherURL).then(function (response) {
    if (!response.ok) {
      throw response.json();
    }

    return response.json();
  })
    .then(function(result) {
        console.log(result)
    });
};

getWeather();
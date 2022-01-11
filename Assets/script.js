const apiKey = "e76b72821d51dc3558071ffa27cf4d8d";
const weatherURL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

let cityName;

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
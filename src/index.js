function updateWeatherInfo(response) {
  let tempratureElement = document.querySelector("#temprature");
  let temprature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  cityElement.innerHTML = response.data.city;
  tempratureElement.innerHTML = Math.round(temprature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  timeElement.innerHTML = `${day} ${hours}:${minutes}`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apikey = "4a5fa8537ac0d63c3tacbe1af0b6b4co";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function click(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "4a5fa8537ac0d63c3tacbe1af0b6b4co";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌥️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature-max">
                <strong>13°</strong>
                <span class="weather-forecast-temperature-min">8°</span>
              </div>
            </div>
        </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", click);

searchCity("Paris");

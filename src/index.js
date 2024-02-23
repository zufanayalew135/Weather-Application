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

  console.log(iconElement);

  cityElement.innerHTML = response.data.city;
  tempratureElement.innerHTML = Math.round(temprature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", click);

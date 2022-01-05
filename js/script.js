// current day------------------------------------------
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const month = document.querySelector(".month");
const city = document.querySelector(".city");

// current Temp------------------------------------------
const temp = document.getElementById("temp");
const msgType = document.getElementById("msg");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const windSpeed = document.getElementById("wind");
const weatherImg = document.getElementById("weather__img");

// tomorrow Temp------------------------------------------
const dayNextMax = document.getElementById("daynext__max");
const dayNextMin = document.getElementById("daynext__min");

const dayNextDay = document.getElementById("daynext__day");
const dayNextDate = document.getElementById("daynext__date");
const dayNextMonth = document.getElementById("daynext__month");

// tomorrow Temp------------------------------------------
const dayAfterMax = document.getElementById("dayafter__max");
const dayAfterMin = document.getElementById("dayafter__min");

const dayAfterDay = document.getElementById("dayafter__day");
const dayAfterDate = document.getElementById("dayafter__date");
const dayAfterMonth = document.getElementById("dayafter__month");

// ------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
const apiKey = "0fcceef01d62a49fc6701f61ed924699";

// lat 28.5878598
// log 77.199748

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const renderData = function (data) {
  console.log(data);

  // current Temp
  temp.innerText = `${data.current.temp.toFixed(1)}`;

  msgType.innerText = data.current.weather[0].main;
  const weatherMsg = data.current.weather[0].main.toLowerCase();
  weatherImg.classList.add(`${weatherMsg}`);

  // today max and min temp
  maxTemp.innerText = `${data.daily[0].temp.max.toFixed(1)}`;
  minTemp.innerText = `${data.daily[0].temp.min.toFixed(1)}`;

  humidity.innerText = `${data.current.humidity.toFixed(0)}`;
  windSpeed.innerText = `${data.current.wind_speed.toFixed(1)}`;

  // next day max and min temp
  dayNextMax.innerText = `${data.daily[1].temp.max.toFixed(0)}`;
  dayNextMin.innerText = `${data.daily[1].temp.min.toFixed(0)}`;

  // day after max and min temp
  dayAfterMax.innerText = `${data.daily[2].temp.max.toFixed(0)}`;
  dayAfterMin.innerText = `${data.daily[2].temp.min.toFixed(0)}`;

  // // dates ---------------------
  // const dt = data.current.dt;
  // console.log(dt);
};

/////////////////////////////////////////////////////////////////////////////

// ----------------------------------------------------------
const getWeatherData = function (lat, log) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => renderData(data));
};

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude: lat } = position.coords;
  const { longitude: log } = position.coords;
  // console.log(lat, log);

  getWeatherData(lat, log);
});

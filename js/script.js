const day = document.querySelector(".day");
const date = document.querySelector(".date");
const month = document.querySelector(".month");
const city = document.querySelector(".city");

// -----------------------------------------------
const temp = document.getElementById("temp");
const msgType = document.getElementById("msg");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const windSpeed = document.getElementById("wind");
const weatherImg = document.getElementById("weather__img");

// ------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
const apiKey = "0fcceef01d62a49fc6701f61ed924699";

// lat 28.5878598
// log 77.199748

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const renderData = function (data) {
  // console.log(data);

  temp.innerText = `${data.main.temp.toFixed(0)}`;

  msgType.innerText = data.weather[0].main;
  const weatherMsg = data.weather[0].main.toLowerCase();

  maxTemp.innerText = `${data.main.temp_max.toFixed(0)}`;
  minTemp.innerText = `${data.main.temp_min.toFixed(0)}`;
  humidity.innerText = `${data.main.humidity.toFixed(0)}`;
  windSpeed.innerText = `${data.wind.speed.toFixed(0)}`;

  weatherImg.classList.add(`${weatherMsg}`);
};

/////////////////////////////////////////////////////////////////////////////

// const request = new XMLHttpRequest();
// request.open(
//   "GET",
//   `https://api.openweathermap.org/data/2.5/onecall?lat=28.5878598&lon=77.199748&exclude=minutely,hourly,alert&ppid=4c86492761337220a27c45b27aa1b770`
// );
// request.send();

// document.addEventListener("load", function () {
//   console.log(responseText);
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);
// });

// // ----------------------------------------------------------
const getWeatherData = function (lat, log) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&units=metric&appid=${apiKey}`
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

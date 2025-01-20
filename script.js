const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

// prettier-ignore
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

const closeBtn = document.getElementById("close");
const popUp = document.querySelector(".popup");

const weatherBox = document.querySelector(".container");

/////////////////////////////////////////////////////////////////////////////
const apiKey = "0fcceef01d62a49fc6701f61ed924699";
/////////////////////////////////////////////////////////////////////////////

// render data to html ======================================================
const renderData = function (data) {
  console.log(data);

  // current Temp ------------------------------------------------
  temp.innerText = `${data.main.temp.toFixed(0)}`;

  msgType.innerText = data.weather[0].main;
  const weatherMsg = data.weather[0].main.toLowerCase();
  weatherImg.classList.add(`${weatherMsg}`);

  // today max and min temp --------------
  maxTemp.innerText = `${data.main.temp_max.toFixed(1)}`;
  minTemp.innerText = `${data.main.temp_min.toFixed(1)}`;

  humidity.innerText = `${data.main.humidity.toFixed(0)}`;
  windSpeed.innerText = `${data.wind.speed.toFixed(1)}`;

  // =============================================================
  // next day max and min temp -----------------------------------
  /* dayNextMax.innerText = `${data.daily[1].temp.max.toFixed(0)}`;
  dayNextMin.innerText = `${data.daily[1].temp.min.toFixed(0)}`;

  // =============================================================
  // day after max and min temp ----------------------------------
  dayAfterMax.innerText = `${data.daily[2].temp.max.toFixed(0)}`;
  dayAfterMin.innerText = `${data.daily[2].temp.min.toFixed(0)}`;

  // =============================================================
  // dates -------------------------------------------------------
  let todayTimeStamp = `${data.daily[0].dt}`;
  let currentDate = new Date(todayTimeStamp * 1000);

  day.innerText = `${days[currentDate.getDay()]},`;
  date.innerText = `${currentDate.getDate()}`;
  month.innerText = `${months[currentDate.getMonth()]}`;

  // =============================================================
  // next day date -----------------------------------------------
  let nextTimeStamp = `${data.daily[1].dt}`;
  let nextDate = new Date(nextTimeStamp * 1000);

  dayNextDay.innerText = `${days[nextDate.getDay()]}`;
  dayNextDate.innerText = `${nextDate.getDate()}`;
  dayNextMonth.innerText = `${months[nextDate.getMonth()]}`;

  // =============================================================
  // after day date ----------------------------------------------
  let afterTimeStamp = `${data.daily[2].dt}`;
  let afterDate = new Date(afterTimeStamp * 1000);

  dayAfterDay.innerText = `${days[afterDate.getDay()]}`;
  dayAfterDate.innerText = `${afterDate.getDate()}`;
  dayAfterMonth.innerText = `${months[afterDate.getMonth()]}`; */
};

/////////////////////////////////////////////////////////////////////////////
// render error =============================================================
const renderError = function (msg) {
  day.innerText = msg;
};

// get weather data =========================================================
const getWeatherData = function (lat, log) {
  console.log(lat, log);
  /*fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${log}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
  )*/
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Something went wrong ❌(${response.status}) `);
      }

      return response.json();
    })
    .then((data) => renderData(data))
    .catch((err) => {
      console.error(`Something wrong ❌❌❌ ${err}`);
      renderError(`Something wrong ❌`);
    });
};

// --------------------------------------------------------

/*const getLocationKey = function (lat, log) {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${log}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Something went wrong ❌(${response.status}) `);
      }

      return response.json();
    })
    .then((data) => getWeatherData(data["Key"]))
    .catch((err) => {
      console.error(`Something wrong with Location API ❌❌❌ ${err}`);
      renderError(`Something wrong with Location API ❌`);
    });
};*/

// --------------------------------------------------------

closeBtn.addEventListener("click", function () {
  popUp.classList.add("close");
  weatherBox.classList.add("display_Box");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude: lat } = position.coords;
      const { longitude: log } = position.coords;

      getWeatherData(lat, log);
    },
    function (error) {
      if (error.code == error.PERMISSION_DENIED)
        renderError(`Location denied ❌`);
    }
  );
});

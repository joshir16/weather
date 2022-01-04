const apiKey = "0fcceef01d62a49fc6701f61ed924699";

const request = new XMLHttpRequest();
request.open(
  "GET",
  `https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=0fcceef01d62a49fc6701f61ed924699`
);
request.send();

request.addEventListener("load", function () {
  const data = JSON.parse(this.responseText);
  console.log(data.weather[0].main);
});

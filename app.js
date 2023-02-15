// Current Date, Time

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  let time = new Date();
  let month = time.getMonth();
  let date = time.getDate();
  let day = time.getDay();
  let hour = time.getHours();
  let hoursIn12HoursFormat = hour >= 13 ? hour % 12 : hour;
  let minutes = time.getMinutes();
  let minutesFormat = minutes <= 10 ? "0" + minutes : minutes;
  let seconds = time.getSeconds();
  let ampm = hour >= 12 ? "PM" : "AM";

  document.getElementById("time").innerHTML =
    (hoursIn12HoursFormat < 10
      ? "0" + hoursIn12HoursFormat
      : hoursIn12HoursFormat) +
    ":" +
    minutesFormat +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    `<span id="am-pm">${ampm}</span>`;

  document.getElementById("date").innerHTML =
    days[day] + " " + date + " " + months[month];
}, 1000);

// Weather

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=41cd218c4549c273819aa70e8ad25629`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

let currentWeatherItemsEl = document.getElementById("current-weather-items");
let timezone = document.getElementById("time-zone");
let country = document.getElementById("country");
let currentTempEl = document.getElementById("current-temp");

function showWeatherData(data) {
  let { temp, feels_like, temp_min, temp_max, humidity, pressure } = data.main;
  let { speed } = data.wind;
  let { sunrise, sunset } = data.sys;

  timezone.innerHTML = data.timezone;
  country.innerHTML = data.coord.lat + "N " + data.coord.lon + "E";

  let timezoneOffset = data.timezone;
  timezone.innerHTML = timezoneOffset;

  currentWeatherItemsEl.innerHTML = `
  <div class="weather-item">
  <div>Temp</div>
  <div>${temp} &deg;C</div>
</div>
<div class="weather-item">
<div>Feels like</div>
<div>${feels_like} &deg;C</div>
</div>
<div class="weather-item">
<div>Temp Max</div>
<div>${temp_max} &deg;C</div>
</div>
<div class="weather-item">
<div>Temp Min</div>
<div>${temp_min} &deg;C</div>
</div>
  
  
  
  <div class="weather-item">
              <div>Humidity</div>
              <div>${humidity}%</div>
            </div>
            <div class="weather-item">
              <div>Pressure</div>
              <div>${pressure}</div>
            </div>
            <div class="weather-item">
              <div>Wind Speed</div>
              <div>${(speed * 3.6).toFixed(2)} km/h</div>
            </div>
            <div class="weather-item">
              <div>Sunrise</div>
              <div>${window.moment(sunrise * 1000).format("HH.mm a")}</div>
            </div>
            <div class="weather-item">
              <div>Sunset</div>
              <div>${window.moment(sunset * 1000).format("HH.mm a")}</div>
            </div>`;
}

// D-Day

let today = new Date();
let currentMonth = today.getMonth();
let nextMonth = currentMonth + 1;
let lastDayOfCurrentMonth = new Date(
  today.getFullYear(),
  nextMonth,
  0
).getDate();
let daysUntilEndOfMonth = lastDayOfCurrentMonth - today.getDate();

let ddayText = `You have ${daysUntilEndOfMonth} days left.`;
if (daysUntilEndOfMonth === 1) {
  ddayText = `You have ${daysUntilEndOfMonth} day left.`;
}

document.getElementById("dday").innerHTML = ddayText;

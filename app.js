// Current Date, Time

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
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
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HoursFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const minutesFormat = minutes <= 10 ? "0" + minutes : minutes;
  const seconds = time.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";

  document.getElementById("time").innerHTML =
    (hoursIn12HoursFormat < 10
      ? "0" + hoursIn12HoursFormat
      : hoursIn12HoursFormat) +
    ":" +
    minutesFormat +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  document.getElementById("date").innerHTML =
    days[day] + " " + date + " " + months[month] + ", ";
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

const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const country = document.getElementById("country");
const currentTempEl = document.getElementById("current-temp");

function showWeatherData(data) {
  let { humidity, pressure } = data.main;
  let { speed } = data.wind;
  let { sunrise, sunset } = data.sys;

  timezone.innerHTML = data.timezone;
  country.innerHTML = data.coord.lat + "N   " + data.coord.lon + "E";

  const timezoneOffset = data.timezone;
  timezone.innerHTML = timezoneOffset;

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
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

// Alarm Clock

const alarmTimeInput = document.getElementById("alarmTime");
const setAlarmButton = document.getElementById("setAlarm");
const alarmStatus = document.getElementById("alarmStatus");

setAlarmButton.addEventListener("click", function () {
  const alarmTime = new Date();
  alarmTime.setHours(alarmTimeInput.value.split(":")[0]);
  alarmTime.setMinutes(alarmTimeInput.value.split(":")[1]);
  alarmTime.setSeconds(0);

  const currentTime = new Date();

  if (alarmTime <= currentTime) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  alarmStatus.innerHTML = "Alarm set for " + alarmTime;

  setTimeout(function () {
    alert("Hey! Wassup!");
    alarmStatus.innerHTML = "Alarm not set";
  }, alarmTime.getTime() - currentTime.getTime());
});

// D-Day

const today = new Date();
const currentMonth = today.getMonth();
const nextMonth = currentMonth + 1;
const lastDayOfCurrentMonth = new Date(
  today.getFullYear(),
  nextMonth,
  0
).getDate();
const daysUntilEndOfMonth = lastDayOfCurrentMonth - today.getDate();

let ddayText = `You have ${daysUntilEndOfMonth} days left.`;
if (daysUntilEndOfMonth === 1) {
  ddayText = `You have ${daysUntilEndOfMonth} day left.`;
}

document.getElementById("dday").innerHTML = ddayText;

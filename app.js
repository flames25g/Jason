var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var n =  new Date();
var y = n.getFullYear();
var m = n.getMonth();
var d = n.getDate();
document.getElementById("date").innerHTML = d + "/" + monthNames[m] + "/" + y;

setInterval(function() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
  
    document.getElementById("time").innerHTML =
      (hours < 10 ? "0" + hours : hours) + ":" +
      (minutes < 10 ? "0" + minutes : minutes) + ":" +
      (seconds < 10 ? "0" + seconds : seconds);
  }, 1000);






  const alarmTimeInput = document.getElementById("alarmTime");
    const setAlarmButton = document.getElementById("setAlarm");
    const alarmStatus = document.getElementById("alarmStatus");

    setAlarmButton.addEventListener("click", function() {
      const alarmTime = new Date();
      alarmTime.setHours(alarmTimeInput.value.split(":")[0]);
      alarmTime.setMinutes(alarmTimeInput.value.split(":")[1]);
      alarmTime.setSeconds(0);

      const currentTime = new Date();

      if (alarmTime <= currentTime) {
        alarmTime.setDate(alarmTime.getDate() + 1);
      }

      alarmStatus.innerHTML = "Alarm set for " + alarmTime;

      setTimeout(function() {
        alert("Hey! Wassup!");
        alarmStatus.innerHTML = "Alarm not set";
      }, alarmTime.getTime() - currentTime.getTime());
    });
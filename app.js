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
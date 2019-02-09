function formatTime (val) {
  var hours, days = 0;
  if (val/1440 > 0) {
    days = Math.floor(val/1440);
    val -= (days*1440);
  }
  if (val/60 > 0) {
    hours = Math.floor(val/60);
    val -= (hours*60);
  }
  return days + " day(s) " + hours + " hour(s) " + val + " minute(s)";
}
formatTime(2800);
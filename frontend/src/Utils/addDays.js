
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export default function addDays(days) {
  let date = new Date();

  return date.addDays(Number(days));
}

function addMinutes(date, minutes) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("bad date");
  }
  if (typeof minutes !== "number") {
    throw new Error("bad minutes");
  }
  const d = new Date(date.getTime());
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

function toHHMM(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("bad date");
  }
  let h = date.getHours();
  let m = date.getMinutes();
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  return h + ":" + m;
}

module.exports = {
  addMinutes,
  toHHMM
};

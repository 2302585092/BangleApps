let settings = require('Storage').readJSON('siclock.json',1) || {
  date : true,
  seconds : true
};

const timeY = 40;
const dateY = 70;
require('Font8x16').add(Graphics);

let timer = null;
let currentDate = new Date();

const drawAll = () => {
  g.clear();
  g.setFont8x16();

  currentDate = new Date();
  let timeString = `   ${("0"+currentDate.getHours().toString()).substr(-2)}:${("0"+currentDate.getMinutes().toString()).substr(-2)}:${("0"+currentDate.getMinutes().toString()).substr(-2)}   `;
  let timeX = (240 - g.stringWidth(timeString))/2;
  g.drawString(timeString, timeX, timeY);
  if (settings.date) {
      let dateString = `   ${locale.dow(currentDate)} ${("0"+currentDate.getDate().toString()).substr(-2)}.${("0"+currentDate.Month().toString()).substr(-2)}.  `;
      let dateX = (240 - g.stringWidth(dateString))/2;
      g.drawString(dateString, dateX, dateY);
  }
};

const onDay = () => {
  currentDate = new Date();
  dowString = locale.dow(currentDate);
  dateString = words[currentDate.getDate()];
  monthString = words[currentDate.getMonth()+1];
  g.setColor(colorDate);
  g.drawString(dowString, startX, startYDOW, true);
  g.drawString(dateString, startX, startYDate, true);
  g.drawString(monthString, startX, startYMonth, true);

};

const startTimers = () => {
  timer = setInterval(drawAll, 1000);
};

drawAll();
startTimers();
Bangle.loadWidgets();
Bangle.drawWidgets();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });

Bangle.on('lcdPower', (on) => {
  if (timer) clearInterval(timer);
    timer = undefined;
  if (on) {
    drawAll();
    startTimers();
    Bangle.drawWidgets();
  } 
});


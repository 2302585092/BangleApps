let settings = require('Storage').readJSON('siclock.json',1) || {
  date : true,
  seconds : true
};
let locale = require('locale');

const timeY = 40;
const dateY = 70;

let timer = null;
let currentDate = new Date();

const drawAll = () => {
  g.setFont("6x8", 3);
  currentDate = new Date();

  let timeString;
  if (settings.seconds) timeString = `   ${("0"+currentDate.getHours().toString()).substr(-2)}:${("0"+currentDate.getMinutes().toString()).substr(-2)}:${("0"+currentDate.getSeconds().toString()).substr(-2)}   `;
  else timeString = `   ${("0"+currentDate.getHours().toString()).substr(-2)}:${("0"+currentDate.getMinutes().toString()).substr(-2)}   `;

  let timeX = (240 - g.stringWidth(timeString))/2;
  g.drawString(timeString, timeX, timeY, true);
  if (settings.date) {
    g.setFont("6x8", 2);
      let dateString = `   ${locale.dow(currentDate, 1)} ${("0"+currentDate.getDate().toString()).substr(-2)}.${("0"+(currentDate.getMonth()+1).toString()).substr(-2)}.  `;
      let dateX = (240 - g.stringWidth(dateString))/2;
      g.drawString(dateString, dateX, dateY, true);
  }
};

const startTimers = () => {
  timer = setInterval(drawAll, 1000);
};

g.clear();
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


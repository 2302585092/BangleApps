// http://forum.espruino.com/conversations/345155/#comment15172813

const locale = require('locale');
const faceWidth = 100; // watch face radius (240/2 - 24px for widget area)
const widgetHeight=24+1;
let timer = null;
let currentDate = new Date();
const startX = 30;
const startYSec = 100;
const startYMin = 70;
const startYHour = 40;
const startYDOW = 150;
const startYDate = 180;
const startYMonth = 210;
const colorSec = '#FFFFFF';
const colorMin = '#FFFFFF';
const colorHour = '#FFFFFF';
const colorDate = '#FF0000';
const colorBG = '#000000';
const font = '6x8';
const fontSize = 2;
const buzzMode = false;
const secMode = true;
const dateMode = false;

const words = [
  'null', 
  'eins', 
  'zwei', 
  'drei', 
  'vier', 
  'fünf', 
  'sechs',
  'sieben',
  'acht',
  'neun',
  'zehn',
  'elf',
  'zwölf',
  'dreizehn',
  'vierzehn',
  'fünfzehn',
  'sechzehn',
  'siebzehn',
  'achtzehn',
  'neunzehn',
  'zwanzig',
  'einundzwanzig',
  'zweiundzwanzig',
  'dreiundzwanzig',
  'vierundzwanzig',
  'fünfundzwanzig',
  'sechsundzwanzig',
  'siebenundzwanzig',
  'achtundzwanzig',
  'neunundzwanzig',
  'dreissig',
  'einunddreissig',
  'zweiunddreissig',
  'dreiunddreissig',
  'vierunddreissig',
  'fünfunddreissig',
  'sechsunddreissig',
  'siebenunddreissig',
  'achtunddreissig',
  'neununddreissig',
  'vierzig',
  'einundvierzig',
  'zweiundvierzig',
  'dreiundvierzig',
  'vierundvierzig',
  'fünfundvierzig',
  'sechsundvierzig',
  'siebenundvierzig',
  'achtundvierzig',
  'neunundvierzig',
  'fünfzig',
  'einundfünfzig',
  'zweiundfünfzig',
  'dreiundfünfzig',
  'vierundfünfzig',
  'fünfundfünfzig',
  'sechsundfünfzig',
  'siebenundfünfzig',
  'achtundfünfzig',
  'neunundfünfzig'
];

const drawAll = () => {
  g.clear();
  currentDate = new Date();
  // draw hands first
  if (dateMode) {
    onDay();
  }
  onHour();
  onMinute();
  onSecond();
};


const onSecond = () => {
  //TODO: set currentDate, oldDate => all functions use these, reset after onMinute?
  g.setFont(font, fontSize);

  g.setColor(colorBG);
  g.drawString(words[currentDate.getSeconds()], startX, startYSec);
  if (currentDate.getSeconds() === 59) {
    onMinute();
  }
  currentDate = new Date();
  g.setColor(colorSec);
  g.drawString(words[currentDate.getSeconds()], startX, startYSec);
};


const onMinute = () => {
  g.setColor(colorBG);
  g.drawString(words[currentDate.getMinutes()], startX, startYMin);
  if (currentDate.getMinutes() === 59) {
    onHour();
  }
  currentDate = new Date();
  g.setColor(colorMin);
  g.drawString(words[currentDate.getMinutes()], startX, startYMin);

  if (buzzMode && (currentDate.getHours() >= 0 && currentDate.getMinutes() === 0)) {
    Bangle.buzz();
  }
  if (dateMode) {
    drawDate();
  }
};

const onHour = () => {
  g.setColor(colorBG);
  g.drawString(words[currentDate.getHours()], startX, startYHour);
  if (dateMode && (currentDate.getHours() === 23)) {
    onDay();
  }
  currentDate = new Date();
  g.setColor(colorHour);
  g.drawString(words[currentDate.getHours()], startX, startYHour);
};

const onDay = () => {
  let dowString = locale.dow(currentDate);
  let dateString = words[currentDate.getDate()];
  let monthString = words[currentDate.getMonth()+1];
  g.setColor(colorBG);
  g.drawString(dowString, startX, startYDOW);
  g.drawString(dateString, startX, startYDate);
  g.drawString(monthString, startX, startYMonth);
  currentDate = new Date();
  dowString = locale.dow(currentDate);
  dateString = words[currentDate.getDate()];
  monthString = words[currentDate.getMonth()+1];
  g.setColor(colorDate);
  g.drawString(dateDisplay, startX, startYDate);
  g.drawString(dowString, startX, startYDOW);
  g.drawString(dateString, startX, startYDate);
  g.drawString(monthString, startX, startYMonth);

};

const startTimers = () => {
  timer = setInterval(onSecond, 1000);
};

Bangle.on('lcdPower', (on) => {
  if (on) {
    // g.clear();
    drawAll();
    startTimers();
    Bangle.drawWidgets();
  } else {
    if (timer) {
      clearInterval(timer);
    }
  }
});

//g.clear();
g.setFont(font, fontSize);
startTimers();
drawAll();
Bangle.loadWidgets();
Bangle.drawWidgets();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });


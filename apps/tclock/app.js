const filename = 'tclock.json';
const Storage = require("Storage");
let settings = Storage.readJSON(filename,1) || {
  date : false,
  alarm1 : false,
  amin : 0,
  ahr : 0
};

const locale = require('locale');
const startX = 30;
const startYSec = 100;
const startYMin = 70;
const startYHour = 40;
const startYDOW = 140;
const startYDate = 170;
const startYMonth = 200;
const colorSec = '#FFFFFF';
const colorMin = '#FFFFFF';
const colorHour = '#FFFFFF';
const colorDate = '#FFFFFF';
const colorBG = '#000000';
const font = '6x8';
const fontSize = 2;

let timer = null;
let currentDate = new Date();

const words = [
  'null            ',
  'eins            ',
  'zwei            ',
  'drei            ',
  'vier            ',
  'fünf            ',
  'sechs           ',
  'sieben          ',
  'acht            ',
  'neun            ',
  'zehn            ',
  'elf             ',
  'zwölf           ',
  'dreizehn        ',
  'vierzehn        ',
  'fünfzehn        ',
  'sechzehn        ',
  'siebzehn        ',
  'achtzehn        ',
  'neunzehn        ',
  'zwanzig         ',
  'einundzwanzig   ',
  'zweiundzwanzig  ',
  'dreiundzwanzig  ',
  'vierundzwanzig  ',
  'fünfundzwanzig  ',
  'sechsundzwanzig ',
  'siebenundzwanzig',
  'achtundzwanzig  ',
  'neunundzwanzig  ',
  'dreißig         ',
  'einunddreißig   ',
  'zweiunddreißig  ',
  'dreiunddreißig  ',
  'vierunddreißig  ',
  'fünfunddreißig  ',
  'sechsunddreißig ',
  'siebenunddreißig',
  'achtunddreißig  ',
  'neununddreißig  ',
  'vierzig         ',
  'einundvierzig   ',
  'zweiundvierzig  ',
  'dreiundvierzig  ',
  'vierundvierzig  ',
  'fünfundvierzig  ',
  'sechsundvierzig ',
  'siebenundvierzig',
  'achtundvierzig  ',
  'neunundvierzig  ',
  'fünfzig         ',
  'einundfünfzig   ',
  'zweiundfünfzig  ',
  'dreiundfünfzig  ',
  'vierundfünfzig  ',
  'fünfundfünfzig  ',
  'sechsundfünfzig ',
  'siebenundfünfzig',
  'achtundfünfzig  ',
  'neunundfünfzig  '
];

const drawAll = () => {
  g.clear();
  currentDate = new Date();
  // draw hands first
  if (settings.date) {
    onDay();
  }
  onHour();
  onMinute();
  onSecond();
};


const onSecond = () => {
  //TODO: set currentDate, oldDate => all functions use these, reset after onMinute?
  g.setFont(font, fontSize);

//  g.setColor(colorBG);
//  g.drawString(words[currentDate.getSeconds()], startX, startYSec);
  if (currentDate.getSeconds() === 59) {
    onMinute();
  }
  currentDate = new Date();
  g.setColor(colorSec);
  g.drawString(words[currentDate.getSeconds()], startX, startYSec, true);
};


const onMinute = () => {
//  g.setColor(colorBG);
//  g.drawString(words[currentDate.getMinutes()], startX, startYMin);
  if (currentDate.getMinutes() === 59) {
    onHour();
  }
  currentDate = new Date();
  g.setColor(colorMin);
  g.drawString(words[currentDate.getMinutes()], startX, startYMin, true);

  if (settings.alarm1 && (currentDate.getHours() === settings.ahr && currentDate.getMinutes() === settings.amin)) {
    Bangle.buzz();
  }
};

const onHour = () => {
//  g.setColor(colorBG);
//  g.drawString(words[currentDate.getHours()], startX, startYHour);
  if (settings.date && (currentDate.getHours() === 23)) {
    onDay();
  }
  currentDate = new Date();
  g.setColor(colorHour);
  g.drawString(words[currentDate.getHours()], startX, startYHour, true);
};

const onDay = () => {
  let dowString = locale.dow(currentDate);
  let dateString = words[currentDate.getDate()];
  let monthString = words[currentDate.getMonth()+1];
//  g.setColor(colorBG);
//  g.drawString(dowString, startX, startYDOW);
//  g.drawString(dateString, startX, startYDate);
//  g.drawString(monthString, startX, startYMonth);
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

// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (timer) clearInterval(timer);
  timer = undefined;
  if (on) {
    setInterval(onSecond, 1000);
    onSecond(); // draw immediately
  }
});


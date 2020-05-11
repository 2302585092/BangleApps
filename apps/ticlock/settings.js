// make sure to enclose the function in parentheses
(function(back) {
  let settings = require('Storage').readJSON('tclock.json',1)||{};
  function save(key, value) {
    settings[key] = value;
    require('Storage').write('tclock.json',settings);
  } 
  const appMenu = {
    '': {'title': 'App Settings'},
    '< Back': back,
    'Date': {
      value: settings.date||false,
      format : date => date?"Yes":"No",
      onchange: (date) => {save('date', date)}
    },
    'Alarm1 active': {
      value: settings.alarm1||false,
      format : alarm1 => alarm1?"Yes":"No",
      onchange: (alarm1) => {save('alarm1', alarm1)}
    },
    "alarm time min" : {
      value : settings.amin||0,
      min: 0, max: 59, step: 1,
      onchange : (amin) => {save('amin', amin)}
    },
    "alarm time hr" : {
      value : settings.ahr||0,
      min: 0, max: 23, step: 1,
      onchange : (ahr) => {save('ahr', ahr)}
    }
  };
  E.showMenu(appMenu)
})


// make sure to enclose the function in parentheses
(function(back) {
  let settings = require('Storage').readJSON('aclock.json',1)||{};
  function save(key, value) {
    settings[key] = value;
    require('Storage').write('aclock.json',settings);
  } 
  const appMenu = {
    '': {'title': 'App Settings'},
    '< Back': back,
    'Direction': {
      value: settings.dir||'right',
      onchange: (dir) => {save('dir', dir)}
    },   
    'Date': {
      value: settings.date||'yes',
      onchange: (date) => {save('date', date)}
    }
  };
  E.showMenu(appMenu)
})

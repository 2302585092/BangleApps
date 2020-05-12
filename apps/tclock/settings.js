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
    }
  };
  E.showMenu(appMenu)
})


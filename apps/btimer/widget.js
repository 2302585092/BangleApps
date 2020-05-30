(() => {

  const timer1 = 3*60*1000; //3 minutes
  let timer1id;
  const timer2 = 30*60*1000; //30 minutes
  let timer2id;
  const clickThreshold = 1; //seconds
  let lastClick1;
  let lastClick3;
  let lastClick4;
  let lastClick5;
  
  const buzzer = (t) => {
    Bangle.buzz(1000);
    if (t === 1) timer1id = undefined;
    if (t === 2) timer2id = undefined;
    Bangle.drawWidgets();
  };
  
  const click1 = (e, button) => {
    if (lastClick1) {
      let clickPeriod = e.time-lastClick1;
      if (clickPeriod<clickThreshold) {
        if (timer1id === undefined) {
            console.log("timer 1 started");
            timer1id = setTimeout(buzzer, timer1, 1);
        } else {
            console.log("timer 1 cancelled");
            clearTimeout(timer1id);
            timer1id = undefined;
        }
        lastClick1 = undefined;
      }
    }
    lastClick1 = e.time;
    Bangle.drawWidgets();
  };

  const click3 = (e, button) => {
    if (lastClick3) {
      let clickPeriod = e.time-lastClick3;
      if (clickPeriod<clickThreshold) {
        console.log("starting pomodo");
        lastClick3 = undefined;
        load("pomodo2.app.js");
      }
    }
    lastClick3 = e.time;
  };

  const click4 = (e, button) => {
    if (lastClick4) {
      let clickPeriod = e.time-lastClick4;
      if (clickPeriod<clickThreshold) {
        console.log("wakeOnFaceUp enabled");
        Bangle.setOptions({wakeOnFaceUp: true});
        Bangle.buzz(600);
        lastClick4 = undefined;
      }
    }
    lastClick4 = e.time;
  };

  const click5 = (e) => {
    if (lastClick5) {
      let clickPeriod = e.time-lastClick5;
      if (clickPeriod<clickThreshold) {
        console.log("wakeOnFaceUp disabled");
        Bangle.setOptions({wakeOnFaceUp: false});
        Bangle.buzz(200);
        setTimeout('Bangle.buzz(200)', 300);
        lastClick5 = undefined;
        return;
      }
    }
    lastClick5 = e.time;
  };

  const img = require("heatshrink").decompress(atob("iUSwkDCZ8QAw0RBAsBiIABBIgHCiI0FBA4RGEIMiBAoEBiUiBQIyFkIQFHZQIRL45xGCAwAR"));

  function draw() {
    if ((timer1id === undefined) && (timer2id === undefined)) {
      return;
    }
    g.reset(); // reset the graphics context to defaults (color/font/etc)
    // add your code
    g.drawImage(img, this.x, this.y);
  }

  // add your widget
  WIDGETS["tclwid"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: 20, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };

  setWatch(function(e) { click1(e); }, BTN1, {repeat:true, edge:"rising"});
  setWatch(function(e) { click3(e); }, BTN3, {repeat:true, edge:"rising"});

  setWatch(function(e) { click4(e); }, BTN4, {repeat:true, edge:"rising"});
  setWatch(function(e) { click5(e); }, BTN5, {repeat:true, edge:"rising"});

})()

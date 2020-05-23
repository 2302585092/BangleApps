(() => {

  const timer1 = 3*60*1000; //3 minutes
  let timer1id;
  const timer2 = 30*60*1000; //30 minutes
  let timer2id;
  const clickThreshold = 1; //seconds
  let lastClickOn;
  let lastClickOff;
  
  const buzzer = (t) => {
    Bangle.buzz(1000);
    if (t === 1) timer1id = undefined;
    if (t === 2) timer2id = undefined;
    Bangle.drawWidgets();
  };
  
  const toggleTimer = (e, instance) => {
    if (instance === 1) {
      if (timer1id === undefined) {
          console.log("timer 1 started");
          timer1id = setTimeout(buzzer, timer1, 1);
      } else {
          console.log("timer 1 cancelled");
          clearTimeout(timer1id);
          timer1id = undefined;
      }
    } else {
      if (timer2id === undefined) {
          console.log("timer 2 started");
          timer2id = setTimeout(buzzer, timer2, 2);
      } else {
          console.log("timer 2 cancelled");
          clearTimeout(timer2id);
          timer2id = undefined;
      }
    }
    Bangle.drawWidgets();
  };

  const faceUpOn = (e, button) => {
    if (lastClickOn) {
      let clickPeriod = e.time-lastClickOn;
      if (clickPeriod<clickThreshold) {
        console.log("wakeOnFaceUp enabled");
        Bangle.setOptions({wakeOnFaceUp: true});
        Bangle.buzz(600);
        lastClickOn = undefined;
      }
    }
    lastClickOn = e.time;
  };

  const faceUpOff = (e, button) => {
    if (lastClickOff) {
      let clickPeriod = e.time-lastClickOff;
      if (clickPeriod<clickThreshold) {
        console.log("wakeOnFaceUp disabled");
        Bangle.setOptions({wakeOnFaceUp: false});
        Bangle.buzz(200);
        setTimeout('Bangle.buzz(200)', 300);
        lastClickOff = undefined;
        return;
      }
    }
    lastClickOff = e.time;
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

  setWatch(function(e) { toggleTimer(e,1); }, BTN1, {repeat:true, edge:"rising"});
  setWatch(function(e) { toggleTimer(e,2); }, BTN3, {repeat:true, edge:"rising"});

  setWatch(function(e) { faceUpOn(e,4); }, BTN4, {repeat:true, edge:"rising"});
  setWatch(function(e) { faceUpOff(e,5); }, BTN5, {repeat:true, edge:"rising"});

})()

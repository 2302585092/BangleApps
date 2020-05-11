/* run widgets in their own function scope so they don't interfere with
currently-running apps */

(() => {
  let img = require("heatshrink").decompress(atob("l0wwkA/4A/AH4A/AA3zCic//8yCiMvAIPziYWS+cvmQaBKyEv+UjkZGBmYVN+QrCkXymchF53ymQrBDAMjkRDOCwMiAIMz+ZFBCx0iiXyLKAWCiZyBDYUiFxwWCIgJaBUJ6dBLIKkBkazNHgIpBHwIVPTYIYCka0BDoQWKWQRXBiJEBGQhCKCAMyFQcSLoIWKmUyn5EBn4vBAASILIIMzAQQxBWRvziYTBIgKfBmSxObwU/IgMzAoIAMFAJEC+QWBFpwWCIIQCBZZv/mZECmZECQpYWFUAiINOQMSWIb2MW4pEBFoJDPFwSDBCwIsQZ4MhIIMhFiAuCcoKdORg0zCqYA/AH4A++c/n4gdA=="))

  function draw() {
    g.reset(); // reset the graphics context to defaults (color/font/etc)
  	// add your code
    g.drawImage(img, this.x, this.y);
  }

  // add your widget
  WIDGETS["tclwid"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right)
    width: 25, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})()

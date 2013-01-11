'use strict';

yeomanApp.directive('deviceLedPicker16k'
  , [
  function() {


function generateColorArray(numColors) {
  var colorArray = [];

  var startingHue = 0;
  var colorInterval = 360 / numColors;
  for (var i=0; i<numColors; i++) {
    var hue = startingHue + (i * colorInterval);
    var color = 'hsl(' + hue + ', 100%, 50%)';
    colorArray.push(color);
  }

  colorArray.push('#FFFFFF');
  colorArray.push('#000000');

  return colorArray;
}


/**
 * Draws the colour wheel
 * @param  {element} canvas        Canvas element to draw the wheel on
 * @param  {int} outsideRadius The outside radius of the circle
 * @param  {int} insideRadius  The inside radius of the circle
 * @param  {string array} colors        The colours of the wheel
 */
function drawColourWheel(canvas, outsideRadius, insideRadius, colors) {

  var startAngle = 0;
  var arc = Math.PI / (colors.length/2);
  var ctx;
  
  if (canvas.getContext) {
    
    // debugger;
    ctx = canvas.getContext("2d");
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    
    for(var i = 0; i < colors.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[i];
      
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, outsideRadius, angle, angle + arc, false);
      ctx.arc(canvas.width/2, canvas.height/2, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
    }
  } else {
    console.log("No context");
  }
}





function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
/**
 * Converts an RGB value to HEX
 * @param  {int} r Red value
 * @param  {int} g Green value
 * @param  {int} b Blue value
 * @return {string}   Hex value
 */
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}



  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var canvas = jQuery("<canvas>");
      var canvasId = 'colorWheel_' + scope.Device.GUID();
      canvas.attr({ id: canvasId});

      var colors = generateColorArray(16);
      drawColourWheel(element[0], 70, 30, colors);

      /**
       * Set the device LED colour when clicking
       */
      element.click(function(e) {
          var pos = findPos(this);
          var x = e.pageX - pos.x;
          var y = e.pageY - pos.y;
          var coord = "x=" + x + ", y=" + y;
          var c = this.getContext('2d');
          var p = c.getImageData(x, y, 1, 1).data;
          var hex = ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);


          // Choose the color
          scope.ButtonValue = hex.toUpperCase();
      });
    }
  };
}]);

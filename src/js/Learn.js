/* eslint-disable no-unused-vars */
let p5;
let delegate;

var w = window.innerWidth - 150;
var h = window.innerHeight - 150;

var x = 0;
var y = 0;
var px = 0;
var py = 0;

var wayppoints = [];
var dots = [];
var placeDot = false;
var draw = false;
var canvas;

let dotSize = 15;
let lineSize = 2;
let easing = 0.01;
let dotColor;
let lineColor;
let backgroundColor;

export default wayppoints;

export function main(_p5) {
  p5 = _p5;

  p5.setup = _ => {
    canvas = p5.createCanvas(w, h);
    canvas.parent("p5Canvas");
    // eslint-disable-next-line prettier/prettier
    dotColor = p5.color('#9CFFFF');
    // eslint-disable-next-line prettier/prettier
    lineColor = p5.color('#9CFFFF');
    // eslint-disable-next-line prettier/prettier
    backgroundColor = p5.color('#6A6A6A');
    p5.background(backgroundColor);
  };

  p5.keyPressed = _ => {
    placeDot = Boolean(p5.keyCode === 68);
    draw = Boolean(p5.keyCode === 80);
    if (draw) {
      x = p5.mouseX;
      y = p5.mouseY;
      px = p5.mouseX;
      py = p5.mouseY;
    }
  };

  p5.mouseDragged = () => {
    var targetX = p5.mouseX;
    var targetY = p5.mouseY;
    x += (targetX - x) * easing;
    y += (targetY - y) * easing;
    storeCoordinate(x, y, wayppoints);
    var weight = p5.dist(x, y, px, py);
    if (placeDot) {
      p5.fill(dotColor);
      p5.noStroke();
      p5.ellipse(x, y, dotSize, dotSize);
      p5.strokeWeight(1);

      placeDot = Boolean(false);
      storeCoordinate(x, y, dots);
    }
    p5.stroke(lineColor);
    p5.fill(lineColor);
    p5.strokeWeight(lineSize);
    p5.line(x, y, px, py);
    py = y;
    px = x;

    return false;
  };

  function storeCoordinate(x, y, array) {
    // x value (even indexes)// y value (odd indexes)
    if (x > 0 && y > 0) {
      array.push(x);
      array.push(y);
    }
  }
  p5.draw = _ => {};
}

export function clearWaypoints() {
  wayppoints = [];
}

export function clearDots() {
  dots = [];
}

export function setDelegate(_delegate) {
  delegate = _delegate;
}

export function setDotSize(_dotSize) {
  dotSize = _dotSize;
}

export function setLineSize(_lineSize) {
  lineSize = _lineSize;
}

export function setLineColor(_lineColor) {
  lineColor = p5.color(_lineColor);
}

export function setDotColor(_dotColor) {
  dotColor = p5.color(_dotColor);
}

export function setBackgroundColor(_backgroundColor) {
  backgroundColor = p5.color(_backgroundColor);
}

export function clearDrawing() {
  p5.background(backgroundColor);
}

export function getWaypoints() {
  return wayppoints;
}

export function setEasing(_easing) {
  easing = _easing;
}

export function saveCanvas() {
  var date = new Date();
  var dateString =
    date.getFullYear() +
    ":" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  console.log(dateString);
  p5.saveCanvas(canvas, "newCanvas_" + dateString);
}

export function setSettings(_settings) {
  //Not pretty
  //TO-DO: better handeling for all settings
  //console.log(_settings);
  setDotSize(_settings[0]);
  setLineSize(_settings[1]);
  setLineColor(_settings[2]);
  setBackgroundColor(_settings[3]);
  setDotColor(_settings[4]);
  setEasing(_settings[5]);
}

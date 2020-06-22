/* eslint-disable no-unused-vars */
let p5;
var dotPair;
var dotArray = [];
var tempX;
var tempY;
var ready = false; 

export function main(_p5) {
  p5 = _p5;
  p5.setup = _ => {};

  p5.draw = _ => {};
}

class Dot {
  constructor(x, y) {
    this.start = p5.createVector(x, y);
    this.end = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.current = this.end;
    this.angle = 0.0;
  }

  showDotPair() {
    p5.push();
    p5.fill(200, 0, 0);
    p5.noStroke();
    p5.ellipse(this.start.x, this.start.y, 5);
    p5.ellipse(this.end.x, this.end.y, 5);
    p5.pop();
  }

  showLine() {
    p5.line(this.start.x, this.start.y, this.current.x, this.current.y);
  }

  animateLine() {
    tempX = p5.map(this.angle, 0, 100, this.start.x, this.end.x, 1);
    tempY = p5.map(this.angle, 0, 100, this.start.y, this.end.y, 1);

    this.current = p5.createVector(tempX, tempY);

    if (tempX == this.end.x && tempY == this.end.y) {
      ready = true;
    }
    this.angle += 0.5;
  }
}

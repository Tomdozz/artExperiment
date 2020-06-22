/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
let p5;

var w = window.innerWidth / 2;
var h = window.innerHeight / 2;

let dotSizeSlider;
let dotSizeSliderVal;
var dotSizeX = 100;
var dotSizeY = 100;

let lineSizeSlider;
let lineSizeSliderVal;
var lineSizeX = 100;
var lineSizeY = 130;

export function main(_p5) {
  p5 = _p5;

  p5.setup = _ => {
    var canvas = p5.createCanvas(w, h);
    canvas.parent("p5CanvasSettings");
    p5.background(150);

    dotSizeSlider = p5.createSlider(0, 500, 10);
    dotSizeSlider.position(dotSizeX, dotSizeY);
    dotSizeSlider.style('width', '100px');

    lineSizeSlider = p5.createSlider(0, 500, 10);
    lineSizeSlider.position(lineSizeX, lineSizeY);
    lineSizeSlider.style('width', '100px');
  };

  p5.draw = _ => {
    dotSizeSliderVal = dotSizeSlider.value();
    p5.background(dotSizeSliderVal);
    p5.noFill();

    // p5.textSize(32);
    // p5.text("DotSize", dotSizeX, dotSizeY);
    // p5.fill(0, 102, 153);
    
    // p5.text("LineSize", lineSizeX, lineSizeY - 15);
    // p5.fill(0, 102, 153);

  };
}

import "./sketch/crazyMod";
import {crazyNess} from "./sketch/crazyMod.js";

let x, y, backgroundColor, esp;

const width = 500;
const height = 500;

let s = new p5(s => true);


s.setup = function () {
  console.log(crazyNess);
  s.createCanvas(width, height, s.webGL);
  backgroundColor = s.color(s.random(255), s.random(255), s.random(255));

  x = s.random(width);
  y = height / 2;
  let vor = d3.voronoi().size([width, height]);
  esp = vor(d3.range(300).map(i => [s.random(width), s.random(height)])).polygons();
};

s.draw = function draw() {
  s.background(backgroundColor);
  s.fill(s.color(255, 0, 0));
  s.ellipse(x, y, 100, 100);
  crazyNess(s);
  x = (x + 1) % width;
  s.noFill();
  esp.map(poly => {
    s.beginShape();
    poly.map(point => s.vertex(point[0], point[1]));
    s.endShape(s.CLOSE)
  })
  s.filter(s.BLUR, 3.6)
};

s.mousePressed = function mousePressed() {
  backgroundColor = s.color(s.random(255), s.random(255), s.random(255));
};

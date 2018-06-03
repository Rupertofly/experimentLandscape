import interpolate from 'b-spline';

import { crazyNess } from './sketch/crazyMod.js';

let x, y, backgroundColor, esp;

const width = window.innerWidth;
const height = window.innerHeight;

let s = new p5( () => true );

s.setup = function() {
  console.log( interpolate );
  s.createCanvas( width, height, s.webGL );
  backgroundColor = s.color( s.random( 255 ), s.random( 255 ), s.random( 255 ) );

  x = s.random( width );
  y = height / 2;
  let vor = d3.voronoi().size( [width, height] );
  esp = vor(
    d3.range( 300 ).map( () => [s.random( width ), s.random( height )] )
  ).polygons();
};

s.draw = function draw() {
  s.background( backgroundColor );
  s.fill( s.color( 255, 0, 0 ) );
  s.ellipse( x, y, 100, 100 );

  crazyNess( s );
  x = ( x + 1 ) % width;
  s.noFill();
  s.strokeWeight( 3 );
  esp.map( poly => {
    s.beginShape();
    poly.map( point => s.vertex( point[0], point[1] ) );
    s.endShape( s.CLOSE );
  } );
};

s.mousePressed = function mousePressed() {
  backgroundColor = s.color( s.random( 255 ), s.random( 255 ), s.random( 255 ) );
};

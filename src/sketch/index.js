import interpolate from 'b-spline';

import { crazyNess } from './crazyMod.js';

let x, y, backgroundColor, esp;

const width = window.innerWidth;
const height = window.innerHeight;

export function setup() {
  console.log( interpolate );
  createCanvas( width, height );
  backgroundColor = color( random( 255 ), random( 255 ), random( 255 ) );

  x = random( width );
  y = height / 2;
  let vor = d3.voronoi().size( [width, height] );
  esp = vor(
    d3.range( 300 ).map( () => [random( width ), random( height )] )
  ).polygons();
}

export function draw() {
  background( backgroundColor );
  fill( color( 255, 0, 0 ) );
  ellipse( x, y, 100, 100 );

  x = ( x + 1 ) % width;
  noFill();
  strokeWeight( 3 );
  esp.map( poly => {
    beginShape();
    poly.map( point => vertex( point[0], point[1] ) );
    endShape( CLOSE );
  } );
  filter( BLUR, 2 );
}

export function mousePressed() {
  backgroundColor = color( random( 255 ), random( 255 ), random( 255 ) );
}

import interpolate from 'b-spline';
import { getRandomInt } from './helperFuncs';
import getC from './pallete';

let x, y, backgroundColor, esp;

const width = window.innerWidth;
const height = window.innerHeight;

export function setup() {
  console.log( interpolate );
  createCanvas( width, height, WEBGL );
  backgroundColor = color( getC( getRandomInt( 0, 6 ), getRandomInt( 0, 6 ) ).hex );

  x = random( width );
  y = height / 2;
  let vor = d3.voronoi().size( [width, height] );
  esp = vor(
    d3.range( 300 ).map( () => [random( width ), random( height )] )
  ).polygons();
}

export function draw() {
  translate( -width / 2, -height / 2 );
  background( backgroundColor );
  fill( color( 255, 0, 0 ) );
  noStroke();
  directionalLight( 255, 0, 0, width / 2 + x, 50, -20 );
  ambientLight( 50, 30, 30 );
  push();
  translate( x, y, -6 );
  ambientMaterial( 255 );
  sphere( 120 );
  pop();
  x = ( x + 1 ) % width;
  noFill();
  stroke( 0 );
  strokeWeight( 5 );
  esp.map( poly => {
    beginShape();
    poly.map( point => vertex( point[0], point[1] ) );
    endShape( CLOSE );
  } );
}

export function mousePressed() {
  backgroundColor = color( getC( getRandomInt( 0, 6 ), getRandomInt( 0, 6 ) ).hex );
}

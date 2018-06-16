import getC from './pallete';
import { getRandomInt } from './helperFuncs';

// import * as d3 from 'd3';
// import bSpline from 'b-spline';
import 'lodash';

/** @type {vorManagement} */
export function preload() {}
export function setup() {
  _.random( 0, 6 );
  createCanvas( window.innerWidth, window.innerHeight );
  background( getC( getRandomInt( 0, 12 ), getRandomInt( 2, 5 ) ).hex );
}

export function draw() {}

export function mousePressed() {
  console.log( 'click' );
  let fs = fullscreen();
  fullscreen( !fs );
  resizeCanvas();
}

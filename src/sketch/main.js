import getC from './pallete';
import * as fb from 'firebase';
import { getRandomInt } from './helperFuncs';

export function preload() {}

export function setup() {
  createCanvas( window.innerWidth, window.innerHeight );
  background( getC( getRandomInt( 0, 12 ), getRandomInt( 2, 5 ) ).hex );
}

export function draw() {}

export function mousePressed() {}

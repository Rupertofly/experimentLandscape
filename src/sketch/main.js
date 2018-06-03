import getC from './pallete';
import { getRandomInt } from './helperFuncs';
import firebase from '../../node_modules/firebase/index';

export function preload() {}
export function setup() {
  createCanvas( window.innerWidth, window.innerHeight );
  background( getC( getRandomInt( 0, 12 ), getRandomInt( 2, 5 ) ).hex );
  console.log( firebase );
}

export function draw() {}

export function mousePressed() {}

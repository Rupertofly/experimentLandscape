import getC from './pallete';
import { getRandomInt } from './helperFuncs';
import firebase from '../../node_modules/firebase/index';
import vorManagement from './vorManagement';
import add from './test';
import * as d3 from 'd3';
import bSpline from 'b-spline';
/** @type {vorManagement} */
let vm = new vorManagement( {
  width: window.innerWidth,
  height: window.innerHeight,
  fillPC: 200
} );
export function preload() {}
export function setup() {
  createCanvas( window.innerWidth, window.innerHeight );
  background( getC( getRandomInt( 0, 12 ), getRandomInt( 2, 5 ) ).hex );
}

export function draw() {
  vm.fSim.restart();
  vm.fSim.nodes( vm.activePoints );
  vm.fSim.alphaTarget( 0.3 );
  vm.fSim.alpha( 0.6 );
  background( getC( 5, 4 ).hex );
  if ( vm.activePoints.length > 1 ) vm.fSim.tick();
  vm.fillerPoints[vm.fillerPoints.length - 1] = [mouseX + 3, mouseY + 3];
  vm.regenerateMesh();
  vm.relaxLikeLloyd();
  let polygons = vm.outerPolys;
  vm.activeEdgeGroups.map( group => {
    let splinePoints = [...group, ...group.slice( 0, min( 3, group.length ) )];
    fill( 255, 150 );
    noStroke();
    beginShape();
    for ( let t = 0; t < 1; t += 0.02 ) {
      let p = bSpline( t, 3, splinePoints );
      curveVertex( p[0], p[1] );
    }
    endShape( CLOSE );
  } );

  fill( getC( 5, 3 ).hex );
  stroke( getC( 5, 3 ).hex );

  strokeWeight( 5 );
}

export function mousePressed() {
  vm.addActivePoint( mouseX, mouseY, 3, {} );
}

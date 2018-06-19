'use-strict';
import { voronoi, polygonCentroid } from 'd3';
import _ from 'lodash';
import bSpline from 'b-spline';
import getC from './pallete';
// import {
//   recorder,
//   canvasObject,
//   lastFrame,
//   recordFrame,
//   recordSetup
// } from './helperFuncs';

let sites = [];
let canvasExtent;
let vorFunction;
let vorDiagram;

/** @type {vorManagement} */
export function preload() {}
export function setup() {
  createCanvas( window.innerWidth, window.innerHeight );
  canvasExtent = min( width, height );
  let perLineCount = floor( canvasExtent / 30 );
  let pointCount = pow( perLineCount, 2 );
  console.log( 'per line count: ' + perLineCount );
  _.range( pointCount ).map( index => {
    let y = floor( index / perLineCount ) * 30;
    let x = ( index % perLineCount ) * 30;
    y = 30 + y + _.random( -30, 30 );
    x = 30 + x + _.random( -30, 30 );
    let gap = canvasExtent / 8;
    y = map( y, 0, canvasExtent, gap * 7, canvasExtent - gap * 7 );
    x = map( x, 0, canvasExtent, gap * 7, canvasExtent - gap * 7 );

    let siteData = {
      i: index,
      x: x,
      y: y,
      c: getC( _.random( 3, 14 ), _.random( 4, 5 ) ).hex,
      neighbours: [],
      posAsArray: function() {
        return [this.x, this.y];
      }
    };
    sites.push( siteData );
  } );
  sites.resetFunc = function( func, thisArr ) {
    for ( let i = 0; i < thisArr.length; i++ ) {
      thisArr[i].neighbours.length = 0;
    }
    let d = func( thisArr );

    d.links().map( link => {
      link.source.neighbours.push( link.target );
      link.target.neighbours.push( link.source );
    } );
    return d;
  };
  vorFunction = voronoi()
    .size( [canvasExtent, canvasExtent] )
    .x( site => site.x )
    .y( site => site.y );
  vorDiagram = sites.resetFunc( vorFunction, sites );
  // recordSetup();
}
export function draw() {
  background( 255, 30 );
  // translate( -( canvasExtent / 2 ), -( canvasExtent / 2 ) );
  fill( 200, 100, 100 );
  strokeWeight( 2 );
  let pGons = vorDiagram.polygons();
  // pGons.map( poly => {
  // beginShape();
  // fill( poly.data.c );
  // poly.map( point => vertex( point[0], point[1] ) );
  // endShape( CLOSE );
  // } );
  strokeWeight( 3 );
  stroke( getC( 2, 2 ).hex );
  let visited = [];
  let frontier = [];
  let cameFrom = new Array( sites.length ).fill( null );
  let first = vorDiagram.find( canvasExtent / 2, canvasExtent / 2 );
  let crackFunc = ( visitArray, frontierArray ) => {
    if ( frontierArray.length === 0 ) return;

    let node = frontierArray.splice( 0, 1 )[0];
    node.neighbours.map( n => {
      if ( !visited.includes( n ) ) {
        let strokeC = lerpColor(
          color( 255, 0, 0 ),
          color( 255 ),
          visitArray.length / sites.length
        ).toString( '#rrggbb' );
        node.c = strokeC;
        // line( node.x, node.y, n.x, n.y );
        frontierArray.push( n );
        visited.push( n );
        cameFrom[n.i] = node;
      }
    } );
    crackFunc( visitArray, frontierArray );
  };
  frontier.push( first.data );
  visited.push( first.data );
  crackFunc( visited, frontier );
  sites.map( n => {
    let journeyToHere = [];
    journeyToHere.push( n.posAsArray( n ) );
    journeyToHere.push( n.posAsArray( n ) );
    journeyToHere.push( n.posAsArray( n ) );
    journeyToHere.push( n.posAsArray( n ) );
    let lineCalc = ( pre, lineArr, pathArr ) => {
      if ( pre === null ) return;
      if ( pathArr[pre.i] === null ) {
        lineArr.push( pre.posAsArray( n ) );
      } else {
        lineArr.push( pre.posAsArray( n ) );
        let next = pathArr[pre.i];
        // let thisI = pathArr.indexOf( pre );
        // pathArr[thisI] = null;
        lineCalc( next, lineArr, pathArr );
      }
    };
    lineCalc( cameFrom[n.i], journeyToHere, cameFrom );
    journeyToHere.push( journeyToHere[journeyToHere.length - 1] );
    noFill();
    beginShape();
    for ( let i = 0; i < 1; i += 0.001 ) {
      let pt = bSpline( i, 4, journeyToHere );
      curveVertex( pt[0], pt[1] );
    }
    endShape();
  } );

  pGons.map( poly => {
    let c = polygonCentroid( poly );
    poly.data.x = c[0];
    poly.data.y = c[1];
  } );

  vorDiagram = sites.resetFunc( vorFunction, sites );
  // recordFrame();
  filter( BLUR, 1 );
}

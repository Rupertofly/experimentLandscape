import * as d3 from 'd3';
import { hash } from './helperFuncs.js';
/**
 *
 *
 * @export
 * @class VorManagement
 */
export default class VorManagement {
  /**
   *Creates an instance of VorManagement.
   * @param {*} opts
   * @memberof VorManagement
   */
  constructor( opts ) {
    this.updatePolygons = () => {
      this.relaxLikeLloyd();
      this.regenerateMesh();
      return this.outerPolys;
    };
    this.width = opts.width;
    this.height = opts.height;
    this.fillPC = opts.fillPC;
    this.exisDA = opts.exisDA || undefined;
    this.activePoints = [];
    this.boundryPoints = [];
    this.fillerPoints = [];
    this.innerPolys = [];
    this.outerPolys = [];
    this.fSim = d3.forceSimulation( this.activePoints );
    let fc = d3
      .forceManyBody()
      .strength( 500 )
      .distanceMin( 100 );
    this.fSim.force( 'charge', fc );
    let fr = d3
      .forceManyBody()
      .strength( -500 )
      .distanceMax( 120 );
    this.fSim.force( 'repel', fr );
    this.fSim.force( 'forceX', d3.forceX( this.width / 2 ).strength( 0.01 ) );
    this.fSim.stop();
    // Create begining graphs
    this.innerMap = d3.voronoi().size( [this.width, this.height] );
    this.outerMap = this.innerMap.extent( [
      [-50, -50],
      [this.width + 50, this.height + 50]
    ] );
    this.generateRandMesh();
  }
  /** Generates a seed random mesh */
  generateRandMesh() {
    let graph = this;
    this.fillerPoints = d3.range( this.fillPC ).map( () => {
      let point = {
        0: Math.random() * graph.width,
        1: Math.random() * graph.height,
        class: 0,
        filler: true
      };
      return point;
    } );
    this.boundryPoints = this.generateBoundryPoints(
      this.width,
      this.height,
      20
    );
    this.activePoints = [];
    this.regenerateMesh();
  }
  generateBoundryPoints( width, height, offset ) {
    let output = [];
    let xCount = Math.floor( width / offset );
    d3.range( xCount + 2 ).map( i => {
      output.push( {
        0: i / xCount * width,
        1: height + 50,
        class: 1
      } );
    } );
    d3.range( xCount + 2 ).map( i => {
      output.push( {
        0: i / xCount * width,
        1: 0 - 50,
        class: 1
      } );
    } );
    let yCount = Math.floor( height / offset );
    d3.range( yCount + 2 ).map( i => {
      output.push( {
        0: width + 50,
        1: i / yCount * height,
        class: 1
      } );
    } );
    d3.range( yCount + 2 ).map( i => {
      output.push( {
        0: 0 - 50,
        1: i / yCount * height,
        class: 1
      } );
    } );
    return output;
  }
  regenerateMesh() {
    // @ts-ignore
    this.innerMesh = this.innerMap( this.activePoints.concat( this.fillerPoints ) );
    this.outerMesh = this.outerMap(
      // @ts-ignore
      this.activePoints.concat( this.fillerPoints, this.boundryPoints )
    );
    this.innerPolys = this.innerMesh.polygons();
    this.outerPolys = this.outerMesh.polygons();
  }
  relaxLikeLloyd() {
    this.activePoints.map( ( p, i ) => {
      let centroid = d3.polygonCentroid( this.innerPolys[i] );
      p[0] = centroid[0];
      p[1] = centroid[1];
    } );
    this.fillerPoints.map( ( p, i ) => {
      let centroid = d3.polygonCentroid(
        this.innerPolys[i + this.activePoints.length]
      );
      p[0] = centroid[0];
      p[1] = centroid[1];
    } );
  }
  addActivePoint( x, y, cl, dat ) {
    this.activePoints.push( {
      0: x,
      1: y,
      class: cl,
      x: x,
      y: y,
      id: hash( random( 100 ) )
    } );
    this.fSim.nodes( this.activePoints );
    this.fSim.restart();
    this.fSim.alpha( 1 );
  }
}

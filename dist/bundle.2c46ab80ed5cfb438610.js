webpackJsonp([0],[function(n,e,o){"use strict";function r(){console.log(u.default),createCanvas(f,p),l=color(random(255),random(255),random(255)),d=random(f),c=p/2;var n=d3.voronoi().size([f,p]);s=n(d3.range(300).map(function(){return[random(f),random(p)]})).polygons()}function t(){background(l),fill(color(255,0,0)),ellipse(d,c,100,100),d=(d+1)%f,noFill(),strokeWeight(3),s.map(function(n){beginShape(),n.map(function(n){return vertex(n[0],n[1])}),endShape(CLOSE)}),filter(BLUR,2)}function i(){l=color(random(255),random(255),random(255))}Object.defineProperty(e,"__esModule",{value:!0}),e.setup=r,e.draw=t,e.mousePressed=i;var a=o(1),u=function(n){return n&&n.__esModule?n:{default:n}}(a),d=(o(3),void 0),c=void 0,l=void 0,s=void 0,f=window.innerWidth,p=window.innerHeight},,function(n,e,o){"use strict";var r=o(0),t=function(n){if(n&&n.__esModule)return n;var e={};if(null!=n)for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e.default=n,e}(r);!function(n){Object.keys(t).forEach(function(e){n[e]=t[e]})}(window)},function(n,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.crazyNess=function(n){ellipse(30,30,5,5)}}],[2]);
//# sourceMappingURL=bundle.2c46ab80ed5cfb438610.js.map
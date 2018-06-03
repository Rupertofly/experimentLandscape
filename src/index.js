import * as sketchHooks from './sketch/index';
( w =>
  Object.keys( sketchHooks ).forEach( hook => {
    w[hook] = sketchHooks[hook];
  } ) )( window );

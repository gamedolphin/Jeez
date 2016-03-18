var _ = require('lodash');
var Globals = require('./globals.js');
var Game = require('./core/game.js');
var THREE = require("expose?THREE!three");

/**
 * Main Jeez constructor
 * @param {state, camera, container, width, height} options
 * @returns {Jeez.Game}
 */
var Jeez = function(options){
  this.game = new Game(options);
  return this.game;
};

/**
 * Set all the global static params on the Jeez global
 */
_.forEach(Globals, function(gl, key) {
  Jeez[key] = gl;
});

/**
 * THREE is exposed as a global by webpack anyway, kept for legacy reasons
 */
Jeez.THREE = THREE;

module.exports = Jeez;

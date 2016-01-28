var Globals = require('./globals.js');
var Game = require('./core/game.js');
var THREE = require("expose?THREE!three");

var Jeez = function(options){
  this.game = new Game(options);

  return this.game;
};

Jeez.Globals = Globals;
Jeez.THREE = THREE;

module.exports = Jeez;

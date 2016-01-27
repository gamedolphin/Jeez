var Globals = require('./globals.js');
var Game = require('./core/game.js');

var Jeez = function(options){
  this.game = new Game(options);

  return this.game;
};

Jeez.Globals = Globals;

module.exports = Jeez;

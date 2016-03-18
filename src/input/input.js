var Vector2 = require('three').Vector2;
var Signal = require('../core/signal.js');

var Keyboard = require('./keyboard.js');

var Input = function(game) {
  this.game = game;

  this.moveCallbacks = [];

  this.pollRate = 0; // frequency per update for checking

  this.enabled = true;

  this.keyboard = null;
};

Input.prototype = {
  init: function() {
    this.keyboard = new Keyboard(this.game);


    this.keyboard.init();
  },

  update: function() {
    this.keyboard.update();
  },

  destroy: function() {

    this.keyboard.destroy();
  },

  reset: function(hard) {
    this.keyboard.reset(hard);
  }
};

Input.prototype.constructor = Input;

module.exports = Input;

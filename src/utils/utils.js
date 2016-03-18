var Interval = require('./intervals.js');

var Utils = function(game) {
  this.game = game;

  this.interval = new Interval(this.game);
};

Utils.prototype = {
  init: function() {

  }
};

Utils.prototype.constructor = Utils;

module.exports = Utils;

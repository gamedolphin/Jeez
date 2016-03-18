var Interval = function(game) {
  this.game = game;
};

Interval.prototype = {
  setTimeout: function(fn, t, context) {
    var f = fn || function() {};
    var c = context || this.game;
    var time = 0;
    if(t) {
      time = t;
    }
    setTimeout(f.bind(c), time);
  },

  setInterval: function(fn, t, context) {
    var f = fn || function() {};
    var c = context || this.game;
    var time = 0;
    if(t) {
      time = t;
    }

    setInterval(f.bind(c), time);
  }
};


Interval.prototype.constructor = Interval;

module.exports = Interval;

var RAF = function(game) {
  this.game = game;

  var vendors = [
    'ms',
    'moz',
    'webkit',
    'o'
  ];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
  }

  this.isRunning = false;
  this._isSetTimeOut = false;
  this._onLoop = null;
  this._timeOutID = null;
};

RAF.prototype = {
  init: function() {},

  start: function() {
    this.isRunning = true;
    var self = this;

    if (!window.requestAnimationFrame)
    {
      // this._isSetTimeOut = true;

      // this._onLoop = function () {
      //   return self.updateSetTimeout();
      // };

      // this._timeOutID = window.setTimeout(this._onLoop, 0);
    }
    else
    {
      this._isSetTimeOut = false;

      this._onLoop = function (time) {
        return self.updateRAF(time);
      };

      this._timeOutID = window.requestAnimationFrame(this._onLoop);
    }
  },

  updateRAF: function (rafTime) {

    // floor the rafTime to make it equivalent to the Date.now() provided by updateSetTimeout (just below)
    this.game.update(Math.floor(rafTime));

    this._timeOutID = window.requestAnimationFrame(this._onLoop);
  },

  updateSetTimeout: function () {

    this.game.update(Date.now());

    this._timeOutID = window.setTimeout(this._onLoop, this.game.timer.timeToCall);
  },


  stop: function () {

    if (this._isSetTimeOut)
    {
      clearTimeout(this._timeOutID);
    }
    else
    {
      window.cancelAnimationFrame(this._timeOutID);
    }

    this.isRunning = false;

  }
};

module.exports = RAF;

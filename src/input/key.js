var Signal = require('../core/signal.js');

var Key = function(game, keycode) {
  this.game = game;
  this._enabled = true;
  this.event = null;

  this.isDown = false;
  this.isUp = true;

  this.altKey = false;
  this.ctrlKey = false;
  this.shiftKey = false;

  this.timeDown = 0;

  this.duration = 0;

  this.timeUp = -2500;

  this.repeats = 0;

  this.keyCode = keycode;

  this.onUp = new Signal();
  this.onDown = new Signal();

  this._justDown = false;
  this._justUp = false;

};

Key.prototype = {
  update: function() {
    if(!this._enabled) {
      return;
    }

    if(this.isDown) {
      this.duration = this.game.timer.time - this.timeDown;
      this.repeats += 1;
    }
  },

  processKeyDown: function(event) {
    if(!this._enabled) {
      return;
    }

    this.event = event;
    if(this.isDown) {
      return;
    }

    this.altKey = event.altKey;
    this.ctrlKey = event.ctrlKey;
    this.shiftKey = event.shiftKey;

    this.isDown = true;
    this.isUp = false;
    this.timeDown = this.game.timer.time;
    this.duration = 0;
    this.repeats = 0;

    this.onDown.dispatch(this);
  },

  processKeyUp: function(event) {
    if(!this._enabled) return;

    this.event = event;

    if(this.isUp) {

      return;
    }

    this.isDown = false;
    this.isup = true;
    this.timeUp = this.game.timer.time;
    this.duration = this.game.timer.time - this.timeDown;

    this.onUp.dispatch(this);

  },

  reset: function(hard) {
    if(hard === undefined) {
      hard = true;
    }

    this.isDown = false;
    this.isUp = true;
    this.timeUp = this.game.timer.time;
    this.duration = 0;
    this._enabled = true;

    if(hard) {
      this.onDown.removeAll();
      this.onUp.removeAll();
    }
  }
};

Object.defineProperty(Key, 'enabled', {
  get: function() {
    return this._enabled;
  },

  set: function() {
    value = !!value;

    if(value !== this._enabled) {
      if(!value) {
        this.reset(false);
      }

      this._enabled = value;
    }
  }
});

Key.prototype.constructor = Key;

module.exports = Key;

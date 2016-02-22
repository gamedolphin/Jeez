var THREE = require('three');

var Timer = function(game) {
  THREE.Clock.call(this);
  this.game = game;

  this.elapsed = 0;
  this.elapsedMS = 0;

  this.physicsElapsed = 1/60;
  this.physicsElapsedMS = (1/60)*1000;

  this.desiredFpsMult = 1.0 / 60;

  this._desiredFps = 60;
  this.fps = 60;
  this.timeToCall = 0;
  this.timeExpected = 0;
};

Timer.prototype = Object.create(THREE.Clock.prototype);

Timer.prototype.init = function() {
  this.start();
  this.timeExpected = this.startTime;
};

Timer.prototype.update = function(time) {
  this.elapsed = this.getDelta();
  this.elapsedMS = this.elapsed * 1000;

  if (this.game.raf._isSetTimeOut)
  {
    // time to call this function again in ms in case we're using timers instead of RequestAnimationFrame to update the game
    this.timeToCall = Math.floor(Math.max(0, (1000.0 / this._desiredFps) - (this.timeExpected - time)));

    // time when the next call is expected if using timers
    this.timeExpected = time + this.timeToCall;
  }
};

Object.defineProperty(Timer.prototype, "desiredFps", {

  get: function () {

    return this._desiredFps;

  },

  set: function (value) {

    this._desiredFps = value;
    //  because we're using fixed time steps in game.update
    this.physicsElapsed = 1 / value;
    this.physicsElapsedMS = this.physicsElapsed * 1000;
    this.desiredFpsMult = 1.0 / value;
  }
});

Object.defineProperty(Timer.prototype, "time", {

  get: function () {
    return this.getElapsedTime();
  }
});

Timer.prototype.constructor = Timer;

module.exports = Timer;

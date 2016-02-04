var Vector2 = require('three').Vector2;

var resized = false;

var ScaleManager = function(game, width, height) {
  this.game = game;
  this.dom = this.game.dom;
  this.camera = this.game.camera;
  this.renderer = this.game.renderer;
  this.timer = this.game.timer;

  this.scaleFactor = new Vector2(1,1);

  this.timeBetweenUpdate = 0.5;
  this.currentTime = 0;

  this.booted = false;
};

ScaleManager.EXACT_FIT = 0;
ScaleManager.NO_SCALE = 1;
ScaleManager.SHOW_ALL = 2;

ScaleManager.prototype = {
  init: function () {
    var self = this;
    this.currentTime = this.timer.getElapsedTime();

    window.addEventListener('resize', this._windowResize.bind(this), false);
    this.booted = true;
  },

  _windowResize: function() {
    resized = true;
  },

  preUpdate: function() {
    if(resized && this.timer.getElapsedTime() > this.currentTime) {
      console.log("HERE");
      var width = this.dom.domElement.offsetWidth;
      var height = this.dom.domElement.offsetHeight;

      this.renderer.setSize(width, height);
      this.camera.setAspect(width/height);
      this.camera.updateProjectionMatrix();


      this.currentTime = this.timer.getElapsedTime() + this.timeBetweenUpdate;
      resized = false;
    }
  }
};

module.exports = ScaleManager;

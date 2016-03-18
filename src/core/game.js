require('./extendThreeObject.js');

var Globals = require('../globals.js');
var Logger = require('../debug/logger.js');
var Info = require('../info.js');
var Renderer = require('./renderer.js');
var DOM = require('./dom.js');
var ScaleManager = require('./scalemanager.js');
var World = require('./world.js');
var Stage = require('./stage.js');
var Timer = require('./timer.js');
var Camera = require('./camera.js');
var Lights = require('./lights.js');
var Input = require('../input/input.js');
var StateManager = require('./statemanager.js');
var Utils = require('../utils/utils.js');

var Loader = require('../loader/loader.js');
var Cache = require('../loader/loaderCache.js');
var RAF = require('./raf.js');

var Game = function(options) {

  this._kickstart = true;
  this._spiraling = 0;
  this._deltaTime = 0;
  this._lastCount = 0;
  this.forceSingleUpdate = false;
  this.updatesThisFrame = 0;
  this.isBooted = false;

  this.options = options || {};

  this.state = new StateManager(this, options.state);

  this.boot();
};

Game.prototype.boot = function() {
  this.renderer = new Renderer(this);
  this.dom = new DOM(this);
  this.world = new World(this);
  this.stage = new Stage(this);
  this.timer = new Timer(this);
  this.camera = new Camera(this);
  this.lights = new Lights(this);
  this.raf = new RAF(this);
  this.load = new Loader(this);
  this.assets = new Cache(this);
  this.utils = new Utils(this);
  this.scaleManager = new ScaleManager(this);
  this.input = new Input(this);


  this.renderer.init();
  this.dom.init();
  this.world.init();
  this.stage.init();
  this.timer.init();
  this.camera.init();
  this.lights.init();
  this.input.init();
  this.utils.init();
  this.state.init();
  this.raf.init();
  this.scaleManager.init();

  this.showDebugHeader();

  this.raf.start();

  this.isBooted = true;
};

Game.prototype.showDebugHeader = function() {
  var version = Info.VERSION;
  var canvas = this.renderer.renderType === Globals.RENDERTYPE.CANVAS ?
        'Canvas' : 'WEBGL';
  Logger.log("Jeez! Version : "+version+" running on "+canvas);

};

Game.prototype.update = function(time) {
  this.timer.update(time);
  if (this._kickstart) {
    this._kickstart = false;
    this.updateLogic(this.timer.desiredFpsMult);
    this.stage.updateTransform();
    this.updateRender(this.timer.desiredFps);
    return;
  }

  if(this._spiraling > 1 && !this.forceSingleUpdate) {
    this._deltaTime = 0;
    this._spiraling = 0;
    this.updateRender(this.timer.desiredFps);
  }
  else {
    var slowStep = 1000 / this.timer.desiredFps;
    this._deltaTime += Math.max(Math.min(slowStep * 3, this.timer.elapsedMS), 0);

    var count = 0;
    this.updatesThisFrame = Math.floor(this._deltaTime/slowStep);
    if(this.forceSingleUpdate)  {
      this.updatesThisFrame = Math.min(1, this.updatesThisFrame);
    }

    while(this._deltaTime >= slowStep) {
      this._deltaTime -= slowStep;
      this.updateLogic(this.timer.desiredFpsMult);
      this.stage.updateTransform();
      count += 1;

      if(this.forceSingleUpdate && count === 1) {
        break;
      }
    }

    if (count > this._lastCount)
    {
      this._spiraling += 1;
    }
    else if (count < this._lastCount)
    {
      this._spiraling = 0;
    }

    this._lastCount = count;

    this.updateRender(this._deltaTime / slowStep);
  }
};

Game.prototype.updateLogic = function(dt) {

  this.scaleManager.preUpdate();
  this.state.preUpdate();
  this.camera.preUpdate();
  this.stage.preUpdate();

  this.state.update(dt);
  this.stage.update(dt);
  this.input.update();

  this.stage.postUpdate();
};

Game.prototype.updateRender = function(elapsedTime) {

  this.renderer.render(this.stage, this.camera);
};

module.exports = Game;

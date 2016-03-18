var State = require('./state.js');

var StateManager = function(game, pendingState) {
  this.game = game;

  this._pendingState = null;
  this._clearWorld = false;
  this._clearCache = false;
  this._created = false;

  if(typeof pendingState !== 'undefined' && pendingState !== null) {
    this._pendingState = pendingState;
  }

  this.dummy = function() {};

  this.onInitCallback = this.dummy;
  this.onPreloadCallback = null;
  this.onCreateCallback = null;
  this.onPreUpdateCallback = null;
  this.onUpdateCallback = null;
  this.onPostUpdateCallback = null;
  this.onShutdownCallback = this.dummy;

  this.callbackContext = this;

  this.current = '';

  this.states = {};
};

StateManager.prototype = {
  init: function() {
    if (this._pendingState !== null && typeof this._pendingState !== 'string')
    {
      this.add('default', this._pendingState, true);
    }
  },

  add: function(key, state, autoStart) {

    if(autoStart === undefined) {
      autoStart = false;
    }

    var newState;

    if (state instanceof State)
    {
      newState = state;
    }
    else if (typeof state === 'object')
    {
      newState = state;
      newState.game = this.game;
    }
    else if (typeof state === 'function')
    {
      newState = new state(this.game);
    }

    this.states[key] = newState;

    if (autoStart)
    {
      if (this.game.isBooted)
      {
        this.start(key);
      }
      else
      {
        this._pendingState = key;
      }
    }

    return newState;
  },

  start: function (key, clearWorld, clearCache) {

    if (clearWorld === undefined) { clearWorld = true; }
    if (clearCache === undefined) { clearCache = false; }

    if (this.checkState(key))
    {
      //  Place the state in the queue. It will be started the next time the game loop begins.
      this._pendingState = key;
      this._clearWorld = clearWorld;
      this._clearCache = clearCache;
    }
  },

  checkState: function (key) {

    if (this.states[key])
    {
      var valid = false;

      if (this.states[key]['preload'] || this.states[key]['create'] || this.states[key]['update'] || this.states[key]['render'])
      {
        valid = true;
      }

      if (valid === false)
      {
        console.warn("Invalid Jeez State object given. Must contain at least a one of the required functions: preload, create, update or render");
        return false;
      }

      return true;
    }
    else
    {
      console.warn("Jeez.StateManager - No state found with the key: " + key);
      return false;
    }

  },

  preUpdate: function() {
    if(this._pendingState && this.game.isBooted) {
      var previousKey = this.current;

      this.clearCurrentState();
      this.setCurrentState(this._pendingState);

      if(this.current !== this._pendingState) {
        return;
      }
      else {
        this._pendingState = null;
      }


      if(this.onPreloadCallback) {
        this.game.load.reset();
        this.onPreloadCallback.call(this.callbackContext, this.game);

        if(this.game.load.getQueueLength() === 0) {
          this.loadComplete();
        }
        else {
          this.game.load.start(true);
        }
      }
      else {
        this.loadComplete();
      }
    }
  },

  loadComplete: function() {
    if (this._created === false && this.onCreateCallback)
    {
      this._created = true;
      this.onCreateCallback.call(this.callbackContext, this.game);
    }
    else
    {
      this._created = true;
    }
  },

  update: function(dt) {
    if (this._created)
    {
      if (this.onUpdateCallback)
      {
        this.onUpdateCallback.call(this.callbackContext, dt, this.game);
      }
    }
  },

  setCurrentState: function(key) {
    this.callbackContext = this.states[key];
    this.link(key);

    this.onInitCallback = this.states[key]['init'] || this.dummy;
    this.onPreloadCallback = this.states[key]['preload'] || null;
    this.onCreateCallback = this.states[key]['create'] || null;
    this.onPreUpdateCallback = this.states[key]['preUpdate'] || null;
    this.onUpdateCallback = this.states[key]['update'] || null;
    this.onPostUpdateCallback = this.states[key]['postUpdate'] || null;
    this.onShutdownCallback = this.states[key]['shutdown'] || this.dummy;

    this.current = key;
    this._created = false;

    this.onInitCallback.apply(this.callbackContext);
    this.game._kickstart = true;
  },

  clearCurrentState: function() {
    if(this.current) {
      if(this.onShutdownCallback) {
        this.onShutdownCallback.call(this.callbackContext, this.game);
      }

      this.game.camera.reset();
      if(this._clearWorld) {
        this.game.world.shutdown();
        this.game.input.reset(true);
        this.game.lights.removeAllLights();
        if(this._clearCache) {
          // TODO: put clear cache here when cache implemented
        }
      }
    }
  },

  link: function(key) {
    this.states[key].game = this.game;
    this.states[key].camera = this.game.camera;
    this.states[key].assets = this.game.assets;
    this.states[key].state = this;
    this.states[key].stage = this.game.stage;
    this.states[key].world = this.game.world;
    this.states[key].timer = this.game.timer;
    this.states[key].lights = this.game.lights;
    this.states[key].loader = this.game.load;
    this.states[key].utils = this.game.utils;

    this.states[key].key = key;
  },

  unlink: function(key) {
    if(this.states[key]) {
      this.states[key].game = null;
      this.states[key].camera = null;
      this.states[key].assets = null;
      this.states[key].state = null;
      this.states[key].stage = null;
      this.states[key].world = null;
      this.states[key].timer = null;
      this.states[key].lights = null;
      this.states[key].loader = null;
      this.states[key].utils = null;

      this.states[key].key = null;
    }
  }

};

StateManager.prototype.constructor = StateManager;

module.exports = StateManager;

var _ = require('lodash');

var KeyCode = require('../globals.js').KeyCode;
var Key = require('./key.js');

var Keyboard = function(game) {
  this.game = game;
  this.enabled = true;

  this.event = null;
  this.pressEvent = null;
  this._keys = [];

  this._onKeyDown = null;
  this._onKeyUp = null;
  this._onKeyPress = null;

  this._capture = [];

};

Keyboard.prototype = {
  init: function() {
    var self = this;

    this._onKeyDown = function(event) {
      return self.processKeyDown(event);
    };

    this._onKeyUp = function(event) {
      return self.processKeyUp(event);
    };

    this._onKeyPress = function(event) {
      return self.processKeyPress(event);
    };

    window.addEventListener('keydown', this._onKeyDown, false);
    window.addEventListener('keyup', this._onKeyUp, false);
    window.addEventListener('keypress', this._onKeyPress, false);

    this.o = 0;
  },

  addKey: function(keycode) {
    if(!this._keys[keycode]) {
      this._keys[keycode] = new Key(this.game, keycode);
      this.addKeyCapture(keycode);
    }

    return this._keys[keycode];
  },

  addKeys: function (keys) {

    var output = {};

    for (var key in keys)
    {
      output[key] = this.addKey(keys[key]);
    }

    return output;

  },

  removeKey: function (keycode) {

    if (this._keys[keycode])
    {
      this._keys[keycode] = null;

      this.removeKeyCapture(keycode);
    }

  },

  createCursorKeys: function () {

    return this.addKeys({ 'up': KeyCode.UP, 'down': KeyCode.DOWN, 'left': KeyCode.LEFT, 'right': KeyCode.RIGHT });

  },

  update: function() {
    _.forEach(this._keys, function(k) {
      if(k) {
        k.update();
      }
    });
  },

  reset: function(hard) {
    if(hard === undefined) {
      hard = true;
    }

    this.event = null;

    _.forEach(this._keys, function(key) {
      if(key)
        key.reset(hard);
    });

    if(hard)
      this._keys.length = 0;

  },

  stop: function() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('keypress', this._onKeyPress);

    this._onKeyDown = null;
    this._onKeyUp = null;
    this._onKeyPress = null;
  },

  destroy: function() {
    this.stop();
    this.clearCapture();
    this._keys.length = 0;
  },

  addKeyCapture: function(keycode) {
    var self = this;
    if(typeof keycode === 'object') {
      _.forEach(keycode, function(kc) {
        self._capture[kc] = true;
      });
    }
    else {
      this._capture[keycode] = true;
    }
  },

  removeKeyCapture: function(keycode) {
    delete this._capture[keycode];
  },

  clearCapture: function() {
    this._capture = [];
  },

  processKeyUp: function(event) {
    this.event = event;
    if(!this.game.input.enabled || !this.enabled) {
      return;
    }

    if (this._capture[event.keyCode])
    {
      event.preventDefault();
    }

    if (!this._keys[event.keyCode])
    {
      this._keys[event.keyCode] = new Key(this.game, event.keyCode);
    }

    this._keys[event.keyCode].processKeyUp(event);
  },

  processKeyDown: function(event) {
    this.event = event;

    if(!this.game.input.enabled || !this.enabled) {
      return;
    }

    if(this._capture[event.keyCode]) {
      event.preventDefault();
    }

    if(!this._keys[event.keyCode]) {
      this._keys[event.keyCode] = new Key(this.game, event.keyCode);
    }
    this._keys[event.keyCode].processKeyDown(event);

  },

  processKeyPress: function(event) {
    this.pressEvent = event;
    if(!this.game.input.enabled || !this.enabled) {
      return;
    }

  }
};

Keyboard.prototype.constructor = Keyboard;

module.exports = Keyboard;

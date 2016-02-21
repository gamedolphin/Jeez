/**
 * @fileOverview Taken from Phaser.Signal and JS-Signals
 * @name signal.js
 */


var _ = require('lodash');
var SignalBinding = require('./signalbinding.js');

var Signal = function() {};

Signal.prototype = {

  _bindings: null,

  _prevParams: null,

  memorize: false,

  _shouldPropagate: true,

  active: true,

  _boundDispatch: true,

  validateListener: function(func) {
    if(!_.isFunction(func)) {
      throw new Error("Listener needs to be a function.");
    }
  },

  _registerListener: function(listener, isOnce, context, priority) {
    var prevIndex = this._indexOfListener(listener, context);
    var binding;

    if(prevIndex !== -1) {
      binding = this._bindings[prevIndex];

      if(binding.isOnce() !== isOnce) {
        throw new Error ("Cannot add same doOnce function.");
      }
    }
    else {
      binding = new SignalBinding(this, listener, isOnce, context, priority);

      this._addBinding(binding);
    }

    if(this.memorize && this._prevParams) {
      binding.execute(this._prevParams);
    }

    return binding;
  },

  _addBinding: function(binding) {
    if(!this._bindings) {
      this._bindings = [];
    }

    var n = this._bindings.length;

    do {
      n--;
    }
    while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);

    this._bindings.splice(n + 1, 0, binding);
  },

  _indexOfListener: function(listener, context) {
    if(!this._bindings) {
      return -1;
    }

    if (context === undefined) {
      context = null;
    }

    return _.findIndex(this._bindings, function(b) {
      return b._listener === listener && b.context === context;
    });
  },

  has: function(listener, context) {
    return this._indexOfListener(listener, context) !== -1;
  },

  add: function(listener, context, priority) {
    this.validateListener(listener);

    return this._registerListener(listener, false, context, priority);
  },

  addOnce: function(listener, context, priority) {
    this.validateListener(listener);
    return this._registerListener(listener, true, context, priority);
  },

  remove: function(listener, context) {
    this.validateListener(listener);

    var i = this._indexOfListener(listener, context);

    if (i !== -1)
    {
      this._bindings[i]._destroy();
      this._bindings.splice(i, 1);
    }

    return listener;
  },

  removeAll: function (context) {

    if (context === undefined) { context = null; }

    if (!this._bindings)
    {
      return;
    }

    var n = this._bindings.length;

    while (n--)
    {
      if (context)
      {
        if (this._bindings[n].context === context)
        {
          this._bindings[n]._destroy();
          this._bindings.splice(n, 1);
        }
      }
      else
      {
        this._bindings[n]._destroy();
      }
    }

    if (!context)
    {
      this._bindings.length = 0;
    }

  },

  getNumListeners: function () {

    return this._bindings ? this._bindings.length : 0;

  },

  halt: function () {

    this._shouldPropagate = false;

  },

  dispatch: function () {
    if (!this.active || !this._bindings)
    {
      return;
    }

    var paramsArr = Array.prototype.slice.call(arguments);
    var n = this._bindings.length;
    var bindings;

    if (this.memorize)
    {
      this._prevParams = paramsArr;
    }

    if (!n)
    {
      //  Should come after memorize
      return;
    }

    bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
    this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

    //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
    //reverse loop since listeners with higher priority will be added at the end of the list
    do {
      n--;
    }
    while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);

  },

  forget: function() {

    if (this._prevParams)
    {
      this._prevParams = null;
    }

  },

  dispose: function () {

    this.removeAll();

    this._bindings = null;
    if (this._prevParams)
    {
      this._prevParams = null;
    }

  },

  toString: function () {

    return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';

  }
};

Signal.prototype.constructor = Signal;

module.exports = Signal;

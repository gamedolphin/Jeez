var _ = require('lodash');

var SignalBinding = function (signal, listener, isOnce, listenerContext, priority) {

  this._listener = listener;
  this._isOnce = !!isOnce;

  this._signal = signal;

  if(priority) {
    this._priority = priority;
  }

  if(listenerContext) {
    this.context = listenerContext;
  }
};

SignalBinding.prototype = {

  context: null,
  _isOnce: false,
  _priority: 0,
  callCount: 0,
  active: true,
  params: null,

  execute: function(pms) {

    var handlerReturn, params;
    if(this.active && !!this._listener) {
      params = this.params ? this.params.concat(pms) : pms;
      handlerReturn = this._listener.apply(this.context, params);

      this.callCount += 1;

      if(this._isOnce) {
        this.detach();
      }
    }

    return handlerReturn;
  },

  detach: function() {
    return this.isBound() ? this._signal.remove(this._listener,this.context) : null;
  },

  isBound: function() {
    return (!!this._signal && !!this._listener);
  },

  isOnce: function() {
    return this._isOnce;
  },

  getListener: function() {
    return this._listener;
  },

  getSignal: function() {
    return this._signal;
  },

  _destroy: function() {
    delete this._signal;
    delete this._listener;
    delete this.context;
  },


  toString: function () {
    return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
  }

};

SignalBinding.prototype.constructor = SignalBinding;

module.exports = SignalBinding;

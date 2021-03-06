var _ = require('lodash');
var Logger = require('../debug/logger.js');

var Cache = function(game) {
  this.game = game;
  this.cacheList = {};
};


Cache.prototype = {
  clear: function() {
    this.cacheList = {};
  },

  addObject: function(key, obj) {
    this.cacheList[key] = obj;
  },

  getObject: function(key) {
    var obj = this.cacheList[key];
    if(obj) {
      return obj;
    }
    else {
      Logger.warn("Object with key "+key+" not found.");
      return null;
    }
  }
};

module.exports = Cache;

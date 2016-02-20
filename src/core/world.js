var THREE = require('three');
var Globals = require('../globals.js');

var World = function(game) {
  THREE.Object3D.call(this);
  this.game = game;
  this.name = 'World';
};

World.prototype = Object.create(THREE.Object3D.prototype);

World.prototype.init = function() {};

World.prototype.shutdown = function() {
  var length = this.children.length;
  for(var i = 0; i < length; i++) {
    this.remove(this.children[i]);
  }
};


World.prototype.constructor = World;

module.exports = World;

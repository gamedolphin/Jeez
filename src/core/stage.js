var THREE = require('three');

var Stage = function(game) {
  THREE.Scene.call(this);

  this.game = game;
};

Stage.prototype = Object.create(THREE.Scene.prototype);

Stage.prototype.init = function() {
  this.add(this.game.world);
  this.add(this.game.camera);
};

Stage.prototype.preUpdate = function() {
  var length = this.children.length;
  for(var i = 0; i < length; i++) {
    this.children[i]._preUpdate();
  }
};

Stage.prototype.postUpdate = function() {
  var length = this.children.length;
  for(var i = 0; i < length; i++) {
    this.children[i]._postUpdate();
  }
};

Stage.prototype.update = function(dt) {
  var length = this.children.length;
  for(var i = 0; i < length; i++) {
    this.children[i]._update(dt);
  }
};

Stage.prototype.constructor = Stage;

module.exports = Stage;

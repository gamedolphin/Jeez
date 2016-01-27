var THREE = require('three');
var _ = require('lodash');

THREE.Object3D.prototype.updateTransform = function() {
  _.each(this.children, function(child) {
    child.updateTransform();
  });
};

THREE.Object3D.prototype.preUpdate = function() {};
THREE.Object3D.prototype.postUpdate = function() {};

THREE.Object3D.prototype.update = function() {};

THREE.Object3D.prototype._update = function(dt) {
  if(this.shouldUpdate) {
    this.update(dt);
  }

  _.each(this.children, function(child) {
    child._update(dt);
  });
};

THREE.Object3D.prototype._preUpdate = function() {
  if(this.shouldUpdate) {
    this.preUpdate();
  }
  _.each(this.children, function(child) {
    child._preUpdate();
  });
};

THREE.Object3D.prototype._postUpdate = function() {
  if(this.shouldUpdate) {
    this.postUpdate();
  }
  _.each(this.children, function(child) {
    child._postUpdate();
  });
};

THREE.Object3D.prototype.shouldUpdate = false;

THREE.Object3D.prototype.scheduleUpdate = function() {
  this.shouldUpdate = true;
};

THREE.Object3D.prototype.unscheduleUpdate = function() {
  this.shouldUpdate = false;
};

module.exports = {};

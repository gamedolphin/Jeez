var THREE = require('three');
var _ = require('lodash');

/**
 * update the transform for all children
 */
THREE.Object3D.prototype.updateTransform = function() {
  _.forEach(this.children, function(child) {
    child.updateTransform();
  });
};

/**
 * Default update functions for all THREE objects
 */
THREE.Object3D.prototype.preUpdate = function() {};
THREE.Object3D.prototype.update = function() {};
THREE.Object3D.prototype.postUpdate = function() {};


/**
 * Internal update called by the stage
 * @param {} dt
 */
THREE.Object3D.prototype._update = function(dt) {
  if(this.shouldUpdate) { // trigger only if update scheduled
    this.update(dt);
  }

  _.forEach(this.children, function(child) {
    child._update(dt);
  });
};

THREE.Object3D.prototype._preUpdate = function() {
  if(this.shouldUpdate) {
    this.preUpdate();
  }
  _.forEach(this.children, function(child) {
    child._preUpdate();
  });
};

THREE.Object3D.prototype._postUpdate = function() {
  if(this.shouldUpdate) {
    this.postUpdate();
  }
  _.forEach(this.children, function(child) {
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

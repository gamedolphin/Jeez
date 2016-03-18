var THREE = require('three');
var _ = require('lodash');

var LightTypes = require('../globals.js').LIGHTS;

var getAmbientLight = function(config) {
  var light = new THREE.AmbientLight(config.color);
  return light;
};

var getDirectionalLight = function(config) {
  var light = new THREE.DirectionalLight(config.color, config.intensity);
  return light;
};

var getHemisphericalLight = function(config) {
  var light = new THREE.HemisphereLight(config.color, config.groundColor, config.intensity);
  return light;
};

var getPointLight = function(config) {
  var light = new THREE.PointLight(config.color, config.intensity, config.distance, config.decay);
  return light;
};

var getSpotLight = function(config) {
  var light = new THREE.SpotLight(config.color, config.intensity, config.distance, config.angle, config.exponent, config.decay);
  return light;
};

var getLightOfType = function(type, config) {
  var light = null;
  switch(type) {
  case LightTypes.Ambient:
    light = getAmbientLight(config);
    break;
  case LightTypes.Directional:
    light =  getDirectionalLight(config);
    break;
  case LightTypes.Hemisphere:
    light = getHemisphericalLight(config);
    break;
  case LightTypes.Point:
    light = getPointLight(config);
    break;
  case LightTypes.Spot:
    light =  getSpotLight(config);
  default:
    return null;
  }

  if(config.position) {
    light.position.set(config.position.x, config.position.y,config.position.z);
  }

  return light;
};

var Lights = function(game) {
  this.game = game;
  this._list = {};
};

Lights.prototype.init = function() {};

Lights.prototype.addLight = function (id, type, config) {
  var light = getLightOfType(type, config);
  if(!light) {
    console.warn("Light not created");
    return null;
  }
  this._list[id] = light;
  this.game.stage.add(light);
  return id;
};

Lights.prototype.removeLight = function(id) {
  var light = this._list[id];
  if(light) {
    this.game.stage.remove(light);
    this._list[id] = null;
  }
};

Lights.prototype.removeAllLights = function() {
  _.forEach(this._list, function(light) {
    this.game.stage.remove(light);
  });

  this._list = {};
};

module.exports = Lights;

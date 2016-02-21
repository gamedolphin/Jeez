var THREE = require('three');
var Globals = require('../globals.js');

var webGLAvailable = function () {
	try {
		var canvas = document.createElement( 'canvas' );
		return !!( window.WebGLRenderingContext && (
			canvas.getContext( 'webgl' ) ||
				canvas.getContext( 'experimental-webgl' ) )
			       );
	} catch ( e ) {
		return false;
	}
};

var Renderer = function(game) {

  this.renderType = Globals.RENDERTYPE.CANVAS;

  if ( webGLAvailable() ) {
    this.renderType = Globals.RENDERTYPE.WEBGL;
	  THREE.WebGLRenderer.call(this);
  } else {
	  THREE.CanvasRenderer.call(this);
  }
  this.game = game;
};

Renderer.prototype = Object.create(webGLAvailable() ? THREE.WebGLRenderer.prototype : THREE.CanvasRenderer.prototype);

Renderer.prototype.init = function() {

};

Renderer.prototype.constructor = Renderer;

module.exports = Renderer;

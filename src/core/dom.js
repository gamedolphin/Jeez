var DOM = function(game) {
  this.game = game;
  this.domElement = null;
};

DOM.prototype = {
  init: function() {
    var container = this.game.options.container || 'game';
    var height = this.game.options.height;
    var width = this.game.options.width;
    var renderer = this.game.renderer;

    this.domElement = document.getElementById(container);

    if(!this.domElement) {
      var domE = document.createElement("div");
      domE.style.height = '800px';
      domE.style.width = '600px';
      this.domElement = domE;
      document.body.appendChild(this.domElement);
    }

    var rendererWidth = width || this.domElement.offsetWidth;
    var rendererHeight = height || this.domElement.offsetHeight;

    renderer.setSize(rendererWidth, rendererHeight);
    this.domElement.appendChild(renderer.domElement);
  }
};

module.exports = DOM;

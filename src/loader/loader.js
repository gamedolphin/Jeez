var FILETYPES = require('../globals.js').FILETYPES;
var THREE = require('three');
var _ = require('lodash');

var Loader = function(game) {
  this.game = game;

  this._queue = [];

  this.totalFiles = 0;
  this.downloadedFiles = 0;

  this.isLoading = false;
  this.hasItems = true;
};

Loader.prototype = {

  getQueueLength: function() {
    return this._queue.length;
  },

  reset: function() {
    this._queue = [];
    this.totalFiles = 0;
    this.downloadedFiles = 0;
    this.isLoading = false;
  },

  addLoadManifest: function(manifest) {
    var self = this;

    _.forEach(manifest, function(obj, key) {
      var url = "";
      var type = obj.type || FILETYPES.Texture;
      if(_.isString(obj)) {
        url = obj;
      }
      else {
        url = obj.url;
      }
      if(!url) {
        return;
      }
      self.addFileToQueue(type, key, url);
    });
  },

  addFileToQueue: function(type, key, url) {
    if(this.isAlreadyQueued(url)) {
      console.warn("Already loading "+url);
      return;
    }
    this._queue.push({
      type: type,
      key: key,
      url: url
    });
  },

  isAlreadyQueued: function(url) {
    var index = _.findIndex(this._queue, function(o) {
      return o.url === url;
    });

    return index > -1;
  },

  processQueue: function() {

    if(this._queue.length === 0) {
      this.done();
      return;
    }

    for(var i = 0; i < this._queue.length; i++) {
      this.processItem(this._queue[i]);
    }

  },

  start: function() {
    this.totalFiles = this._queue.length;
    this.downloadedFiles = 0;
    this.isLoading = true;
    this.processQueue();
  },

  done: function() {
    this.reset();
    this.game.state.loadComplete();
  },

  processItem: function (item) {
    var self = this;

    var onDone = function(obj) {
      self.onDoneLoadingFile(item.key, obj);
    };

    var onError = function(xhr) {
      self.onErrorLoadingFile(item.key, xhr);
    };

    var onProgress = function() {};

    var ll = null;

    switch(item.type) {
    case FILETYPES.Babylon:
      ll = new THREE.BabylonLoader();
      break;

    case FILETYPES.BufferGeometry:
      ll = new THREE.BufferGeometryLoader();
      break;

    case FILETYPES.Collada:
      ll = new THREE.ColladaLoader();
      break;

    case FILETYPES.GLTF:
      ll = new THREE.glTFLoader();
      break;

    case FILETYPES.Image:
      ll = new THREE.ImageLoader();
      break;

    case FILETYPES.JSON:
      ll = new THREE.JSONLoader();
      break;

    case FILETYPES.Material:
      ll = new THREE.MaterialLoader();
      break;

    case FILETYPES.MTL:
      ll = new THREE.MTLLoader();
      break;

    case FILETYPES.OBJ:
      ll = new THREE.OBJLoader();
      break;

    case FILETYPES.OBJMTL:
      ll = new THREE.OBJMTLLoader();
      break;

    case FILETYPES.Object:
      ll = new THREE.ObjectLoader();
      break;

    case FILETYPES.PDB:
      ll = new THREE.PDBLoader();
      break;

    case FILETYPES.SVG:
      ll = new THREE.SVGLoader();
      break;

    case FILETYPES.Texture:
      ll = new THREE.TextureLoader();
      break;

    case FILETYPES.TGA:
      ll = new THREE.TGALoader();
      break;

    case FILETYPES.XHR:
      ll = new THREE.XHRLoader();
      break;
    }

    if(ll !== null) {
      ll.load(
        item.url,
        onDone,
        onProgress,
        onError
      );
    }
  },

  onDoneLoadingFile: function(key, obj) {
    this.downloadedFiles += 1;
    this.game.assets.addObject(key,obj);
    if(this.downloadedFiles >= this.totalFiles) {
      this.done();
    }
  },

  onErrorLoadingFile: function(key, xhr) {
    console.warn("Object with key "+key+" encountered a download error");
  }
};

module.exports = Loader;

var state1 = {
  create: function() {

    var material = new THREE.MeshNormalMaterial();
    var geometry = new THREE.CubeGeometry(10,10,10);
    var cube = new THREE.Mesh(geometry, material);

    cube.position.z = -10;
    cube.rotation.x = 10;
    cube.rotation.y = 10;

    this.camera.position.z = 10;

    this.world.add(cube);

    var self = this;
    this.utils.interval.setTimeout(function() {
      // switch state with state.start
      this.state.start('state2');
    }, 1000, this);
  }
};

var state2 = {
  create: function() {

    var material = new THREE.MeshNormalMaterial();
    var geometry = new THREE.SphereGeometry(10,10,10);
    var sphere = new THREE.Mesh(geometry, material);

    sphere.position.z = -10;
    sphere.rotation.x = 10;
    sphere.rotation.y = 10;

    this.camera.position.z = 10;

    this.world.add(sphere);

    var self = this;
    this.utils.interval.setTimeout(function() {
      // switch to state 1
      this.state.start('state1');
    }, 1000, this);
  }
};

window.onload = function() {
  var j = new Jeez({
    container: 'basic'
  });

  // add both states
  j.state.add('state1', state1, true);
  j.state.add('state2', state2);
};

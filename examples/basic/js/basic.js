var state = {
  create: function() {

    var material = new THREE.MeshNormalMaterial();
    var geometry = new THREE.CubeGeometry(10,10,10);
    var cube = new THREE.Mesh(geometry, material);

    cube.position.z = -10;
    cube.rotation.x = 10;
    cube.rotation.y = 10;

    this.camera.position.z = 10;

    this.world.add(cube);

  }
};

window.onload = function() {
  var j = new Jeez({
    container: 'basic'
  });

  j.state.add('main', state, true);
};

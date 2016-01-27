var create = function() {
  this.game.lights.addLight('main', Jeez.Globals.LIGHTS.Directional, {
    color: 0xffffff,
    intensity: 1,
    position: new THREE.Vector3(100,100,100)
  });

  this.game.lights.addLight('p1', Jeez.Globals.LIGHTS.Directional, {
    color: 0xffffff,
    intensity: 0.6,
    position: new THREE.Vector3(-100,-100,-100)
  });

  this.game.camera.position.z = 10;

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  this.world.add(cube);

  cube.position.z = -10;

  this.cube = cube;
  this.speed = 5;

  var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
  var material2 = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
  var cube2 = new THREE.Mesh( geometry2, material2 );

  this.world.add(cube2);

  cube2.position.z = -10;
  cube2.position.x = -10;
  cube2.speed = 5;

  // can also specify update methods on the element itself,
  // as long as schedule update is called :)
  cube2.update = function(dt) {
    this.rotation.x += this.speed * dt;
    this.rotation.y += this.speed * dt;
  };

  cube2.scheduleUpdate();

  this.cube2 = cube2;
};

var update = function(dt) {
  this.cube.rotation.x += this.speed * dt;
  this.cube.rotation.y += this.speed * dt;
};

window.onload = function() {
  var j = new Jeez({
    container: 'game',
    state: {
      create: create,
      update: update
    }
  });
};

var preload = function() {
  this.game.load.addFileToQueue(Jeez.Globals.FILETYPES.Texture, 'earth', 'earthmap1k.jpg');
  this.game.load.addFileToQueue(Jeez.Globals.FILETYPES.Texture, 'earthBump', 'earthbump1k.jpg');
  this.game.load.addFileToQueue(Jeez.Globals.FILETYPES.Texture, 'earthSpec', 'earthspec1k.jpg');

  this.game.load.addFileToQueue(Jeez.Globals.FILETYPES.Texture, 'earthClouds', 'earthcloudmap.png');

  this.game.load.addFileToQueue(Jeez.Globals.FILETYPES.Texture, 'stars', 'stars.png');

};

var create = function() {

  this.game.lights.addLight('main', Jeez.Globals.LIGHTS.Directional, {
    color: 0xffffff,
    intensity: 1,
    position: new THREE.Vector3(1000,0,1000)
  });

  // this.game.lights.addLight('main', Jeez.Globals.LIGHTS.Ambient, {
  //   color: 0xffffff,
  //   intensity: 1,
  //   position: new THREE.Vector3(100,100,100)
  // });

  this.game.camera.position.z = 6;

  var texture = this.assets.getObject('earth');
  var geometry = new THREE.SphereGeometry( 5,32, 16 );

  var material = new THREE.MeshPhongMaterial( { map:  texture} );
  material.bumpMap = this.assets.getObject('earthBump');
  material.bumpScale = 0.5;

  material.specularMap = this.assets.getObject('earthSpec');

  var cube = new THREE.Mesh( geometry, material );
  this.world.add(cube);

  var cloudGeometry = new THREE.SphereGeometry(5.05, 32, 16);
  var cloudMaterial = new THREE.MeshPhongMaterial({
    map: this.assets.getObject('earthClouds'),
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true,
    depthWrite: false
  });

  var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
  cube.add(cloudMesh);

  cube.position.z = -10;
  cube.rotation.x = 23.5 * Math.PI/180;

  this.cube = cube;
  this.cube.cloud  = cloudMesh;
  this.speed = 0.1;
  console.log(this.cube);


  var skyGeometry = new THREE.SphereGeometry(100,32,32);
  var skyMaterial = new THREE.MeshBasicMaterial({
    map: this.assets.getObject('stars'),
    side: THREE.BackSide
  });

  var skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);

  this.world.add(skyMesh);

};

var update = function(dt) {
  this.cube.rotation.y += this.speed * dt;
  // this.cube.cloud.rotation.y -= this.speed * dt * 0.1;
};

window.onload = function() {
  var j = new Jeez({
    container: 'game',
    state: {
      preload: preload,
      create: create,
      update: update
    }
  });
};

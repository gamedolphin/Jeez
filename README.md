# Jeez
Game Engine with ThreeJs renderer

## Build
Run `npm install` followed by `npm run dev` or `npm run build` to generate the built library

## Getting Started

1. Include `jeez.js` or `jeez.min.js` in your html or `require` it or `import` it.
2. Initialize Jeez with `var jeez = new Jeez({container: <container name>})` where container is the id of the div inside which the THREE canvas will be created
3. Create an object that looks like this - 
```javascript

var state = {
  create: function() {
    var material = new THREE.MeshNormalMaterial(); // create a basic material
    var geometry = new THREE.CubeGeometry(10,10,10); // create a cube geometry
    var cube = new THREE.Mesh(geometry, material); // create a cube
    cube.position.z = -10; // set its position a little further away from the camera
    cube.rotation.x = 10; // rotate the cube
    cube.rotation.y = 10; // rotate the cube a little more
    this.camera.position.z = 10; // move the camera a little further back
    this.world.add(cube); // add the cube to the scene
  }
}

```
4. Add the newly created state to the state manager with `jeez.state.add('main', state, true) // where the last argument starts the state automatically`

## Currently implemented

1. Rudimentary state manager
2. Render update with `requestAnimationFrame` with fallback to `setTimeout`
3. Extended `THREE.Object3D` to support `update` methods
4. Lights, with `game.lights`
5. Basic scalemanager

Created mostly (copied?) by looking at what [Phaser](https://github.com/photonstorm/phaser) does, with a little bit of [Cocos2d-JS](https://github.com/cocos2d/cocos2d-x).

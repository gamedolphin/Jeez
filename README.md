# Jeez
Game Engine with ThreeJs renderer

Please check the examples folder for rudimentary usage instructions. Docs will happen when the engine feels ready.

## Build
Run `npm install` followed by `npm run dev` or `npm run build` to generate the built library

## Currently implemented

1. Rudimentary state manager
2. Render update with `requestAnimationFrame` with fallback to `setTimeout`
3. Extended `THREE.Object3D` to support `update` methods
4. Lights, with `game.lights`
5. Basic scalemanager

Created mostly (copied?) by looking at what [Phaser](https://github.com/photonstorm/phaser) does, with a little bit of [Cocos2d-JS](https://github.com/cocos2d/cocos2d-x).

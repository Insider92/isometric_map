export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  preload() {
    //this.load.image('phaser-logo', 'src/assets/img/phaser-logo.png')
    //this.load.image('player', 'src/assets/img/player/idle/idle-1.png')
    this.load.image('background', 'src/assets/img/background.png');
    this.load.image('tiles', 'src/assets/spritesheet/spritesheet.png');
    this.load.tilemapTiledJSON('map', 'src/assets/map/map.json');
    this.load.spritesheet('player', 'src/assets/img/RPG_assets.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
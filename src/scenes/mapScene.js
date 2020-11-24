import IsoPlugin, {
  IsoPhysics
} from "phaser3-plugin-isometric";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: {
        isoPlugin: 'iso',
        isoPhysics: 'isoPhysics'
      }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.image('tile', 'src/assets/tile.png');
    this.load.image('cube', 'src/assets/cube.png');

    this.time.advancedTiming = true;

    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });

    this.load.scenePlugin({
      key: 'IsoPhysics',
      url: IsoPhysics,
      sceneKey: 'isoPhysics'
    });
  }

  create() {
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.3);

    this.cameras.main.setBackgroundColor(0xbababa)
    this.time.advancedTiming = true;
    //this.isoPhysics.world.gravity.setTo(0, 0, -500);


    // Add some tiles to our scene
    this.spawnTiles();
    this.createPlayer();
  }

  spawnTiles() {
    let tile;
    //Anzahl der Tiles ist Anzahl * 38, da tile.png 38 pixel hat
    for (let xx = 0; xx < 380; xx += 38) {
      for (let yy = 0; yy < 380; yy += 38) {
        tile = this.add.isoSprite(xx, yy, 0, 'tile', this.isoGroup);
        this.isoPhysics.world.enable(tile);
        tile.body.collideWorldBounds = true;
        tile.setInteractive();

        tile.on('pointerover', function () {
          this.setTint(0x86bfda);
          this.isoZ += 5;
        });

        tile.on('pointerout', function () {
          this.clearTint();
          this.isoZ -= 5;
        });
      }
    }
  }

  createPlayer() {
    let player = this.add.isoSprite(204, 128, 36, 'cube', this.isoGroup);
    player.tint = 0x86bfda;
    this.isoPhysics.world.enable(player);
    player.body.collideWorldBounds = true;

    player.setInteractive();

    player.on('pointerover', function () {
      this.setTint(0xFF9900);
      this.isoZ += 5;
    });

    player.on('pointerout', function () {
      this.setTint(0x86bfda);
      this.isoZ -= 5;
    });
  }
}
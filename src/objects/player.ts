export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, 'player')
      scene.add.existing(this)
      scene.physics.add.existing(this)
  
      this.setCollideWorldBounds(true)
        .setBounce(0.2)
        .setInteractive()
        .on('pointerdown', () => {
          console.log('pointerdown');
          this.setVelocityY(-400)
        })
    }   

    moveUp(){
        this.setVelocityY(160)
    }

    moveDown(){
        this.setVelocityY(-160)
    }

    moveRight(){
        this.setVelocityX(160)
    }

    moveLeft(){
        this.setVelocityX(-160)
    }



  }
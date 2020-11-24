export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainScene'
        })
    }

    create() {
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        let map = this.make.tilemap({
            key: 'map'
        });
        let tiles = map.addTilesetImage('DemoMap', 'tiles');
        let grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        this.player = this.physics.add.sprite(50, 100, 'player', 9);

        //physic
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        //can't get out of map
        this.player.setCollideWorldBounds(true);

        //collider
        this.physics.add.collider(this.player, obstacles);

        //cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //cam
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        //animation

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [10, 18, 10, 26]
            }),
            frameRate: 10,
            repeat: -1
        });
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [10, 18, 10, 26]
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [11, 19, 11, 27]
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [9, 17, 9, 25]
            }),
            frameRate: 10,
            repeat: -1
        });

        /* fun stuff */ 

        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);            
        }        
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    }

    update() {
        //movenment
        this.player.body.setVelocity(0);
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }
 
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        } 

        //animation
        if (this.cursors.left.isDown) {
            this.player.scaleX = -1;
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.scaleX = 1;
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
        }
    }

    onMeetEnemy(player, zone) {        
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.flash(300);
        
        // start battle 
    }

}
class Character extends Phaser.Scene{
    constructor(){
        super("Character");
    }

    Init(){
        this.playerlife = 3;
        this.icespell=false;
        this.windspell=false;
        this.earthspell=false

    }
    
    preload(){
        this.load.spritesheet('playerFront', 'assets/chara_front.png',
            { frameWidth: 2920, frameHeight: 768 });

    }

    create(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerFront', {start:0,end:7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('playerFront', {start:0}),
            frameRate: 10,
            
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerFront', {start:0,end:7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('playerFront', {start:0,end:7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('playerFront', {start:0,end:6}),
            frameRate: 10,
            repeat: -1
        });
        this.player = this.physics.add.sprite(this.coordPlayerX, this.coordPlayerY, 'playerFront').setScale(0.2);

    }

    update(){

    }
}
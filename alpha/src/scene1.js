class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        
            
    }
    
    preload(){

        //preload diffent asset of the map

        //import tiles
        this.load.tilemapTiledJSON("scene1", "../LD/scene1.json");

        //import tileset
        this.load.image("jeudetuile","../LD/tileset.png");

        //creating player for test
        this.load.spritesheet("hero_down","assets/chara/chara_front.png",
                    { frameWidth: 365, frameHeight: 768 });

        //preload monster
        this.load.image("mobRock","assets/chara/chara_monstre_1.png");

        //preload skills
        this.load.image("fireball", "assets/chara/fireball.png")

    }

    create(){
        console.log("first map")
    //this.add.image(800,400,"sol");

    // this.scene.add('Character', Character, true, { x: 400, y: 300 });

    const carteDuNiveau = this.add.tilemap("scene1");

    // importer les TileSet
    const tileset = carteDuNiveau.addTilesetImage(
    "tileset",
    "jeudetuile"
    );

    const sol = carteDuNiveau.createLayer(
    "sol",
    tileset, 
    );

    const rock1 = carteDuNiveau.createLayer(
    "Rock1",
    tileset, 
    );

    const rock2 = carteDuNiveau.createLayer(
    "rock2",
    tileset, 
    );

    const water = carteDuNiveau.createLayer(
        "water",
        tileset,
    );

    const pont = carteDuNiveau.createLayer(
    "pont",
    tileset, 
    );

    const sideDalle = carteDuNiveau.createLayer(
    "side_dalle",
    tileset, 
    );
    
    const dalleButon = carteDuNiveau.createLayer(
        "dalle_bouton",
        tileset
    );

    const button1 = carteDuNiveau.createLayer(
        "button1",
        tileset
    );

    const button2 = carteDuNiveau.createLayer(
        "button2",
        tileset
    );

    const shopScene = carteDuNiveau.createLayer(
        "shopScene",
        tileset
    );

    this.mobRock1 = this.physics.add.group({
    });

    this.spawn_mobRock = carteDuNiveau.getObjectLayer('spawn_monstre');
    this.spawn_mobRock.objects.forEach(spawn_mobRock=> {
    const golem =  this.mobRock1.create(spawn_mobRock.x,  spawn_mobRock.y, "mobRock").setScale(0.2);
    });

    //création caméra
    this.cameras.main.setSize(1600, 900); 

    this.player = this.physics.add.sprite(4750, 900, "hero_down")/*set position to  200, 6144, */;
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.08);
    this.physics.add.collider(this.player,rock1);
    this.physics.add.collider(this.player,rock2);

    //importation des entrées clavier

    this.cursors = this.input.keyboard.createCursorKeys();

    //animation joueur

    this.anims.create({
    key: 'hero_down',
    frames: this.anims.generateFrameNumbers('hero_down', {start:0,end:7}),
    frameRate: 10,
    repeat: -1
    });

    this.anims.create({
    key: 'hero_up',
    frames: this.anims.generateFrameNumbers('hero_down', {start:0,end:7}),
    frameRate: 10,
    repeat: -1
    });

    this.anims.create({
    key: 'hero_left',
    frames: this.anims.generateFrameNumbers('hero_down', {start:0,end:7}),
    frameRate: 10,
    repeat: -1
    });

    this.anims.create({
    key: 'hero_right',
    frames: this.anims.generateFrameNumbers('hero_down', {start:0,end:7}),
    frameRate: 10,
    repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'hero_down', frame: 0 } ],
        frameRate: 20
    });
    this.fireball = this.add.group();
    //set collision by property                    

    rock1.setCollisionByProperty({ collider: true });
    rock2.setCollisionByProperty({ collider: true });
    shopScene.setCollisionByProperty({sceneChange: true});
    
    //set collision between player and encironement
    
    this.physics.add.collider(this.player,this.rock1);
    this.physics.add.collider(this.player,this.rock2);
    this.physics.add.collider(this.player, shopScene, this.goShop, null, this);
    this.physics.add.collider(this.fireball,this.mobRock1, this.fireballKill,null,this);
    


     // caméra 

    this.cameras.main.setBounds(0,0,5120,3072);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0,0,5120,3072);



    //input
    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        //Mouvement
        if (this.cursors.up.isDown) {
            this.player.anims.play('hero_up');
            this.player.setVelocityY(-300);
            this.player.setVelocityX(0);
            this.player_facing = "up";
            

        }
        else if (this.cursors.down.isDown) {
            this.player.anims.play('hero_down');
            this.player.setVelocityY(300);
            this.player.setVelocityX(0);
            this.player_facing = "down"

        }
        else if (this.cursors.right.isDown) {
            this.player.anims.play('hero_right');
            this.player.setVelocityX(300);
            this.player.setVelocityY(0);
            this.player_facing = "right";       

        }
        else if (this.cursors.left.isDown) {
            this.player.anims.play('hero_left');
            this.player.setVelocityX(-300);
            this.player.setVelocityY(0);
            this.player_facing = "left";
            

        }
        else{
            this.player.anims.play('turn', true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if (this.cursors.shift.isDown) {
            if (this.player_facing == "up") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityY(-200);
            }
            else if (this.player_facing == "down") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityY(200);
            }
            else if (this.player_facing == "right") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityX(200);
            }
            else if (this.player_facing == "left") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityX(-200);
            }
        

    }
}
    //lancement scene == changement de carte
    goShop(){
        console.log("YOYOYO");
        this.scene.start('Shop');
    }
    goScene2(){
        this.start.scene('Scene2');
    }
    fireballKill(mob, fireball) {
        mob.disableBody(true, true)
        fireball.disableBody(true, true)
        this.lootMob(mob);
    }}

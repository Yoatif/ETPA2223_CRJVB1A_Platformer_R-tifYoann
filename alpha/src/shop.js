class Shop extends Phaser.Scene{
    constructor(){
        super("Shop");
    }

    init(){
        
            
    }
    
    preload(){

        //preload diffent asset of the map
        //this.load.image("sol","../assets/map1/sol.png");

        //import tiles
        this.load.tilemapTiledJSON("shop", "../LD/shop.json");


        //import tileset
        this.load.image("jeudetuile","../LD/tileset.png");

        

        //creating player for test
        this.load.spritesheet("hero_down","assets/chara/chara_front.png",
                    { frameWidth: 365, frameHeight: 768 });

    }

    create(){
        console.log("shop map")
    //this.add.image(800,400,"sol");

    // this.scene.add('Character', Character, true, { x: 400, y: 300 });

    const carteDuNiveau = this.add.tilemap("shop");

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
    "rock1",
    tileset, 
    );

    const batimentShop = carteDuNiveau.createLayer(
    "shop",
    tileset, 
    );

    

    
    
      
    //création caméra
    this.cameras.main.setSize(1600, 900); 

    this.player = this.physics.add.sprite(640, 900, "hero_down")/*set position to  200, 6144, */;
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.1);
    this.physics.add.collider(this.player,rock1);
    this.physics.add.collider(this.player,batimentShop);

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

    //set collision by property                    

    rock1.setCollisionByProperty({ collider: true });
    batimentShop.setCollisionByProperty({ collider: true });
    
    //set collision between player and encironement
    
    this.physics.add.collider(this.player,this.rock1);
    this.physics.add.collider(this.player,this.shop);
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
            

        }
        else if (this.cursors.down.isDown) {
            this.player.anims.play('hero_down');
            this.player.setVelocityY(300);
            this.player.setVelocityX(0);

        }
        else if (this.cursors.right.isDown) {
            this.player.anims.play('hero_right');
            this.player.setVelocityX(300);
            this.player.setVelocityY(0);
            

        }
        else if (this.cursors.left.isDown) {
            this.player.anims.play('hero_left');
            this.player.setVelocityX(-300);
            this.player.setVelocityY(0);
            

        }
        else{
            this.player.anims.play('turn', true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        

    }
}
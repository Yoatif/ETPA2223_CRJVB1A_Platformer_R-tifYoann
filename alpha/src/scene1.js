class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        
            
    }
    
    preload(){

        //preload diffent asset of the map

        //import tiles
        this.load.tilemapTiledJSON("scene1", "../LD/onboarding.json");

        //import tileset
        this.load.image("jeudetuile","../LD/tilesetAlpha.png");

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

    const jump = carteDuNiveau.createLayer(
    "jump",
    tileset, 
    );

    const sol = carteDuNiveau.createLayer(
    "sol",
    tileset, 
    );
    

    

    //création caméra
    this.cameras.main.setSize(1600, 900); 

    this.player = this.physics.add.sprite(4750, 900, "hero_down")/*set position to  200, 6144, */;
    this.player.setCollideWorldBounds(true);



    //importation des entrées clavier

    this.cursors = this.input.keyboard.createCursorKeys();

    //animation joueur

                 

    
    //set collision between player and encironement
    
    


     // caméra 

    this.cameras.main.setBounds(0,0,5120,3072);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0,0,5120,3072);



    //input
    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

      
}
}

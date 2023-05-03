class Scenetest extends Phaser.Scene {
    constructor() {
        super("Scenetest");
    }

    init(data) {
        
    }

    preload() {
        //preload diffent asset of the map

        //import tiles
        this.load.tilemapTiledJSON("sceneTest", "./LD/onboarding_jump_glide_alpha_V1.json");

        //import tileset
        this.load.image("jeudetuile","./LD/tileset_Alpha.png");

        //creating player for test
        this.load.spritesheet("standingHero","assets/chara/chara_front.png",
                    { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("glidingHero","assets/chara/chara_front.png",
                    { frameWidth: 64, frameHeight: 32 });

        //preload monster
        //this.load.image("mobRock","assets/chara/chara_monstre_1.png");

        //preload skills
        //this.load.image("fluteProj", "assets/chara/fireball.png")

    }

    create() {
        
        
        //Création Attaque
        //this.fluteATK = this.physics.add.group();

        //creating mob
        /*this.mob = this.physics.add.group();
        this.anims.create({
            key: 'left_mob',
            frames: [{key: 'mob', frame: 1}],
            frameRate: 20,
        });
        this.anims.create({
            key: 'right_mob',
            frames: [{ key: 'mob', frame: 1 }],
            frameRate: 20
        });*/   
        

       //Loading Tiled
       this.carteDuNiveau = this.add.tilemap("sceneTest");
       this.tileset = this.carteDuNiveau.addTilesetImage(
           "Tileset_Alpha",
           "jeudetuile"
       );

       //Loading layer
       //Mur
       this.deco1 = this.carteDuNiveau.createLayer(
           "deco1",
           this.tileset
       );

       this.deco2 = this.carteDuNiveau.createLayer(
           "deco2",
           this.tileset
       );
       this.deco3 = this.carteDuNiveau.createLayer(
        "deco3",
        this.tileset
        );

        this.deco4 = this.carteDuNiveau.createLayer(
            "deco4",
            this.tileset
        );
        
        this.sol = this.carteDuNiveau.createLayer(
            "sol",
            this.tileset
        );

       
    }

    update() {
       
    }

   
}
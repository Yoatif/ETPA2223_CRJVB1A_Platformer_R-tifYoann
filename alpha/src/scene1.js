class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        
            
    }
    
    preload(){

        //preload diffent asset of the map

        //import tiles
        this.load.tilemapTiledJSON("scene1", "./LD/onboarding.json");

        //import tileset
        this.load.image("jeudetuile","./LD/placeholder.png");

        //import assets
        this.load.image("collectible","./assets/collectible.png");

    }

    create(){
        console.log("first map")

        const carteDuNiveau = this.add.tilemap("scene1");

        // importer les TileSet
        const tileset = carteDuNiveau.addTilesetImage(
        "placeholder",
        "jeudetuile"
        );

        const background = carteDuNiveau.createLayer(
            "background",
            tileset
        );

        const sol = carteDuNiveau.createLayer(
        "sol",
        tileset, 
        );

        this.collect = this.add.group();
        this.collectibleLayer = carteDuNiveau.getObjectLayer('collectible');
        this.collectibleLayer.objects.forEach(collectibleLayer => {
            const collectItem = this.collect.create(collectibleLayer.x, collectibleLayer.y, "collectible")
        });




        //importation des entrées clavier

        this.cursors = this.input.keyboard.createCursorKeys();

        //animation joueur

                    

        
        //set collision between player and encironement
        
        


        // caméra 



        //input

                
    }

    update(){

      
    }
}

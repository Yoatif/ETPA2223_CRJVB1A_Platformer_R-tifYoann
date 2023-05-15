class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        this.keyZ;
        
        
            
    }
    
    preload(){

        //preload diffent asset of the map

        //import tiles
        this.load.tilemapTiledJSON("scene1", "./LD/onboarding.json");

        //import tileset
        this.load.image("jeudetuile","./LD/placeholder.png");

        //import assets
        this.load.image("collectible","./assets/collectible.png");

        //import perso
        this.load.spritesheet("player", "./assets/spritesheet_perso.png",  { frameWidth: 128, frameHeight: 128 });


    }

    create(){
        //this.canJump = false;
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
            tileset
        );

        
        


        this.player = this.physics.add.sprite(40, 580, 'player');
        //this.player.setCollideWorldBounds(true);
        this.player.body.gravity.y = 350;
        
        this.physics.add.collider(this.player, sol, );

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { frame:0 }),
            frameRate: 10,
            
        });
        this.anims.create({
            key: 'glide',
            frame: this.anims.generateFrameNumbers('player',{frame:1}),
            frameRate: 10

        });

        
        /*this.collect = this.add.group();
        this.collectibleLayer = carteDuNiveau.getObjectLayer('collectible');
        this.collectibleLayer.objects.forEach(collectibleLayer => {
            const collectItem = this.collect.create(collectibleLayer.x, collectibleLayer.y, "collectible")
        });*/




        //importation des entrées clavier

        this.cursors = this.input.keyboard.createCursorKeys();
        //creating new key
        this.keyZ= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
                

        //animation joueur

                    

        
        //set collision between player and encironement
        sol.setCollisionByProperty({collider: true});
        
        


        // caméra 
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setBounds(9600, 2560);
        //this.physics.world.setBounds(9600, 2560);
        



        //input

                
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyZ)) {
            console.log('Z key pressed');
            this.player.setVelocityY(-350);
            this.player.anims.play('run');
            this.canJump = false;
            //player.anims.play('KeyA', true);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyD)){
            console.log('D key pressed ');
            this.player.anims.play('glide')
            this.player.setVelocityX(100);
        }
        else {
            this.player.anims.play('run')
        }

        this.player.setVelocityX(300);

      
    }
}

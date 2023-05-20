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
        this.load.image("projBow","./assets/proj_bow.png");
        this.load.image("mob", "./assets/mob.png");
        this.load.image("newPlatform", "./assets/newPlatform.png");

        //import perso
        this.load.spritesheet("player", "./assets/spritesheet_perso.png",  { frameWidth: 128, frameHeight: 128 });


    }

    create(){
        //this.canJump = false;
        console.log("first map")

        this.proj_Bow = this.physics.add.group();
        this.mob= this.physics.add.group();

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
            key: "run",
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
        });
        this.anims.create({
            key: "slide",
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 60,
        });
        
        this.mob = this.physics.add.group();
        this.monsterLayer = carteDuNiveau.getObjectLayer('mob');
        this.monsterLayer.objects.forEach(monsterLayer => {
            const creatingMob = this.mob.create(monsterLayer.x, monsterLayer.y, "mob")    
        });
        
        //test zone détection utilisation touche pour mécanique de "construction"
        this.detectionZone = this.add.zone(7872, 704, 704, 200);

        // Rendre la zone de détection invisible
        this.detectionZone.visible = true;
      
        
       




        //importation des entrées clavier

        this.cursors = this.input.keyboard.createCursorKeys();
        //creating new key
        this.clavier = this.input.keyboard.addKey('Z,Q,S,D')
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        

        //animation joueur

                    

        
        //set collision between player and encironement
        sol.setCollisionByProperty({collider: true});
        
        


        // caméra 
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setBounds(9600, 2560);
        //this.physics.world.setBounds(9600, 2560);


        //creating collider

        this.physics.add.collider(this.mob, this.proj_Bow, this.kill_mob_bow, null, this);
        this.physics.add.collider(this.mob, sol);
        this.physics.add.collider(this.player, this.mob, this.death, null, this);



        

                
    }

    update(){
        //console.log(Phaser.Input.Keyboard.JustDown(this.keyZ));
        

        this.player.setVelocityX(300);

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.detectionZone.getBounds())) {
            console.log('Le joueur est dans la zone de détection !');
            // Faire quelque chose lorsque le joueur est détecté
          }

        if(Phaser.Input.Keyboard.JustDown(this.keyZ)) {
            console.log('Z key pressed');
            this.player.setVelocityY(-350);
            this.player.anims.play('run');
            this.player.body.setSize(64,128);
        }
        if(this.keyD.isDown){
            console.log('D key pressed ');
            this.player.anims.play('slide');
            this.player.body.setSize(128,64);
            this.player.body.setOffset(0, 64);
            this.player.setVelocityX(400);
        }
            
        else if(Phaser.Input.Keyboard.JustDown(this.keyO)){
            console.log("O key pressed");
            this.shoot(this.player);
            //this.test = this.proj_Bow.create(this.player.x, this.player.y, "projBow").body.setVelocityX(500);
            //this.time.delayedCall(500, (test)=>{test.disableBody(true,true)}, [this.test], this);
        }


        
        else {
            this.player.anims.play('run');
            this.player.body.setSize(64,128);
        }
    }

    kill_mob_bow(mob, projBow) {
        mob.disableBody(true, true)
        projBow.disableBody(true, true)
        
        
    }

    clean_proj(proj) {
        proj.disableBody(true, true);
        this.trigger_shoot = false;
    }
    shoot(){
        this.proj_Bow.create(this.player.x, this.player.y, "projBow").body.setVelocityX(1500);
    }


    death(){
        this.scene.start("GameOver");
    }
}

class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        this.keyZ;
        this.keyD;
        this.keyK;
        this.keyO;

        this.score = 0;
        this.scoreText;
        
        
            
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
        this.load.image("uiScore", "./assets/ui_score.png");

        //import collectible 
        this.load.image("noir", "./assets/collectible/noir.png");
        this.load.image("blanche", "./assets/collectible/blanche.png");
        this.load.image("ronde", "./assets/collectible/ronde.png");

        //import perso
        this.load.spritesheet("player", "./assets/spritesheet_perso.png",  { frameWidth: 128, frameHeight: 128 });


    }

    create(){
        //this.canJump = false;
        console.log("first map");


        this.proj_Bow = this.physics.add.group();
        this.mob= this.physics.add.group();
        this.musicNote = ['noir','blanche','ronde'];
        this.scale = 0.2;

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

        this.mob = this.physics.add.group();
        this.monsterLayer = carteDuNiveau.getObjectLayer('mob');
        this.monsterLayer.objects.forEach(monsterLayer => {
            const creatingMob = this.mob.create(monsterLayer.x, monsterLayer.y, "mob")    
        });

        const collectible = carteDuNiveau.getObjectLayer('collectibles');
        this.spawnCollectible = collectible.objects;

        const noir = Phaser.Utils.Array.RemoveRandomElement(this.spawnCollectible);
        const blanche = Phaser.Utils.Array.RemoveRandomElement(this.spawnCollectible);
        const ronde = Phaser.Utils.Array.RemoveRandomElement(this.spawnCollectible);

        this.noirSprite = this.add.image(noir.x+16, noir.y, 'noir').setScale(this.scale);
        this.blancheSprite = this.add.image(blanche.x+16, blanche.y, 'blanche').setScale(this.scale);
        this.rondeSprite = this.add.image(ronde.x, ronde.y, 'ronde').setScale(this.scale);
        
        this.noirSprite.score = 1;
        this.blancheSprite.score = 2;
        this.rondeSprite.score = 4;
        

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

        
        //set collision between player and encironement
        sol.setCollisionByProperty({collider: true});
        
        // caméra 
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setBounds(9600, 2560);
        //this.physics.world.setBounds(9600, 2560);


        //creating collider

        this.physics.add.collider(this.mob, this.proj_Bow, this.kill_mob_bow, null, this);
        this.physics.add.collider(this.mob, sol);
        //this.physics.add.collider(this.player, this.mob, this.death, null, this);

        //creating overlap
        this.physics.add.overlap(this.player, [this.noirSprite, this.blancheSprite, this.rondeSprite], this.addScore, null, this);
  

        //creating score counter
        this.scoreImg = this.add.image(32,64,'uiScore').setScale(0.1);
        this.scoreImg.setScrollFactor(0);


        //creating score 
        this.scoreText = this.add.text(this.scoreImg.x+32, this.scoreImg.y, this.score, { fontSize: '32px', fill: '#000' });
        this.scoreText.setScrollFactor(0);

        

                
    }

    update(){
        //console.log(Phaser.Input.Keyboard.JustDown(this.keyZ));
        /*this.scoreText.x = this.cameras.main.scrollX + 16;
        this.scoreText.y = this.cameras.main.scrollY + 16;
        this.scoreImg.x = this.cameras.main.scrollX -16;
        this.scoreImg.y = this.cameras.main.scrollY + 16;*/
        

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

        // Vérifiez si le joueur touche quelque chose à droite
        /*this.isBlockedRight = this.player.body.blocked.right;

        // Faites quelque chose si le joueur est bloqué à droite
        if (this.isBlockedRight) {
            console.log("Le joueur est bloqué à droite !");
            this.death()
            // Ajoutez ici le code pour gérer le blocage du joueur à droite
        }*/
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

    
    addScore(player, spawnCollectible) {
        // Ajout du score
        this.score += spawnCollectible.score;
    
        // Mise à jour du texte de score
        this.scoreText.setText(this.score);
    
        // Suppression de l'objet
        spawnCollectible.disableBody(true,true);
      };


    
}

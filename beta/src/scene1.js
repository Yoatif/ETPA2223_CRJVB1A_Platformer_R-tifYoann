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
        this.load.tilemapTiledJSON("scene1", "./LD/scene1.json");

        //import tileset
        this.load.image("jeudetuile","./assets/placeholder.png");

        //import assets
        //this.load.image("collectible","./assets/collectible.png");
        this.load.image("projBow","./assets/proj_bow.png");
        //this.load.image("newPlatform", "./assets/newPlatform.png");
        this.load.image("uiScore", "./assets/ui_score.png");
        //this.load.image("invisible", "./assets/invesibleSprite.png");

        //import collectible 
        this.load.image("noir", "./assets/collectible/noir.png");
        this.load.image("blanche", "./assets/collectible/blanche.png");
        this.load.image("ronde", "./assets/collectible/ronde.png");

        //import perso
        this.load.spritesheet("player", "./assets/spritesheet_kokopelli.png",
            { frameWidth: 115, frameHeight: 128 });
        this.load.spritesheet("mob", "./assets/mob.png",
            { frameWidth: 680, frameHeight: 364 });

        //import audio
        this.load.audio("songScene1",  "sound/Commeunedanse.mp3");


    }

    create(){
        //this.canJump = false;
        //console.log("first map");


        this.proj_Bow = this.physics.add.group();
        this.mob= this.physics.add.group();
        this.musicNote = ['noir','blanche','ronde'];
        this.scale = 0.15;


        const carteDuNiveau = this.add.tilemap("scene1");

        // importer les TileSet
        const tileset = carteDuNiveau.addTilesetImage(
        "placeholder",
        "jeudetuile"
        );
        /*const background2 = carteDuNiveau.createLayer(
            "background2",
            tileset
        );
        const background3 = carteDuNiveau.createLayer(
            "background3",
            tileset
        );*/

        const background = carteDuNiveau.createLayer(
            "background",
            tileset
        );
        const sol = carteDuNiveau.createLayer(
            "sol",
            tileset
        );
        const totem = carteDuNiveau.createLayer(
            "totem",
            tileset
        );
        const piques = carteDuNiveau.createLayer(
            "piques",
            tileset
        );
        

        this.mob = this.physics.add.group();
        
        this.monsterLayer = carteDuNiveau.getObjectLayer('mob');
        this.monsterLayer.objects.forEach(monsterLayer => {
            const creatingMob = this.physics.add.sprite(monsterLayer.x, monsterLayer.y, "mob").setScale(0.2);
            this.mob.add(creatingMob)
             
        });
        this.mob.setVelocityX(-300);
        

        this.collectibles = this.add.group();
        this.collectible = carteDuNiveau.getObjectLayer('collectibles');
        this.collectible.objects.forEach(collectible => {
            let random = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            //console.log(random) 
            if (random == 0){
                //console.log("noir") 
                this.collectibleSprite = this.physics.add.sprite(collectible.x+16, collectible.y, 'noir').setScale(this.scale);
                this.collectibleSprite.score = 1;
                this.collectibleSprite.body.setImmovable(false);
                this.collectibleSprite.body.allowGravity = false;
            }
            else if (random == 1){
                this.collectibleSprite = this.physics.add.sprite(collectible.x+16, collectible.y, 'blanche').setScale(this.scale);
                this.collectibleSprite.score = 2;
                this.collectibleSprite.body.setImmovable(false);
                this.collectibleSprite.body.allowGravity = false;
            }
            else {
                this.collectibleSprite = this.physics.add.sprite(collectible.x+16, collectible.y, 'ronde').setScale(0.2);
                this.collectibleSprite.score = 4;
                this.collectibleSprite.body.setImmovable(false);
                this.collectibleSprite.body.allowGravity = false;

            }

            this.collectibles.add(this.collectibleSprite)
            
        });
        
       

        this.player = this.physics.add.sprite(-384, -384, 'player');
        this.player.setScale(0.75);
        //this.player.setCollideWorldBounds(true);
        this.player.body.gravity.y = 700;
        
        this.physics.add.collider(this.player, sol);
        this.physics.add.collider(this.player, piques, this.death, null, this);
        this.physics.add.collider(this.player, totem, this.ending, null, this);
        

        this.anims.create({
            key:'run',
		frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
        });
        this.anims.create({
            key: "slide",
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 60,
        });

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
        piques.setCollisionByProperty({spiked: true});
        totem.setCollisionByProperty({ending: true});
        //background2.setCollisionByProperty({collider: true});
        
        // caméra 
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,carteDuNiveau.width*64,carteDuNiveau.height*64);
        this.physics.world.setBounds(0,0,carteDuNiveau.width*64,carteDuNiveau.height*64);


        //creating collider

        this.physics.add.collider(this.mob, this.proj_Bow, this.kill_mob_bow, null, this);
        this.physics.add.collider(this.mob, sol);
        this.physics.add.collider(this.mob, piques);
        //this.physics.add.collider(this.mob, background2);
        this.physics.add.collider(this.player, this.mob, this.death, null, this);

        //creating overlap
        //this.physics.add.overlap(this.player, [this.noirSprite, this.blancheSprite, this.rondeSprite], this.addScore, null, this);
        this.physics.add.overlap(this.player, this.collectibles, this.addScore, null, this);
        
       
        this.scoreImg = this.add.image(32,64,'uiScore').setScale(0.2);
        this.scoreImg.setScrollFactor(0);

        console.log(carteDuNiveau)
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
        
        

        this.mob.getChildren().forEach(soloMob => {
            if(soloMob.body.checkCollision.left){
                //console.log("efzoh");
                soloMob.body.setVelocityX(100);
                soloMob.setFlipX(true)  
            }

            if(soloMob.body.checkCollision.right){
                //console.log("change");
                soloMob.body.setVelocityX(-100);
                soloMob.setFlipX(true)
            }
            
        });
/*
        if(this.mob.body.isBlocked.left){
            
            

            
        }*/
        this.player.setVelocityX(300);

        if(Phaser.Input.Keyboard.JustDown(this.keyZ)) {
            //console.log('Z key pressed');
            this.player.setVelocityY(-350);
            this.player.anims.play('run');
            this.player.body.setSize(64,128);
        }
        if(this.keyD.isDown){
            //console.log('D key pressed ');
            this.player.anims.play('slide');
            this.player.body.setSize(128,64);
            this.player.body.setOffset(0, 64);
            this.player.setVelocityX(400);
        }
            
        else if(Phaser.Input.Keyboard.JustDown(this.keyO)){
            //console.log("O key pressed");
            this.shoot(this.player);
            //this.test = this.proj_Bow.create(this.player.x, this.player.y, "projBow").body.setVelocityX(500);
            //this.time.delayedCall(500, (test)=>{test.disableBody(true,true)}, [this.test], this);
        }


        
        else {
            this.player.anims.play('run');
            this.player.body.setSize(64,128);
        }

        // Vérifiez si le joueur touche quelque chose à droite
        this.isBlockedRight = this.player.body.blocked.right;

        // ici le code pour gérer le blocage du joueur à droite
        if (this.isBlockedRight) {
            console.log("Le joueur est bloqué à droite !");
            this.death()
        }
    }

    kill_mob_bow(mob, projBow) {
        mob.disableBody(true, true)
        projBow.disableBody(true, true)
        this.score += 10;
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

    
    addScore(player, collectible) {
        //console.log("j'ajoute le score");
        //console.log(this)
        // Ajout du score
        this.score += collectible.score;
    
        // Mise à jour du texte de score
        this.scoreText.setText(this.score);
    
        // Suppression de l'objet
        collectible.disableBody(true,true);
      };

      /*addScore(player, spawnCollectible) {
        //console.log("j'ajoute le score");
        //console.log(this)
        // Ajout du score
        this.score += spawnCollectible.score;
    
        // Mise à jour du texte de score
        this.scoreText.setText(this.score);
    
        // Suppression de l'objet
        spawnCollectible.disableBody(true,true);
      };

      ending(){
        this.scene.start("");
      };*/
}


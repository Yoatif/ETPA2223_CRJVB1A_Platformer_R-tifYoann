class Scenetest extends Phaser.Scene {
    constructor() {
        super("Scenetest");
    }

    init(data) {
        
    }

    preload() {
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

    create() {
        
        
        //Création Attaque
        this.fluteATK = this.physics.add.group();

        //Création Mbob
        this.mob = this.physics.add.group();
        this.anims.create({
            key: 'left_mob',
            frames: [{key: 'mob', frame: 1}],
            frameRate: 20,
        });
        this.anims.create({
            key: 'right_mob',
            frames: [{ key: 'mob', frame: 1 }],
            frameRate: 20
        });
        

       //Load Tiled
       this.carteDuNiveau = this.add.tilemap("carte");
       this.tileset = this.carteDuNiveau.addTilesetImage(
           "Tileset_PlaceHolder",
           "Phaser_tuilesdejeu"
       );

       //Load Calque
       //Mur
       this.bordure = this.carteDuNiveau.createLayer(
           "Bordure",
           this.tileset
       );

       this.river = this.carteDuNiveau.createLayer(
           "River",
           this.tileset
       );

       //Placement Ennemi
       this.calque_mob = this.carteDuNiveau.getObjectLayer('Ennemi');
       this.calque_mob.objects.forEach(calque_mob => {
           this.mob_create = this.physics.add.sprite(calque_mob.x + 16, calque_mob.y + 16, 'mob');
           this.mob_create.anims.play('down_mob');
           this.mob.add(this.mob_create)
       });
       this.mob.setVelocityY(100);

        //Bordure Mob
        this.calque_mob_switch_right = this.carteForest.createLayer(
            "Ennemi_Switch_Right",
            this.tileset
        );

        this.calque_mob_switch_left = this.carteForest.createLayer(
            "Ennemi_Switch_Left",
            this.tileset
        );

        this.calque_mob_switch_up = this.carteForest.createLayer(
            "Ennemi_Switch_Up",
            this.tileset
        );

        this.calque_mob_switch_down = this.carteForest.createLayer(
            "Ennemi_Switch_Down",
            this.tileset
        );
        
        this.calque_mob_switch_down.setVisible(false);
        this.calque_mob_switch_up.setVisible(false);
        this.calque_mob_switch_right.setVisible(false);
        this.calque_mob_switch_left.setVisible(false);

        //Inventaire
        this.add.image(0, 0, "BarreInventaire").setScrollFactor(0);

        //Placement PowerUp
        this.sword = this.physics.add.group();
        if (this.unlock_Sword == false){
            this.sword.create(1985, 2076, "sword_y");
        }

        this.bow = this.physics.add.group();
        if (this.unlock_Bow == false){
            this.bow.create(204, 270, "Bow");
        }

        //Inventaire
        this.add.image(0, 0, "BarreInventaire").setScrollFactor(0);
        if (this.unlock_Sword) {
            this.add.image(900, 50, 'sword_y').setScale(2.5).setScrollFactor(0);
        }
        if (this.unlock_Bow) {
            this.add.image(900, 50, 'Bow').setScale(2.5).setScrollFactor(0);
        }
        if (this.unlock_Tear) {
            this.add.image(900, 50, 'Tear').setScale(2.5).setScrollFactor(0);
        }
        if (this.unlock_Key) {
            this.add.image(850, 50, 'Key').setScale(2.5).setScrollFactor(0);
        }
        
        //Création Joueur
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'perso').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:12,end:15}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', {start:4,end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:8,end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'left_stop',
            frames: [ { key: 'perso', frame: 12 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_stop',
            frames: [ { key: 'perso', frame: 8 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'up_stop',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'down_stop',
            frames: [ { key: 'perso', frame: 0 } ],
            frameRate: 20
        });

        //Calque Solide
        this.bordure.setCollisionByProperty({ estSolide: true });
        this.river.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_down.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_up.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_left.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_right.setCollisionByProperty({ estSolide: true });

        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Barre de vie
        this.healthContainer = this.add.sprite(100, 40, "CadreVie").setScrollFactor(0);
        this.healthBar = this.add.sprite(this.healthContainer.x, this.healthContainer.y, "BarreVie").setScrollFactor(0);
        this.healthMask = this.add.sprite(this.healthBar.x - (100 - this.health), this.healthBar.y, "BarreVie").setScrollFactor(0);
        this.healthMask.visible = false;
        this.healthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

        //Création Inventaire Monnaie
        this.scoreText = this.add.text(1100, 16, "x" + this.porteMonnaie, { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        this.add.image(1080, 27, "Monnaie").setScale(3).setScrollFactor(0);

        //Récupération Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.gamepad.once('connected', function (pad) {
            console.log("Manette Connecté");
            this.controller = pad;
        }, this);
        
        //Création Collision
        //Joueur
        this.physics.add.collider(this.player, this.bordure);
        this.physics.add.collider(this.player, this.rock);
        this.physics.add.collider(this.player, this.river, null, this.checkTear, this);
        this.physics.add.collider(this.player, this.door, this.opendDoor, null, this);
        this.physics.add.overlap(this.player, this.mob, this.perteVie, this.getHit, this);

        //Pickup
        this.physics.add.overlap(this.player, this.heal, this.gainVie, null, this);
        this.physics.add.overlap(this.player, this.money, this.gainMoney, null, this);
        this.physics.add.overlap(this.player, this.sword, this.swordUnlock, null, this);
        this.physics.add.overlap(this.player, this.bow, this.bowUnlock, null, this);

        //Changement de scene
        this.physics.add.overlap(this.player, this.travelToPlain, this.toPlain, null, this);
        this.physics.add.overlap(this.player, this.travelToTemple, this.toTemple, null, this);

        //Création Collision Attaque
        this.physics.add.overlap(this.attaque_sword, this.bordure, this.clean_attaque, this.if_clean_sword, this);
        this.physics.add.collider(this.fluteATK, this.bordure, this.clean_proj, null, this);
        this.physics.add.collider(this.fluteATK, this.rock, this.destroyRock, null, this);

        //Ennemi
        this.physics.add.collider(this.mob, this.calque_mob_switch_down, this.mob_switch_down, null, this);
        this.physics.add.collider(this.mob, this.calque_mob_switch_up, this.mob_switch_up, null, this);
        this.physics.add.collider(this.mob, this.calque_mob_switch_left, this.mob_switch_left, null, this);
        this.physics.add.collider(this.mob, this.calque_mob_switch_right, this.mob_switch_right, null, this);
        this.physics.add.collider(this.mob, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mob, this.fluteATK, this.kill_mob_bow, null, this);
    }

    update() {
        if (this.player_block == false) {
            //Mouvement
            if (this.cursors.up.isDown || this.controller.up) {
                this.player.setVelocityY(-200);
                this.player.setVelocityX(0);
                this.player.anims.play('up', true);
                this.player_facing = "up";
            }
            else if (this.cursors.down.isDown || this.controller.down) {
                this.player.setVelocityY(200);
                this.player.setVelocityX(0);
                this.player.anims.play('down', true);
                this.player_facing = "down";
            }
            else if (this.cursors.right.isDown || this.controller.right) {
                this.player.setVelocityX(200);
                this.player.setVelocityY(0);
                this.player.anims.play('right', true);
                this.player_facing = "right";
            }
            else if (this.cursors.left.isDown || this.controller.left) {
                this.player.setVelocityX(-200);
                this.player.setVelocityY(0);
                this.player.anims.play('left', true);
                this.player_facing = "left";
            }
            else {
                if (this.player_facing == "left"){
                    this.player.anims.play('left_stop');
                }
                else if (this.player_facing == "right"){
                    this.player.anims.play('right_stop');
                }
                else if (this.player_facing == "up"){
                    this.player.anims.play('up_stop');
                }
                else if (this.player_facing == "down"){
                    this.player.anims.play('down_stop');
                }
                this.player.setVelocityY(0);
                this.player.setVelocityX(0);
            }
            //Attaque
            if (this.cursors.space.isDown && this.unlock_Sword || this.controller.A && this.unlock_Sword) {
                if (this.player_facing == "up") {
                    this.attaque_sword.create(this.player.x, this.player.y - 32, "sword_y");
                }
                else if (this.player_facing == "down") {
                    this.attaque_sword.create(this.player.x, this.player.y + 32, "sword_y");
                }
                else if (this.player_facing == "right") {
                    this.attaque_sword.create(this.player.x + 32, this.player.y, "sword_x");
                }
                else if (this.player_facing == "left") {
                    this.attaque_sword.create(this.player.x - 32, this.player.y, "sword_x");
                }
                this.player_block = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(500, this.delock_attaque, [], this);
            }
            //Bow
            if (this.cursors.shift.isDown && this.unlock_Bow && this.trigger_shoot == false || this.controller.B && this.unlock_Bow && this.trigger_shoot == false) {
                if (this.player_facing == "up") {
                    this.fluteATK.create(this.player.x, this.player.y, "projBow").body.setVelocityY(-200);
                }
                else if (this.player_facing == "down") {
                    this.fluteATK.create(this.player.x, this.player.y, "projBow").body.setVelocityY(200);
                }
                else if (this.player_facing == "right") {
                    this.fluteATK.create(this.player.x, this.player.y, "projBow").body.setVelocityX(200);
                }
                else if (this.player_facing == "left") {
                    this.fluteATK.create(this.player.x, this.player.y, "projBow").body.setVelocityX(-200);
                }
                this.player_block = true;
                this.trigger_shoot = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(1000, this.delock_shoot, [], this);
            }
        }
    }

    //Gestion Pattern Mob
    mob_switch_right(mob) {
        mob.setVelocityX(100);
        mob.setVelocityY(0);
        mob.anims.play('right_mob')
    }

    mob_switch_left(mob) {
        mob.setVelocityX(-100);
        mob.setVelocityY(0);
        mob.anims.play('left_mob')
    }

    mob_switch_up(mob) {
        mob.setVelocityX(0);
        mob.setVelocityY(-100);
        mob.anims.play('up_mob')
    }

    mob_switch_down(mob) {
        mob.setVelocityX(0);
        mob.setVelocityY(100);
        mob.anims.play('down_mob')
    }

    //Kill Mob
    kill_mob(mob) {
        mob.disableBody(true, true)
        this.lootMob(mob);
    }

    kill_mob_bow(mob, projBow) {
        mob.disableBody(true, true)
        projBow.disableBody(true, true)
        this.trigger_shoot = false;
        this.lootMob(mob);
    }

    //Loot Mob
    lootMob(mob) {
        this.loot = Math.floor(Math.random() * (4 - 1)) + 1;
        console.log(this.loot);
        if (this.loot == 1) {
            this.heal.create(mob.x, mob.y, "Soin");
        }
        else if (this.loot == 2) {
            this.money.create(mob.x, mob.y, "Monnaie");
        }
    }

    //Activation / Destruction environnement
    destroyRock(proj, rock) {
        proj.disableBody(true, true);
        rock.disableBody(true, true);
        this.trigger_shoot = false;
    }

    //Clean Attaque
    clean_attaque(attaque) {
        attaque.disableBody(true, true);
    }

    clean_proj(proj) {
        proj.disableBody(true, true);
    }

    if_clean_sword() {
        if (this.trigger_cleanSword == true) {
            this.trigger_cleanSword = false;
            return true
        }
        else {
            return false
        }
    }

    //Delock pour l'attaque
    delock_attaque() {
        this.player_block = false;
        this.trigger_cleanSword = true;
    }

    delock_shoot() {
        this.player_block = false;
        this.trigger_shoot = false;
    }

    //Delock Joueur
    delock_joueur() {
        this.player_block = false;
    }

    //Gestion Frame Imu
    getHit() {
        if (this.player_beHit == false) {
            return true
        }
        else {
            return false
        }
    }

    pinvisible() {
        this.player.setVisible(false);
        this.time.delayedCall(100, this.pvisible, [], this);
    }

    pvisible() {
        if (this.clignotement < 3) {
            this.time.delayedCall(100, this.pinvisible, [], this);
            this.player.visible = true;
            this.clignotement += 1;
        }
        else {
            this.player.visible = true;
            this.clignotement = 0;
            this.player_beHit = false;
        }
    }

    //Gestion Vie
    perteVie(player, mob) {
        this.player_block = true;
        this.player_beHit = true;
        if (mob.body.touching.left) {
            player.setVelocityX(-400);
        }
        else if (mob.body.touching.right) {
            player.setVelocityX(400);
        }
        else if (mob.body.touching.up) {
            player.setVelocityY(-400);
        }
        else if (mob.body.touching.down) {
            player.setVelocityY(400);
        }
        this.pinvisible();
        this.healthMask.x -= 10;
        this.health -= 10;
        if (this.health < 0) {
            this.player_block = true;
            player.setTint(0xff0000);
            this.physics.pause();
        }
        else {
            this.time.delayedCall(200, this.delock_joueur, [], this);
        }
    }

    gainVie(player, heal) {
        heal.disableBody(true, true);
        if (this.health < 100) {
            this.health += 10
            this.healthMask.x += 10;
        }
    }

    gainMoney(player, money) {
        money.disableBody(true, true);
        this.porteMonnaie += 1;
        this.scoreText.setText('x' + this.porteMonnaie);
    }

    //Unlock Power Up
    swordUnlock(player, sword) {
        sword.disableBody(true, true);
        this.add.image(1000, 50, 'sword_y').setScale(2.5).setScrollFactor(0);
        this.unlock_Sword = true;
    }

    bowUnlock(player, bow) {
        bow.disableBody(true, true);
        this.add.image(950, 50, 'Bow').setScale(2.5).setScrollFactor(0);
        this.unlock_Bow = true;
    }

    checkTear() {
        if (this.unlock_Tear == false) {
            return true
        }
        else {
            return false
        }
    }

    opendDoor(player, door) {
        if (this.unlock_Key == true ) {
            door.disableBody(true, true);
            this.doorBreak = false;
        }
    }

    //Fonction Changement de scene
    toPlain() {
        console.log("To plain");
        this.scene.start("rockPlain", {
            porteMonnaie : this.porteMonnaie,
            unlock_Sword : this.unlock_Sword,
            unlock_Bow : this.unlock_Bow,
            unlock_Tear : this.unlock_Tear,
            unlock_Key : this.unlock_Key,
            health : this.health,
            spawnX : 672,
            spawnY : 3134
        });
    }

    toTemple() {
        console.log("To Temple");
        this.scene.start("waterTemple", {
            porteMonnaie : this.porteMonnaie,
            unlock_Sword : this.unlock_Sword,
            unlock_Bow : this.unlock_Bow,
            unlock_Tear : this.unlock_Tear,
            unlock_Key : this.unlock_Key,
            health : this.health,
            spawnX : 1422,
            spawnY : 80
        });
    }
}
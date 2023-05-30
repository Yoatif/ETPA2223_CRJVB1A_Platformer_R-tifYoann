class LvlSelection extends Phaser.Scene{
    constructor(){
        super("LvlSelection");
    }

    init(){
            
    }
    
    preload(){

        this.load.image("background", "assets/titlescreen/background.png");
        this.load.image("menu","assets/titlescreen/bouton_menu.png");
        this.load.image("level1","assets/titlescreen/bouton_level1.png");
        this.load.image("level2","assets/titlescreen/bouton_level2.png");
        this.load.image("level3","assets/titlescreen/bouton_level3.png");


    }

    create(){

        //créer le clicksound
        //this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});

        //créer le background
        this.add.image(448,224,"background");

        //créer le bouton retournant a la scene Titlescreen
        this.menuButton = this.add.image(700,400, "menu").setInteractive();

            this.menuButton.on("pointerdown", () => {
                //this.clicksound.play()
                //this.menuButton.destroy
                //this.menuButton = this.add.image(1350,200,"buton2").setScale(0.5)
                this.time.delayedCall(500, this.onEvent, [], this);
                console.log("play")
                   
            })
            this.menuButton.setScale(0.3);

        this.firstLevelButton = this.add.image(700,100, "level1").setInteractive();

        this.firstLevelButton.on("pointerdown", () => {
            //this.clicksound.play()
            //this.menuButton.destroy
            //this.menuButton = this.add.image(1350,200,"buton2").setScale(0.5)
            this.time.delayedCall(500, this.firstLevel, [], this);
            console.log("play")
                
        })
        this.firstLevelButton.setScale(0.3);

        this.secondLevelButton = this.add.image(700,150, "level2").setInteractive();

        this.secondLevelButton.on("pointerdown", () => {
            //this.clicksound.play()
            //this.menuButton.destroy
            //this.menuButton = this.add.image(1350,200,"buton2").setScale(0.5)
            this.time.delayedCall(500, this.secondLevel, [], this);
            console.log("play")
                
        })
        this.secondLevelButton.setScale(0.3);

        this.thirdLevelButton = this.add.image(700,200, "level3").setInteractive();

        this.thirdLevelButton.on("pointerdown", () => {
            //this.clicksound.play()
            //this.menuButton.destroy
            //this.menuButton = this.add.image(1350,200,"buton2").setScale(0.5)
            this.time.delayedCall(500, this.thirdLevel, [], this);
            console.log("play")
                
        })
        this.thirdLevelButton.setScale(0.3);

        
        
        
    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
    firstLevel(){
        this.scene.start("Scene1")
    }
    secondLevel(){
        this.scene.start("Scene2")
    }
    thirdLevel(){
        this.scene.start("Scene3")
    }
}
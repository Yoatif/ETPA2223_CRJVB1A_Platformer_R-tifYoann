class Credit extends Phaser.Scene{
    constructor(){
        super("Credit");
    }

    init(){
            
    }
    
    preload(){

        this.load.image("backgroundCredit", "assets/titlescreen/background_credit.png");
        this.load.image("menu","assets/titlescreen/bouton_menu.png");
        this.load.image("quit","assets/titlescreen/bouton_quit.png");

    }

    create(){

        //créer le clicksound
        //this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});

        //créer le background
        this.add.image(448,224,"backgroundCredit");

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
        
        this.exitbutton = this.add.image(200,400, "quit").setInteractive();

        this.exitbutton.on("pointerdown", () => {
            //this.clicksound.play()
            window.close()
                
        })
        this.exitbutton.setScale(0.3);


    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
}
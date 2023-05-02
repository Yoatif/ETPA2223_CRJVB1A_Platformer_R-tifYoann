class Titlescreen extends Phaser.Scene {
    constructor() {
        super("Titlescreen");
        }

        init(){
            this.timedEvent;

        }

        preload(){

            //import BG
            this.load.image("background", "assets/menu/croquis_menu_start.png");

            //import bouton
            this.load.image("playButton", "assets/menu/first_start_button.png");
            this.load.image("playButton2", "assets/menu/second_start_button.png");
            this.load.image("exitbutton", "assets/menu/first_exit_button.png");
            this.load.image("exitbutton2", "assets/menu/second_exit_button.png");
            this.load.image("infobutton", "assets/menu/first_info_button.png");
            this.load.image("infobutton2", "assets/menu/second_info_button.png");

            // import audio

            //this.load.audio("theme", ["sound/theme.ogg", "sound/theme.mp3"]);
            this.load.audio("button_sound", ["sound/click_button.ogg", "sound/click_button.mp3"]);

        }

        create(){
            

            //adding theme to Titlescreen
            //this.theme = this.sound.add("theme", {volume: 0.2, loop: true});
            //this.theme.play();

            //button_sound
            this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});
            


            this.add.image(800,400,"background")
                
            //creating start button to play game
            this.playButton = this.add.image(1350,200, "playButton").setInteractive();

            this.playButton.on("pointerdown", () => {
                this.clicksound.play()
                //this.playButton.destroy
                //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
                this.time.delayedCall(1000, this.eventPlay, [], this);
                console.log("play")
                   
            })
            this.playButton.setScale(0.5);

            //creating exit button which close the game
            this.exitbutton = this.add.image(1350,600, "exitbutton").setInteractive();

            this.exitbutton.on("pointerdown", () => {
                this.clicksound.play()
                window.close()
                 
            })
            this.exitbutton.setScale(0.5);


            //creating info button who start info scene
            this.infobutton = this.add.image(250,400, "infobutton").setInteractive();

            this.infobutton.on("pointerdown", () => {
                this.clicksound.play()
                this.time.delayedCall(1000, this.eventInfo, [], this);
                this.scene.start("Info")
                
            })
            this.infobutton.setScale(0.5);

            
        }

        update(){

            /*if (this.cursors.space.isDown){
                this.scene.start("scene1");*/

        }

        eventPlay(){
            this.scene.start("Scene1");
        }

        eventInfo(){
            this.scene.start("Info");
        }

      
}
class Titlescreen extends Phaser.Scene {
    constructor() {
        super("Titlescreen");
        }

        init(){
            this.timedEvent;

        }

        preload(){

            //import BG
            this.load.image("background", "assets/titlescreen/background.png");

            //import bouton
            this.load.image("start", "assets/titlescreen/bouton_start.png");
            this.load.image("info", "assets/titlescreen/bouton_info.png");
            this.load.image("quit", "assets/titlescreen/bouton_quit.png");
            this.load.image("credit", "assets/titlescreen/bouton_credit.png");
            

            // import audio

            //this.load.audio("theme", ["sound/theme.ogg", "sound/theme.mp3"]);
            //this.load.audio("button_sound", ["sound/click_button.ogg", "sound/click_button.mp3"]);

        }

        create(){
            

            //adding theme to Titlescreen
            //this.theme = this.sound.add("theme", {volume: 0.2, loop: true});
            //this.theme.play();

            //button_sound
            //this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});
            


            this.add.image(448,224,"background");
                
            //creating start button to play game
            this.playButton = this.add.image(700,100, "start").setInteractive();

            this.playButton.on("pointerdown", () => {
                //this.clicksound.play()
                //this.playButton.destroy
                //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
                this.time.delayedCall(200, this.eventPlay, [], this);
                console.log("play")
                   
            })
            this.playButton.setScale(0.3);

            //creating exit button which close the game
            this.exitbutton = this.add.image(100,400, "quit").setInteractive();

            this.exitbutton.on("pointerdown", () => {
                //this.clicksound.play()
                window.close()
                 
            })
            this.exitbutton.setScale(0.3);
            //this.exitbutton.setFlipX(true);


            //creating info button who start info scene
            this.infobutton = this.add.image(700,200, "info").setInteractive();

            this.infobutton.on("pointerdown", () => {
               // this.clicksound.play()
                this.time.delayedCall(200, this.eventInfo, [], this);
                //this.scene.start("Info")
                
            })
            this.infobutton.setScale(0.3);

            this.creditbutton = this.add.image(100,200, "credit").setInteractive();

            this.creditbutton.on("pointerdown", () => {
               // this.clicksound.play()
                this.time.delayedCall(200, this.eventCredit, [], this);
                //this.scene.start("Info")
                
            })
            this.creditbutton.setScale(0.3);

            
        }

        update(){

            /*if (this.cursors.space.isDown){
                this.scene.start("scene1");*/

        }

        eventPlay(){
            this.scene.start("LvlSelection");
        }

        eventInfo(){
            this.scene.start("Info");
        }

        eventCredit(){
            this.scene.start("Credit");
        }

      
}
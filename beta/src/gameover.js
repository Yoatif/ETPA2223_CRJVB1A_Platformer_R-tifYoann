class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }
    
    preload(){

        this.load.image("gameOver", "./assets/game_over.png");

    }

    create(){

        this.add.image()

    }

    update(){

    }
}
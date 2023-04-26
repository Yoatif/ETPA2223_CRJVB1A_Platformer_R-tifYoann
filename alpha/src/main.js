var config = {
    type: Phaser.AUTO,
    width: 800, height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    input: { gamepad: true },
    pixelArt : true,
    scene: [Titlescreen,]
};
new Phaser.Game(config);
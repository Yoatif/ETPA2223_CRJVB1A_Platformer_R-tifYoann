var config = {
    width: 896,
    height: 448,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
            
              gravity: { y: 300 },
              debug: true
          }
      },
      pixelArt: true,      
      scene: [Scene1,GameOver]
    }
  
  var game = new Phaser.Game(config);
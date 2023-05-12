var config = {
    width: 1600,
    height: 900,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
            
              gravity: { y: 300 },
              debug: true
          }
      },
      pixelArt: true,      
      scene: [Scene1]
    }
  
  var game = new Phaser.Game(config);
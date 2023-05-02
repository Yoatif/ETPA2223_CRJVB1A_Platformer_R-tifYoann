var config = {
    width: 1600,
    height: 900,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
            
              gravity: { y: 0 },
              debug: true
          }
      },
      pixelArt: true,      
      scene: [Titlescreen,Info,Scene1,Shop]
    }
  
  var game = new Phaser.Game(config);
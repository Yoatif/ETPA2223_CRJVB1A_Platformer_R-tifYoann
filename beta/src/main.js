var config = {
    width: 896,
    height: 448,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
              debug: true
          }
      },
      pixelArt: true,      
      scene: [Titlescreen,Info,Credit,LvlSelection,Scene1]
    }
  
  var game = new Phaser.Game(config);
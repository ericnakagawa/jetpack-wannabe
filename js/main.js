var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', JetpackWannabe.Boot);
game.state.add('Preloader', JetpackWannabe.Preload)
game.state.add('MainMenu', JetpackWannabe.MainMenu)
game.state.add('Game', JetpackWannabe.Game)

game.state.start('Boot');

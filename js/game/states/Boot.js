var JetpackWannabe = function() {

};

JetpackWannabe.Boot = function() {

};

JetpackWannabe.Boot.prototype = {
	preload: function() {
		this.load.image('logo', 'assets/images/logo.png');
		this.load.image('preloadBar', 'assets/images/preloader-bar.png');

	},
	create: function() {
		this.game.stage.backgroundColor = '#fff';
		if(this.game.device.desktop) {
			this.scale.pageAlignHorizontally = true;
		} else {
			this.scale.scaleMode = Phaser.scaleManager.SHOW_ALL;
			this.scale.minWidth = 568;
			this.scale.minHeight = 600;
			this.scale.maxWidth = 2048;
			this.scale.maxHeight = 1536;
			this.scale.forceLandscape = true;
			this.scale.pageAlignHorizontally = true;
			this.scale.setScreenSize(true);
		}

		this.state.start('Preloader');

	}
};
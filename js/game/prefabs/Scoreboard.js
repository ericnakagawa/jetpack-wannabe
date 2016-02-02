var Scoreboard = function(game) {
	Phaser.Group.call(this, game);
}

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
	var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, startText;

	var thatGame = this.game;
	var that = this;
	
	bmd = this.game.add.bitmapData(this.game.width, this.game.height);
	bmd.ctx.fillStyle = "#000";
	bmd.ctx.fillRect(0,0, this.game.width, this.game.height);
	
	background = this.game.add.sprite(0,0, bmd);
	background.alpha = 0.5;

	this.add(background);

	var isNewHighScore = false;
	var currentHighscore = 0;

	var initials = localStorage.getItem('initials');
	while(!initials || initials == "" || initials.length > 4) {
		initials = prompt("Enter your initials:");
		if(initials > 4) {
			alert("Too many letters. Try again.");
		} else {
			localStorage.setItem('initials', initials);
		}
	}

	var Highscore = Parse.Object.extend("Jetpack");
	var highscore = new Highscore();
		highscore.save({score: score, initials: initials}).then(function(object) {
	}).then(function(){

		var highscoreQuery = new Parse.Query("Jetpack");
		highscoreQuery.descending("score", "createdAt");
		highscoreQuery.limit(10);
		highscoreQuery.find().then(function(highscores) {
			if(highscores !== undefined && highscores.length > 0) {
				currentHighscore = highscores[0].get("score");
				if(score >= currentHighscore) {
					isNewHighScore = true;
				}
			}

			that.y = thatGame.height;

			gameoverText = thatGame.add.bitmapText(0,100, 'minecraftia', 'You Died.', 36);
			gameoverText.x = thatGame.width/2 - (gameoverText.textWidth / 2);
			that.add(gameoverText);

			scoreText = thatGame.add.bitmapText(0, 200, 'minecraftia', 'Your Score: ' + score, 24);
			scoreText.x = thatGame.width / 2 - (scoreText.textWidth / 2);  
			that.add(scoreText);

			highScoreText = thatGame.add.bitmapText(0, 250, 'minecraftia', 'High Scores', 24);
			highScoreText.x = thatGame.width / 2 - (highScoreText.textWidth / 2);  
			that.add(highScoreText);

			var didColor = false; // color only one highscore red

			for (var i = highscores.length - 1; i >= 0; i--) {
				highScoreText = thatGame.add.bitmapText(0, 290 + (i * 30), 'minecraftia', ("    " + highscores[i].get("initials")).slice(-4) + " " + highscores[i].get("score"), 18);
				highScoreText.x = thatGame.width / 2 - 50;  
				if(!didColor && highscores[i].get("score") == score) {
					highScoreText.tint = 0xff0000;
					didColor = true;
				}
				that.add(highScoreText);
			};

			startText = thatGame.add.bitmapText(0, 600, 'minecraftia', 'Tap to play again!', 16);
			startText.x = thatGame.width / 2 - (startText.textWidth / 2);  
			that.add(startText);

			if(isNewHighScore) {
				newHighScoreText = thatGame.add.bitmapText(0, 100, 'minecraftia', 'New High Score!', 12);
				newHighScoreText.tint = 0x4ebef7; // '#4ebef7'
				newHighScoreText.x = gameoverText.x + gameoverText.textWidth + 40;
				newHighScoreText.angle = 45;
				that.add(newHighScoreText);
			}

			thatGame.add.tween(that).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

			thatGame.input.onDown.addOnce(that.restart, that);

		}, function(error) {
			console.log(error)
		}); // highscoreQuery.find()

	}); // highscore.save()


};

Scoreboard.prototype.restart = function() {
	this.game.state.start('Game', true, false);
};
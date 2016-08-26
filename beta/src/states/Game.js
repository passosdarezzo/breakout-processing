ColorMemory.Game = function(game){
	// Define constants
	this.isRunning = false;
};

ColorMemory.Game.prototype = {

	create: function(){
		this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'level-1-bg');

		// Sound
		var btnSound = game.add.sprite(300, 10, ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
		btnSound.inputEnabled = true;
		btnSound.events.onInputUp.add(function(){
			ColorMemory.gameOptions.playSound = !ColorMemory.gameOptions.playSound;
			btnSound.loadTexture(ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
			console.log('Sound:' + ColorMemory.gameOptions.playSound);
		});

		// Create a label to use as a button
		btnPause = game.add.sprite(10, 10, 'pause');
		btnPause.inputEnabled = true;
		btnPause.events.onInputUp.add(function () {
			// When the pause button is pressed, we pause the game
			game.paused = !game.paused;

			// Then add the menu
			//menu = game.add.sprite(game.width/2, game.height/2, 'menu');
			menu = game.add.text(game.world.centerX, 250, "PAUSE", {
				font: 'bold 60pt TheMinion',
				fill: '#FDFFB5',
				align: 'center'
			});
			menu.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
			menu.anchor.setTo(0.5, 0.5);

			btnPause.loadTexture('play');
		});

		// Add a input listener that can help us return from being paused
		game.input.onDown.add(unpause, self);

		// And finally the method that handels the pause menu
		function unpause(event){
			// Only act if paused
			if(game.paused){
				// Calculate the corners of the menu
				var x1 = btnPause.position.x, 
					x2 = btnPause.position.x + btnPause.width,
					y1 = btnPause.position.y, 
					y2 = btnPause.position.y + btnPause.height;

				// Check if the click was inside the menu
				if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
					// Remove the menu and the label
					menu.destroy();

					btnPause.loadTexture('pause');

					// Unpause the game
					game.paused = false;
				}
			}
		}
		
	    // Simulate a pointer click/tap input at the center of the stage
	    // when the example begins running.
	    this.game.input.activePointer.x = this.game.width/2;
	    this.game.input.activePointer.y = this.game.height/2;
		
	    var blue = game.add.sprite(10, 10, 'blue-off');
		blue.inputEnabled = true;
		blue.events.onInputUp.add(function(){
			blue.loadTexture('blue-on');
			var timer = game.time.now + 1000;
			game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){blue.loadTexture('blue-off');}, this);
			console.log('Blue Clicked!');
		});

		var green = game.add.sprite(120, 10, 'green-off');
		green.inputEnabled = true;
		green.events.onInputUp.add(function(){
			console.log('Green clicked!');
			green.loadTexture('green-on');
			var timer = game.time.now + 1000;
			game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){green.loadTexture('green-off');}, this);
		});

		var red = game.add.sprite(10, 120, 'red-off');
		red.inputEnabled = true;
		red.events.onInputUp.add(function(){
			console.log('Red clicked!');
			red.loadTexture('red-on');
			var timer = game.time.now + 1000;
			game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){red.loadTexture('red-off');}, this);
		});

		var orange = game.add.sprite(120, 120, 'orange-off');
		orange.inputEnabled = true;
		orange.events.onInputUp.add(function(){
			console.log('Orange clicked!');
			orange.loadTexture('orange-on');
			var timer = game.time.now + 1000;
			game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){orange.loadTexture('orange-off');}, this);
		});







		this.isRunning = true;
	},
	
	beginGame: function(){
		console.log("Game Running: " + this.isRunning);
		this.isRunning = true;
		console.log("Game Running: " + this.isRunning);
		
		console.log(this.NUMBER_OF_BULLETS);
		//this.reg.modal.hideModal("instructions");
	},


	update: function(){
		
	},


};

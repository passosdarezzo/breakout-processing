ColorMemory.Game = function(game){
	// Define constants
	this.isRunning = false;
	this.level_1 = 5;
	this.systemPattern = '';
	this.userPattern = '';
	this.btnGreen = null;
	this.btnRed = null;
	this.btnOrange = null;
	this.btnBlue = null;
};

ColorMemory.Game.prototype = {

	definePattern: function(){
		/*
			G = Green
			R = Red
			O = Orange
			B = Blue
		*/
		console.log('Define Pattern');
		var tons = ["G", "R", "O", "B"];
		for(var i = 0; i <= this.level_1; i++){
			this.systemPattern += tons[Math.floor((Math.random() * 4))];
		};
		console.log(this.systemPattern);
	},

	playGreen: function(){
		this.btnGreen.loadTexture('green-on');
		var timer = game.time.now + 1000;
		game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnGreen.loadTexture('green-off');}, this);
		ColorMemory.Game.userPattern += 'G';

		// DEBUG
		console.log(this.userPattern);
	},

	playRed: function(){
		this.btnRed.loadTexture('red-on');
		var timer = game.time.now + 1000;
		game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnRed.loadTexture('red-off');}, this);
		ColorMemory.Game.userPattern += 'R';
		
		// DEBUG
		console.log(this.userPattern);
	},

	playOrange: function(){
		this.btnOrange.loadTexture('orange-on');
		
		game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnOrange.loadTexture('orange-off');}, this);
		ColorMemory.Game.userPattern += 'O';

		// DEBUG
		console.log(this.userPattern);
	},

	playBlue: function(){
		this.btnBlue.loadTexture('blue-on');
		var timer = game.time.now + 1000;
		game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnBlue.loadTexture('blue-off');}, this);
		ColorMemory.Game.userPattern += 'B';

		// DEBUG
		console.log(this.userPattern);
	},

	generateButtons: function(){
		var ref = this;

		this.btnBlue = game.add.sprite(10, 10, 'blue-off');
		this.btnBlue.inputEnabled = true;
		this.btnBlue.events.onInputUp.add(function(){
			ref.playBlue();
		});

		this.btnGreen = game.add.sprite(120, 10, 'green-off');
		this.btnGreen.inputEnabled = true;
		this.btnGreen.events.onInputUp.add(function(){
			ref.playGreen();
		});

		this.btnRed = game.add.sprite(10, 120, 'red-off');
		this.btnRed.inputEnabled = true;
		this.btnRed.events.onInputUp.add(function(){
			ref.playRed();
		});

		this.btnOrange = game.add.sprite(120, 120, 'orange-off');
		this.btnOrange.inputEnabled = true;
		this.btnOrange.events.onInputUp.add(function(){
			ref.playOrange();
		});
	},
	
	beginGame: function(){
		console.log("Game Running: " + this.isRunning);
		this.isRunning = true;

		this.definePattern();

		this.playPattern();
	},

	playPattern: function(){
		for (var i = 0; i <= this.systemPattern.length; i++) {
			console.log(this.systemPattern.charAt(i));

			var timer = game.time.create(1000, false);
			timer.add(3000);
			//timer.onEvent.add(doSomething, this);
			timer.start();

			switch(this.systemPattern.charAt(i)){
				case "B":
					setTimeout(this.playBlue(), 1500);
					//game.time.events.add(Phaser.Timer.SECOND * 1, function(){this.playBlue();}, this);
					break;
				case "G":
					setTimeout(this.playGreen(), 1500);
					//game.time.events.add(Phaser.Timer.SECOND * 1, function(){this.playGreen();}, this);
					break;
				case "R":
					setTimeout(this.playRed(), 1500);
					//game.time.events.add(Phaser.Timer.SECOND * 1, function(){this.playRed();}, this);
					break;
				case "O":
					setTimeout(this.playOrange(), 1500);
					//game.time.events.add(Phaser.Timer.SECOND * 1, function(){this.playOrange();}, this);
			}
		}
	},

	/**************************************************************/
	/* MAIN LOOP 												  */
	/**************************************************************/
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

	    this.generateButtons();
	    this.beginGame();
	},

	update: function(){
		
	},


};

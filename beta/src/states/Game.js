ColorMemory.Game = function(game){
  // Define constants
  this.isRunning = false;
  this.userTurn = false;
  this.level_1 = 3;
  this.score = 0;
  this.systemPattern = '';
  this.userPattern = '';
  this.btnGreen = null;
  this.btnRed = null;
  this.btnOrange = null;
  this.btnBlue = null;
  this.indice = 0;
};

ColorMemory.Game.prototype = {
  timer:null,

  definePattern: function(){
    console.log('DEBUG - Define Pattern');

    var tons = ["G", "R", "O", "B"];
    for(var i = 0; i <= this.level_1; i++){
    this.systemPattern += tons[Math.floor((Math.random() * 4))];
    };
    console.log(this.systemPattern);
  },

  playGreen: function(){
    console.log('DEBUG - playGreen');
    this.btnGreen.loadTexture('green-on');
    var timer = game.time.now + 1000;
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnGreen.loadTexture('green-off');}, this);
  },

  playRed: function(){
    this.btnRed.loadTexture('red-on');
    var timer = game.time.now + 1000;
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnRed.loadTexture('red-off');}, this);
  },

  playOrange: function(){
    this.btnOrange.loadTexture('orange-on');


    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnOrange.loadTexture('orange-off');}, this);
  },

  playBlue: function(){
    this.btnBlue.loadTexture('blue-on');
    var timer = game.time.now + 1000;
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnBlue.loadTexture('blue-off');}, this);
  },

  generateButtons: function(){
    console.log('DEBUG - generateButtons');
    var ref = this;

    this.btnBlue = game.add.sprite(50, 150, 'blue-off');
    this.btnBlue.inputEnabled = true;
    this.btnBlue.events.onInputUp.add(function(){
      ref.playBlue();
      ref.userPattern += 'B';
    });

    this.btnGreen = game.add.sprite(200, 150, 'green-off');
    this.btnGreen.inputEnabled = true;
    this.btnGreen.events.onInputUp.add(function(){
      ref.playGreen();
      ref.userPattern += 'G';
    });

    this.btnRed = game.add.sprite(50, 280, 'red-off');
    this.btnRed.inputEnabled = true;
    this.btnRed.events.onInputUp.add(function(){
      ref.playRed();
      ref.userPattern += 'R';
    });


    this.btnOrange = game.add.sprite(200, 280, 'orange-off');
    this.btnOrange.inputEnabled = true;
    this.btnOrange.events.onInputUp.add(function(){
      ref.playOrange();
      ref.userPattern += 'O';
    });
  },

  beginGame: function(){
    console.log('DEBUG - beginGame');
    this.isRunning = true;

    this.definePattern();

    console.log('Game Running: ' + this.isRunning);
    console.log('Indice: ' + this.indice);
    console.log('Tamanho: ' + this.systemPattern.length);
    //game.time.events.add(Phaser.Timer.SECOND * 1, this.teste, this);
    timer = game.time.events.loop(Phaser.Timer.SECOND * 1, this.playPattern, this);
  },

  playPattern: function(){
    console.log('DEBUG - playPattern');

    this.indice++;


    if(this.indice > this.systemPattern.length){
      game.time.events.remove(timer);
      this.userTurn = true;
    }


    switch(this.systemPattern.charAt(this.indice)){
      case "B":
      this.playBlue();
      break;
      case "G":
      this.playGreen();
      break;
      case "R":
      this.playRed();
      break;
      case "O":
      this.playOrange();
    }
  },

  /**************************************************************/
  /* MAIN LOOP  */
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

    // Grupo de componentes da Janela Modal
    this.scoreBoardGroup = game.add.group();

    // Grupo de botões
    this.ButtonGroup = game.add.group();

    this.generateButtons();
    this.beginGame();
  },

  update: function(){
    if(this.userTurn){
      var a = this.userPattern;
      var b = this.systemPattern.substring(0, this.userPattern.length);

      console.log('padraoUsuario: ' + this.userPattern);
      console.log('padraoSystema: ' + this.systemPattern);
      console.log('substring: ' + this.systemPattern.substring(0, this.userPattern.length));
      console.log('compare: ' + this.userPattern.localeCompare(this.systemPattern.substring(1, this.userPattern.length)));
      console.log('a:' + a + '-b:' + b);

      if(a.localeCompare(b) != 0){
        console.log('DEBUG - FIM');
        this.gameOver();
      } else if (this.userPattern.length == this.systemPattern.length) {
        console.log('DEBUG - ADICIONA PATTERN');

        this.userTurn = false;
        this.begin();
      }
    }
  },

  gameOver: function(){
    this.game.time.events.stop();
    this.showScoreWin();
  },

  restartGame: function(){

  },

  showScoreWin: function(){
		//this.gameOverLabel = game.add.text(game.world.width / 2,120, this.messageGameOver, {font : '18px Arial', fill: '#ffffff'});
		//this.gameOverLabel.anchor.setTo(0.5, 0.5);

		//this.lifeFinalScore = game.add.text(300,220,'Cat Life: ', {font : '18px Arial', fill: '#ffffff'});
		//this.finalScore = game.add.text(300,180,'Balloons: ', {font : '18px Arial', fill: '#ffffff'})

		this.scoreBoardGroup.create(game.world.width / 2 - 150 , 150, "modalBG");

		this.buttonReload = game.add.sprite(game.world.width / 2 - 30 , 320, "reload");
		this.buttonReload.inputEnabled = true;

		this.buttonReload.events.onInputDown.add(this.restartGame, this);
		this.scoreBoardGroup.add(this.buttonReload);

		//this.scoreBoardGroup.add(this.lifeFinalScore);
		//this.scoreBoardGroup.add(this.finalScore);
		//this.scoreBoardGroup.add(this.gameOverLabel);

		//game.world.bringToTop(this.finalScore);
		//game.world.bringToTop(this.lifeFinalScore);

		//this.lifeFinalScore.text = "Cat Life: "+this.lifes;
		//this.finalScore.text = "Balloons: "+this.counterKillBalloons;

		this.game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
	}

};

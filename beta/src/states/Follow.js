ColorMemory.Follow = function(game){
  // Define constants
  this.isRunning = false;
  this.userTurn = false;
  this.score = 0;
  this.scoreBoard = null;
  this.sPat = '';
  this.uPat = '';
  this.btnGreen = null;
  this.btnRed = null;
  this.btnOrange = null;
  this.btnBlue = null;
  this.greenNote = null;
  this.redNote = null;
  this.orangeNote = null;
  this.blueNote = null;
  this.indice = 0;
  this.myText = "";
  this.myTextBkg = null;
  this.successNote = null;
  this.gameOverNote = null;
  this.life = 3;
};

ColorMemory.Follow.prototype = {
  timer:null,
  
  isUserTurn: function(option){
	this.userTurn = option;
	
	this.btnBlue.input.enabled = option;
	this.btnGreen.input.enabled = option;
	this.btnOrange.input.enabled = option;
	this.btnRed.input.enabled = option;
  },

  generateSounds: function(){
    this.greenNote = game.add.audio('green-note');
    this.redNote = game.add.audio('red-note');
    this.orangeNote = game.add.audio('orange-note');
    this.blueNote = game.add.audio('blue-note');
    this.successNote = game.add.audio('success');
    this.gameOverNote = game.add.audio('game-over');
  },

  generateButtons: function(){
    var ref = this;

    this.btnBlue = game.add.sprite(20, 120, 'blue-off');
    this.btnBlue.inputEnabled = true;
    this.btnBlue.events.onInputUp.add(function(){
      ref.playBlue();
      ref.uPat += 'B';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });

    this.btnGreen = game.add.sprite(game.world.width - 180, game.world.height - 250, 'green-off');
    this.btnGreen.inputEnabled = true;
    this.btnGreen.events.onInputUp.add(function(){
      ref.playGreen();
      ref.uPat += 'G';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });

    this.btnRed = game.add.sprite(20, game.world.height - 250, 'red-off');
    this.btnRed.inputEnabled = true;
    this.btnRed.events.onInputUp.add(function(){
      ref.playRed();
      ref.uPat += 'R';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });

    this.btnOrange = game.add.sprite(game.world.width - 180, 120, 'orange-off');
    this.btnOrange.inputEnabled = true;
    this.btnOrange.events.onInputUp.add(function(){
      ref.playOrange();
      ref.uPat += 'O';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });
  },

  start: function(){
	this.isUserTurn(false);
    this.resetValues();
	this.showReady();
	
	game.time.events.add(Phaser.Timer.SECOND * 2.5, this.increaseLevel, this);

  },

  resetValues: function(){
    this.uPat = '';
    this.sPat = '';
    this.timer = null;
    this.score = 0;
	this.scoreBoard.setScore(this.score, false);
    this.userTurn = false;
    this.isRunning = true;
  },

  increaseLevel: function(){
	  console.log('Increase Level!!!');
	this.drawText('Computer');

    var tons = ["G", "R", "O", "B"];
	
	for(var i = 0; i < ColorMemory.stages[ColorMemory.level].step; i++){
		if(this.sPat.length<  ColorMemory.stages[ColorMemory.level].patSize)
			this.sPat += tons[Math.floor((Math.random() * 4))];
	}
	
    this.uPat = '';
    this.indice = 0;

    this.playPattern();
  },

  playPattern:function(){
    //timer = game.time.create(true);
    //timer.add(Phaser.Timer.SECOND, this.playPattern, this);
    //timer.start();
	this.ready.destroy();
    this.timer = game.time.events.loop(Phaser.Timer.SECOND * 0.6, this.__playPattern, this);
  },
  __playPattern: function(){
    switch(this.sPat.charAt(this.indice)){
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

    this.indice++;

    if(this.indice > this.sPat.length){
      game.time.events.remove(this.timer);
      this.isUserTurn(true);
    }
  },

  playGreen: function(){
    if(ColorMemory.gameOptions.playSound){
      this.greenNote.play();  
    }
    
    this.btnGreen.loadTexture('green-on');
    var timer = game.time.now + 1000;
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnGreen.loadTexture('green-off');}, this);
  },
  playRed: function(){
    if(ColorMemory.gameOptions.playSound){
      this.redNote.play();  
    }

    this.btnRed.loadTexture('red-on');
    var timer = game.time.now + 1000;
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnRed.loadTexture('red-off');}, this);
  },
  playOrange: function(){
    if(ColorMemory.gameOptions.playSound){
      this.orangeNote.play();  
    }
    this.btnOrange.loadTexture('orange-on');


    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnOrange.loadTexture('orange-off');}, this);
  },
  playBlue: function(){
    if(ColorMemory.gameOptions.playSound){
      this.blueNote.play();  
    }
    this.btnBlue.loadTexture('blue-on');
    var timer = game.time.now + 1000;
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){this.btnBlue.loadTexture('blue-off');}, this);
  },

  gameOver: function(){
    if(ColorMemory.gameOptions.playSound){
      this.gameOverNote.play();
    }
    this.btnGreen.destroy();
    this.btnBlue.destroy();
    this.btnRed.destroy();
    this.btnOrange.destroy();
    this.myText.destroy();
    this.isRunning = false;
    this.game.time.events.stop();
    this.showScoreWin();
  },

  reStart: function(){
    this.game.time.events.start();
    this.game.state.start(game.state.current);
  },

  showScoreWin: function(){

    //this.lifeFinalScore = game.add.text(300,220,'Cat Life: ', {font : '18px Arial', fill: '#ffffff'});
    //this.finalScore = game.add.text(300,180,'Balloons: ', {font : '18px Arial', fill: '#ffffff'})
    this.bgScore = game.add.sprite(game.world.centerX , 250, "modalBG");
    this.bgScore.anchor.setTo(0.5, 0.5);

    this.scoreBoardGroup.add(this.bgScore);
    //this.scoreBoardGroup.anchor.setTo(0.5, 0.5);
    //this.scoreBoardGroup.scale.setTo(1, 1);
    game.world.bringToTop(this.scoreBoardGroup);

    this.buttonReload = game.add.sprite(game.world.centerX, 430, "play");
    this.scoreBoardGroup.add(this.buttonReload);
    this.buttonReload.anchor.setTo(0.5, 0.5);
    this.buttonReload.inputEnabled = true;

    this.buttonReload.events.onInputDown.add(this.reStart, this);
    //this.buttonReload.alignIn(game.world.bounds, Phaser.CENTER);

    //game.world.bringToTop(this.finalScore);
    //game.world.bringToTop(this.lifeFinalScore);

    game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
  },

  showReady: function(){
	    this.ready = game.add.sprite(game.world.centerX , game.world.centerY, "ready");
		this.ready.anchor.setTo(0.5, 0.5);
		// Reduz imagem para depois ampliar
		this.ready.scale.set(0.1);
		var ref = this;
		var killTween = game.add.tween(this.ready.scale).to( { x: 1, y: 1 }, 3500, Phaser.Easing.Elastic.Out);
		killTween.onComplete.addOnce(function(){
			ref.ready.kill();
		}, this);
		killTween.start();
		
		/*
		1 - exemplo
		var killTween = game.add.tween(brick.scale);
		killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
		killTween.onComplete.addOnce(function(){
			brick.kill();
		}, this);
		killTween.start();
		
		2 - exemplo
		tween = game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
		*/

  },
  
  showCongratz: function(){
	  this.isUserTurn(false);
	  
	    this.ready = game.add.sprite(game.world.centerX , game.world.centerY, "congratz");
		this.ready.anchor.setTo(0.5, 0.5);
		// Reduz imagem para depois ampliar
		this.ready.scale.set(0.1);
		var ref = this;
		var killTween = game.add.tween(this.ready.scale).to( { x: 1, y: 1 }, 1600, Phaser.Easing.Elastic.Out);
		killTween.onComplete.addOnce(function(){
			ref.ready.kill();
		}, this);
		killTween.start();

		game.time.events.add(Phaser.Timer.SECOND * 1, this.increaseLevel, this);
  },
  
  drawText: function(texto){
	if(texto){
		this.myText.setText(texto);
		this.myTextBkg = game.add.graphics();
		this.myTextBkg.beginFill(0x000000, 0.2);
		this.myTextBkg.drawRect(0, game.world.centerY - 40, 800, 80);
	} else {
		this.myTextBkg.destroy();
        this.myText.setText(texto);
	}
  },
  
  /**************************************************************/
  /* MAIN LOOP  */
  /**************************************************************/
  create: function(){
    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'level-1-bg');

    // Sound
    var btnSound = game.add.sprite(game.world.width - 100, 20, ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
    btnSound.inputEnabled = true;
    btnSound.events.onInputUp.add(function(){
      ColorMemory.gameOptions.playSound = !ColorMemory.gameOptions.playSound;
      btnSound.loadTexture(ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
    });

      // Grupo de componentes da Janela Modal
      this.scoreBoardGroup = game.add.group();

      // Grupo de botões
      this.ButtonGroup = game.add.group();

	  // Computer Text
	  var styleText = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
      this.myText = game.add.text(game.world.centerX, game.world.centerY, "", styleText);
      this.myText.anchor.setTo(0.5, 0.5);

      // PONTUAÇÃO
      this.scoreBoard = new Counter(this.game, 0, 0);
      game.add.existing(this.scoreBoard);
      this.scoreBoard.x = 60;
      this.scoreBoard.y = 20;
      this.scoreBoard.setScore(this.score, false);
	  
      this.generateSounds();
      this.generateButtons();
      this.start();
  },

  update: function(){
    //this.scoreBoard.setText(this.score);
    

    if(this.isRunning){
      if(this.userTurn){
		this.drawText('');

        var a = this.uPat;
        var b = this.sPat.substring(0, this.uPat.length);

        if(a.localeCompare(b) != 0){
			if(this.life <= 0){
				this.gameOver();
			} else {
				// Errou mas ainda tem vida
				this.life -= 1;
				this.uPat = this.uPat.substring(0, this.uPat.length - 1);
				console.log('Life: ' + this.life);
			}
          
        } else if (this.uPat.length == this.sPat.length && this.sPat.length != ColorMemory.patternSize) {
          if(ColorMemory.gameOptions.playSound){
            this.successNote.play();  
          }
          
          this.showCongratz();
        } else if (this.uPat.length == this.sPat.length && this.sPat.length == ColorMemory.patternSize) {
          /*if(ColorMemory.gameOptions.playSound){
            this.successNote.play();  
          }
          
          this.showCongratz();*/
		  
		  console.log('Show Level Clear');
        }
      }
    }
  }
};
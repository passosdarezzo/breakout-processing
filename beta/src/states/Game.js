ColorMemory.Game = function(game){
  // Define constants
  this.isRunning = false;
  this.userTurn = false;
  this.level_1 = 1;
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
  this.successNote = null;
  this.gameOverNote = null;
};

ColorMemory.Game.prototype = {
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
    console.log('DEBUG - generateButtons');
    var ref = this;

    this.btnBlue = game.add.sprite(40, 100, 'blue-off');
    this.btnBlue.inputEnabled = true;
    this.btnBlue.events.onInputUp.add(function(){
      ref.playBlue();
      ref.uPat += 'B';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });

    this.btnGreen = game.add.sprite(200, 100, 'green-off');
    this.btnGreen.inputEnabled = true;
    this.btnGreen.events.onInputUp.add(function(){
      ref.playGreen();
      ref.uPat += 'G';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });

    this.btnRed = game.add.sprite(40, 290, 'red-off');
    this.btnRed.inputEnabled = true;
    this.btnRed.events.onInputUp.add(function(){
      ref.playRed();
      ref.uPat += 'R';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });


    this.btnOrange = game.add.sprite(200, 290, 'orange-off');
    this.btnOrange.inputEnabled = true;
    this.btnOrange.events.onInputUp.add(function(){
      ref.playOrange();
      ref.uPat += 'O';
      ref.score++;
	  ref.scoreBoard.setScore(ref.score, true);
    });
  },

  start: function(){
    console.log('DEBUG - start');

    this.resetValues();
	this.showReady();
	// timer
    this.increaseLevel();

    //console.log('Game Running: ' + this.isRunning);
    //console.log('Indice: ' + this.indice);
    //console.log('Tamanho: ' + this.sPat.length);
    //console.log('padrao Usuario: ' + this.uPat);
    //console.log('padrao Sistema: ' + this.sPat);
  },

  resetValues: function(){
    console.log('DEBUG - resetValues');

    this.uPat = '';
    this.sPat = '';
    this.timer = null;
    this.score = 0;
	this.scoreBoard.setScore(this.score, false);
    this.userTurn = false;
    this.isRunning = true;
  },

  increaseLevel: function(){
    console.log('DEBUG - increaseLevel');

    var tons = ["G", "R", "O", "B"];
    //for(var i = 0; i <= this.level_1; i++){
      this.sPat += tons[Math.floor((Math.random() * 4))];
    //};
    console.log('Padrão Sistema: ' + this.sPat);
    this.isUserTurn(false);
    this.uPat = '';
    this.indice = 0;

    this.playPattern();
  },

  playPattern:function(){
    //timer = game.time.create(true);
    //timer.add(Phaser.Timer.SECOND, this.playPattern, this);
    //timer.start();
    this.timer = game.time.events.loop(Phaser.Timer.SECOND * 0.6, this.__playPattern, this);
  },
  __playPattern: function(){
    console.log('DEBUG - playPattern');

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
    //console.log('DEBUG - playGreen');

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
    console.log('DEBUG - gameOver');

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
    console.log('DEBUG - reStart');

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
		
		game.add.tween(this.ready.scale).to( { x: 2, y: 2 }, 700, Phaser.Easing.Linear.None, true);

  },
  
  /**************************************************************/
  /* MAIN LOOP  */
  /**************************************************************/
  create: function(){
    console.log('DEBUG - create');
    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'level-1-bg');

    // Sound
    var btnSound = game.add.sprite(280, 20, ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
    btnSound.inputEnabled = true;
    btnSound.events.onInputUp.add(function(){
      ColorMemory.gameOptions.playSound = !ColorMemory.gameOptions.playSound;
      btnSound.loadTexture(ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
      console.log('Sound:' + ColorMemory.gameOptions.playSound);
    });

      // Grupo de componentes da Janela Modal
      this.scoreBoardGroup = game.add.group();

      // Grupo de botões
      this.ButtonGroup = game.add.group();

      this.myText = game.add.text(game.world.centerX, game.world.centerY, "", { font: "bold 32px Arial", fill: "#fff"});
      this.myText.anchor.setTo(0.5, 0.5);

      // PONTUAÇÃO
      this.scoreBoard = new Counter(this.game, 0, 0);
      game.add.existing(this.scoreBoard);
      this.scoreBoard.x = 50;
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

        this.myText.setText('');

        var a = this.uPat;
        var b = this.sPat.substring(0, this.uPat.length);

        //console.log('padrao Usuario: ' + this.uPat);
        //console.log('padrao Sistema: ' + this.sPat);

        if(a.localeCompare(b) != 0){
          this.gameOver();
        } else if (this.uPat.length == this.sPat.length) {
          console.log('DEBUG - ADICIONA PATTERN');
          if(ColorMemory.gameOptions.playSound){
            this.successNote.play();  
          }
          
          this.increaseLevel();
        }
      } else {
        this.myText.setText('Computer');
      }
    }
  }
};
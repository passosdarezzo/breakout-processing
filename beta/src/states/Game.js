ColorMemory.Game = function(game){
  // Define constants
  this.isRunning = false;
  this.userTurn = false;
  this.level_1 = 1;
  this.score = 0;
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
};

ColorMemory.Game.prototype = {
  timer:null,

  generateSounds: function(){
    this.greenNote = game.add.audio('green-note');
    this.redNote = game.add.audio('red-note');
    this.orangeNote = game.add.audio('orange-note');
    this.blueNote = game.add.audio('blue-note');
  },

  generateButtons: function(){
    console.log('DEBUG - generateButtons');
    var ref = this;

    this.btnBlue = game.add.sprite(50, 150, 'blue-off');
    this.btnBlue.inputEnabled = true;
    this.btnBlue.events.onInputUp.add(function(){
      ref.playBlue();
      ref.uPat += 'B';
    });

    this.btnGreen = game.add.sprite(200, 150, 'green-off');
    this.btnGreen.inputEnabled = true;
    this.btnGreen.events.onInputUp.add(function(){
      ref.playGreen();
      ref.uPat += 'G';
    });

    this.btnRed = game.add.sprite(50, 280, 'red-off');
    this.btnRed.inputEnabled = true;
    this.btnRed.events.onInputUp.add(function(){
      ref.playRed();
      ref.uPat += 'R';
    });


    this.btnOrange = game.add.sprite(200, 280, 'orange-off');
    this.btnOrange.inputEnabled = true;
    this.btnOrange.events.onInputUp.add(function(){
      ref.playOrange();
      ref.uPat += 'O';
    });
  },

  start: function(){
    console.log('DEBUG - start');

    this.resetValues();

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
    this.userTurn = false;
    this.uPat = '';
    this.indice = 0;

    this.playPattern();
  },

  playPattern:function(){
    //timer = game.time.create(true);
    //timer.add(Phaser.Timer.SECOND, this.playPattern, this);
    //timer.start();
    this.timer = game.time.events.loop(Phaser.Timer.SECOND * 0.8, this.__playPattern, this);
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
      this.userTurn = true;
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
    this.btnGreen.destroy();
    this.btnBlue.destroy();
    this.btnRed.destroy();
    this.btnOrange.destroy();
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
    this.gameOverLabel = game.add.text(game.world.centerX , 250, this.messageGameOver, {font : '30px Arial', fill: '#000000'});
    this.gameOverLabel.anchor.setTo(0.5, 0.5);

    //this.lifeFinalScore = game.add.text(300,220,'Cat Life: ', {font : '18px Arial', fill: '#ffffff'});
    //this.finalScore = game.add.text(300,180,'Balloons: ', {font : '18px Arial', fill: '#ffffff'})
    this.bgScore = game.add.sprite(game.world.centerX , 300, "modalBG");
    this.bgScore.anchor.setTo(0.5, 0.5);

    this.scoreBoardGroup.add(this.bgScore);
    //this.scoreBoardGroup.anchor.setTo(0.5, 0.5);
    //this.scoreBoardGroup.scale.setTo(1, 1);
    game.world.bringToTop(this.scoreBoardGroup);

    this.buttonReload = game.add.sprite(game.world.centerX, 320, "play");
    this.scoreBoardGroup.add(this.buttonReload);
    this.buttonReload.anchor.setTo(0.5, 0.5);
    this.buttonReload.inputEnabled = true;

    this.buttonReload.events.onInputDown.add(this.reStart, this);
    //this.buttonReload.alignIn(game.world.bounds, Phaser.CENTER);

    //game.world.bringToTop(this.finalScore);
    //game.world.bringToTop(this.lifeFinalScore);

    this.scoreBoardGroup.add(this.gameOverLabel);
    game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
  },

  /**************************************************************/
  /* MAIN LOOP  */
  /**************************************************************/
  create: function(){
    console.log('DEBUG - create');
    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'level-1-bg');

    // Sound
    var btnSound = game.add.sprite(300, 10, ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
    btnSound.inputEnabled = true;
    btnSound.events.onInputUp.add(function(){
      ColorMemory.gameOptions.playSound = !ColorMemory.gameOptions.playSound;
      btnSound.loadTexture(ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
      console.log('Sound:' + ColorMemory.gameOptions.playSound);
    });

      // Simulate a pointer click/tap input at the center of the stage
      // when the example begins running.
      //this.game.input.activePointer.x = this.game.width/2;
      //this.game.input.activePointer.y = this.game.height/2;

      // Grupo de componentes da Janela Modal
      this.scoreBoardGroup = game.add.group();

      // Grupo de botões
      this.ButtonGroup = game.add.group();

      this.myText = game.add.text(game.world.centerX, 450, "", { font: "bold 32px Arial", fill: "#fff"});
      this.myText.anchor.setTo(0.5, 0.5);
      //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
      //this.myText.setTextBounds(0, 100, 800, 100);

      this.generateSounds();
      this.generateButtons();
      this.start();
  },

  update: function(){
    if(this.isRunning){
      if(this.userTurn){

        this.myText.setText('CrisTiano');

        var a = this.uPat;
        var b = this.sPat.substring(0, this.uPat.length);

        //console.log('padrao Usuario: ' + this.uPat);
        //console.log('padrao Sistema: ' + this.sPat);

        if(a.localeCompare(b) != 0){
          this.messageGameOver = 'Game Over';
          this.gameOver();
        } else if (this.uPat.length == this.sPat.length) {
          console.log('DEBUG - ADICIONA PATTERN');
          this.increaseLevel();
        }
      } else {
        this.myText.setText('Computador');
      }
    }
  }

};

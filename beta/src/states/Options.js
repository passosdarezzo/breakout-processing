var Options = Options || function(){};



Options.prototype = {

	menuConfig: {
		className: "inverse",
		startY: 260,
		startX: "center"
	},

	init: function(){
		this.titleText = this.game.make.text(this.game.world.centerX, 100, "Defenda a Lua", {
	      font: 'bold 60pt TheMinion',
	      fill: '#EDFFB5',
	      align: 'center'
	    });
	    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	    this.titleText.anchor.set(0.5);
	    this.optionCount = 1;

	},

	create: function(){
		var playSound = gameOptions.playSound;
        var playMusic = gameOptions.playMusic;
        var fullScreen = gameOptions.fullScreen;

	    game.add.sprite(0, 0, 'options-bg');
	    game.add.existing(this.titleText);
	    this.addMenuOption(playMusic ? 'Desativar Música' : 'Tocar Música', function (target) {
	      playMusic = !playMusic;
	      target.text = playMusic ? 'Desativar Música' : 'Tocar Música';
	      musicPlayer.volume = playMusic ? 1 : 0;
	    });
	    this.addMenuOption(playSound ? 'Desativar Sons' : 'Tocar Sons', function (target) {
	      playSound = !playSound;
	      target.text = playSound ? 'Desativar Sons' : 'Tocar Sons';
	    });
	    this.addMenuOption(fullScreen ? 'Windowed' : 'FullScreen', function (target) {
			fullScreen = !fullScreen;
			target.text = fullScreen ? 'FullScreen' : 'Windowed';

			if (game.scale.isFullScreen){
				game.scale.stopFullScreen();
			} else {
				game.scale.startFullScreen(false);
			}
	    });
	    this.addMenuOption('<- Voltar', function () {
	      game.state.start("GameMenu");
	    });
	}, 

	update: function(){

	}
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);

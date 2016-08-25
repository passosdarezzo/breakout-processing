BetaAsteroid.GameMenu = function(game){};

BetaAsteroid.GameMenu.prototype = {
	menuConfig:{
		className: "inverse",
		startY: 260,
		startX: 30
	},

	init: function(){
		this.titleText = this.game.make.text(this.game.world.centerX, 100, "Defenda a Lua", {
			font: 'bold 60pt TheMinion',
			fill: '#FDFFB5',
			align: 'center'
		});
		this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.titleText.anchor.set(0.5);
		this.optionCount = 1;
	},

	create: function(){
		this.game.add.sprite(0, 0, 'menu-bg');

		// Tocar música
		musicPlayer.play();

		// Adicionar background
		this.game.stage.disableVisibilityChange = true;
		this.game.add.existing(this.titleText);

		this.addMenuOption('START', function(){
			musicPlayer.stop();
			this.game.state.start('Game');
		});
/*
		this.addMenuOption('Opções', function(){
			this.game.state.start('Options');
		});

		this.addMenuOption('Autor', function(){
			this.game.state.start('Credits');
		});
		*/
	}, 

	update: function(){

	}
};

Phaser.Utils.mixinPrototype(BetaAsteroid.GameMenu.prototype, mixins);
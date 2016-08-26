ColorMemory.Splash = function(game){};

ColorMemory.Splash.prototype = {

	loadScripts: function(){
		this.load.script('GameMenu', 'src/states/GameMenu.js');
		this.load.script('Game', 'src/states/Game.js');
		/*this.load.script('GameOver', 'src/states/GameOver.js');*/
	},

	loadBgm: function(){
	},

	loadImages: function(){
		this.load.image('blue-on', 'asset/images/blue-tile-on.png');
		this.load.image('blue-off', 'asset/images/blue-tile-off.png');
		this.load.image('red-on', 'asset/images/red-tile-on.png');
		this.load.image('red-off', 'asset/images/red-tile-off.png');
		this.load.image('green-on', 'asset/images/green-tile-on.png');
		this.load.image('green-off', 'asset/images/green-tile-off.png');
		this.load.image('orange-on', 'asset/images/orange-tile-on.png');
		this.load.image('orange-off', 'asset/images/orange-tile-off.png');

		this.load.image('menu-bg', 'asset/images/menu-bg-.png');
		this.load.image('sound-on', 'asset/images/sound-on.png');
		this.load.image('sound-off', 'asset/images/sound-off.png');
		/*this.load.image('options-bg', 'asset/images/options-bg.jpg');
		this.load.image('level-1-bg', 'asset/images/level-1-bg.png');*/
		this.load.image('play', 'asset/images/play.png');
		this.load.image('pause', 'asset/images/pause.png');
		/*this.load.image("mouseLeft", "asset/images/mouse-left.png");
		this.load.image("modalBG","asset/images/modalBG.png");
		this.load.image('yes', 'asset/images/yes.png');
		this.load.image('no', 'asset/images/no.png');
		this.load.image('tryagain', 'asset/images/tryagain.png');
		this.load.image('gameover', 'asset/images/gameover.png');*/
	},

	loadFonts: function(){
		WebFontConfig = {
			custom: {
				families: ['TheMinion'],
				urls: ['asset/style/theminion.css']
			}
		};
		
		this.load.atlasJSONArray('numbers', 'asset/images/numbers.png', 'asset/images/numbers.json');
	},

	addGameStates: function(){
		this.state.add('GameMenu', ColorMemory.GameMenu);
		this.state.add('Game', ColorMemory.Game);
		/*this.state.add('GameOver', ColorMemory.GameOver);*/
	},

	addGameMusic: function(){
		/*musicPlayer = this.add.audio('dangerous');
		musicPlayer.loop = true;*/
	},

	// *******************************************************
	// MAIN LOOP 
	// *******************************************************
	init: function(){
		// Background
		this.add.sprite(0, 0, 'splash-bg');

		// Barra de progresso
		this.loadingBar = this.make.sprite(this.world.centerX, 400, 'loading');
		this.loadingBar.anchor.setTo(0);
		
		// Logo
		this.logo = this.make.sprite(this.world.centerX, 200, 'brand');
		this.logo.scale.setTo(0, 200);
		
		// Texto em cima da barra de rolagem
		this.status = this.make.text(this.world.centerX, 360, '0x01DABBAD3', {fill: 'white'});
		this.status.anchor.setTo(0.5);

		// define o centro do objeto como ancora
		utils.centerGameObjects([this.logo, this.loadingBar]);
	},

	preload: function(){
		this.add.existing(this.logo).scale.setTo(0.5);
		this.add.existing(this.loadingBar);
		this.add.existing(this.status);

		// Define a barra de progresso
		this.load.setPreloadSprite(this.loadingBar);

		this.loadScripts();
		this.loadImages();
		this.loadFonts();
		this.loadBgm();
	},

	create: function(){
		if(!game.device.desktop){
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			document.body.style.backgroundColor = '#3498db';

			game.scale.minWidth = 250;
			game.scale.minHeight = 170;
			game.scale.maxWidth = 384;
			game.scale.maxHeight = 480;

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;

			game.scale.setScreenSize(true)

		}
		this.addGameStates();
		this.addGameMusic();

		// Aguarda 1s e inicia o menu
		setTimeout(function(){
			this.game.state.start('GameMenu');
		}, 1500);
	}
};
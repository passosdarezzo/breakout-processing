ColorMemory.Splash = function(game){};

ColorMemory.Splash.prototype = {

	loadScripts: function(){
		this.load.script('GameMenu', 'src/states/GameMenu.js');
		this.load.script('Follow', 'src/states/Follow.js');
		this.load.script('Endless', 'src/states/Endless.js');
		this.load.script('LevelSelect', 'src/states/LevelSelect.js');
		this.load.script('Count', 'lib/Counter.js');
	},

	loadBgm: function(){
		game.load.audio('blue-note', 'asset/bgm/blue-note.mp3');
		game.load.audio('green-note', 'asset/bgm/green-note.mp3');
		game.load.audio('red-note', 'asset/bgm/red-note.mp3');
		game.load.audio('orange-note', 'asset/bgm/orange-note.mp3');
		game.load.audio('success', 'asset/bgm/success.mp3');
		game.load.audio('game-over', 'asset/bgm/game-over.mp3');
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

		this.load.image('sound-on', 'asset/images/sound-on.png');
		this.load.image('sound-off', 'asset/images/sound-off.png');
		this.load.image("modalBG","asset/images/modalBG.png");
		this.load.image("play","asset/images/play.png");
		this.load.image('level-1-bg', 'asset/images/level-1-bg.png');
		this.load.image('ready', 'asset/images/ready.png');
		this.load.image('congratz', 'asset/images/congratz.png');
		
		this.load.spritesheet("levels", "asset/images/levels.png", ColorMemory.thumbWidth, ColorMemory.thumbHeight);
		this.load.spritesheet("level_arrows", "asset/images/level_arrows.png", 48, 48);
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
		this.state.add('Endless', ColorMemory.Endless);
		this.state.add('LevelSelect', ColorMemory.LevelSelect);
		this.state.add('Follow', ColorMemory.Follow);
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
		this.status = this.make.text(this.world.centerX, 360, 'Loading', {fill: 'white'});
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

		this.addGameStates();
		this.addGameMusic();

		// Aguarda 1s e inicia o menu
		setTimeout(function(){
			//this.game.state.start('Game');
			//this.game.state.start('LevelSelect');
			this.game.state.start('GameMenu');
		}, 1000);
	}
};

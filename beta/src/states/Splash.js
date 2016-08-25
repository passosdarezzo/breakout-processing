BetaAsteroid.Splash = function(game){};

BetaAsteroid.Splash.prototype = {

	loadScripts: function(){
		this.load.script('style', 'lib/style.js');
		this.load.script('mixins', 'lib/mixins.js');
		this.load.script('Count', 'lib/Counter.js');
		this.load.script('WebFont', 'vendor/webfontloader.js');
		this.load.script('Modal', 'vendor/modal.js');
		this.load.script('GameMenu', 'src/states/GameMenu.js');
		this.load.script('Game', 'src/states/Game.js');
		this.load.script('GameOver', 'src/states/GameOver.js');
		this.load.script('Credits', 'src/states/Credits.js');
		this.load.script('Options', 'src/states/Options.js');
		this.load.script('LifeBar', 'src/states/LifeBar.js');
	},

	loadBgm: function(){
		// thanks Kevin Macleod at http://incompetech.com/
		this.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
		this.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
	},

	loadImages: function(){
		this.load.image('gun', 'asset/images/gun.png');
		this.load.image('base-gun', 'asset/images/base-gun.png');
		this.load.image('bullet', 'asset/images/bullet.png');
		this.load.image('menu-bg', 'asset/images/menu-bg.png');
		this.load.image('options-bg', 'asset/images/options-bg.jpg');
		this.load.image('level-1-bg', 'asset/images/level-1-bg.png');
		this.load.image('moon', 'asset/images/moon.png');
		this.load.image('play', 'asset/images/play.png');
		this.load.image('pause', 'asset/images/pause.png');
		this.load.image("mouseLeft", "asset/images/mouse-left.png");
		this.load.image("star", "asset/images/star.png");
		this.load.image("modalBG","asset/images/modalBG.png");
		this.load.image('lifeBar', 'asset/images/life-bar.png');
		this.load.image('yes', 'asset/images/yes.png');
		this.load.image('no', 'asset/images/no.png');
		this.load.image('tryagain', 'asset/images/tryagain.png');
		this.load.image('gameover', 'asset/images/gameover.png');

		this.load.atlasJSONHash('shootAsteroid', 'asset/images/shoot_asteroid.png', 'asset/images/shoot_asteroid.json');
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
		this.state.add('Options', Options);
		this.state.add('GameMenu', BetaAsteroid.GameMenu);
		this.state.add('Game', BetaAsteroid.Game);
		this.state.add('GameOver', GameOver);
	},

	addGameMusic: function(){
		musicPlayer = this.add.audio('dangerous');
		musicPlayer.loop = true;
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
		this.status = this.make.text(this.world.centerX, 360, 'LOADING', {fill: 'white'});
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
			this.game.state.start('GameMenu');
		}, 1500);
	}
};
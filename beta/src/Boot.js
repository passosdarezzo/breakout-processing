// *******************************************************
// GLOBAL VARIABLES
// *******************************************************
var BetaAsteroid = {
	/* Here we've just got some global level vars that persist regardless of State swaps */
	score: 0,
	
	/* Quantidade de vida do personagem */
	life: 10,
	
	/* Your game can check ShootAsteroid.orientated in internal loops to know if it should pause or not */
	orientated: false,

	musicPlayer: undefined,

	gameOptions: {
		playSound: true,
		playMusic: true,
		fullScreen: false
	},

	musicPlayer: undefined,
	
	updateScaleRatio: function () {
		ShootAsteroid.realWidth = Math.max(window.innerWidth,window.innerHeight);
		ShootAsteroid.realHeight = Math.min(window.innerWidth,window.innerHeight);
		var ws = ShootAsteroid.realWidth/(960*ShootAsteroid.assetScale);
		var wh = ShootAsteroid.realHeight/(540*ShootAsteroid.assetScale);
		ShootAsteroid.scaleRatio = Math.max(ws,wh);
	}
};

BetaAsteroid.Main = function(game){};

BetaAsteroid.Main.prototype = {
	init: function(){

	},

	preload: function(){
		// IMAGES
		this.load.image('loading', 'asset/images/loading.png');
		this.load.image('brand', 'asset/images/logo.png');
		this.load.image('splash-bg', 'asset/images/splash-bg.jpg');

		// SCRIPTS
		this.load.script('polyfill', 'lib/polyfill.js');
		this.load.script('utils', 'lib/utils.js');
		this.load.script('splash', 'src/states/Splash.js');
	},

	create: function(){
		this.state.add('Splash', BetaAsteroid.Splash);
		this.state.start('Splash');
	}
};

// *******************************************************
// START 
// *******************************************************
var game = new Phaser.Game(480, 640, Phaser.AUTO, 'game');
game.state.add('Main', BetaAsteroid.Main);
game.state.start('Main');

//})();
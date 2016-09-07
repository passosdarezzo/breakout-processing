// *******************************************************
// GLOBAL VARIABLES
// *******************************************************
var ColorMemory = {
	/* Here we've just got some global level vars that persist regardless of State swaps */
	score: 0,

	/* Quantidade de vida do personagem */
	life: 10,

	gameOptions: {
		playSound: true
	},

	musicPlayer: undefined
};

ColorMemory.Main = function(game){};

ColorMemory.Main.prototype = {
	init: function(){

	},

	preload: function(){
		// IMAGES
		this.load.image('loading', 'asset/images/loading.png');
		this.load.image('brand', 'asset/images/logo.png');
		this.load.image('splash-bg', 'asset/images/splash-bg.jpg');

		// SCRIPTS
		/*this.load.script('polyfill', 'lib/polyfill.js');*/
		this.load.script('utils', 'lib/utils.js');
		this.load.script('splash', 'src/states/Splash.js');
	},

	create: function(){
		/*this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 320;
		this.scale.minHeight = 480;
		this.scale.maxWidth = 768;
		this.scale.maxHeight = 1152;
		game.scale.refresh();*/

		this.state.add('Splash', ColorMemory.Splash);
		this.state.start('Splash');
	}
};

// *******************************************************
// START
// *******************************************************
var game = new Phaser.Game(384, 539, Phaser.AUTO, 'game');
game.state.add('Main', ColorMemory.Main);
game.state.start('Main');

//})();

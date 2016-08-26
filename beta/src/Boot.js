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
		this.load.image('loading', 'asset/images/loading_c.png');
		this.load.image('brand', 'asset/images/çlkjçlk.jpeg');
		this.load.image('splash-bg', 'asset/images/splash-bg.jpg');

		// SCRIPTS
		/*this.load.script('polyfill', 'lib/polyfill.js');*/
		this.load.script('utils', 'lib/utils.js');
		this.load.script('splash', 'src/states/Splash.js');
	},

	create: function(){
		this.state.add('Splash', ColorMemory.Splash);
		this.state.start('Splash');
	}
};

// *******************************************************
// START 
// *******************************************************
var game = new Phaser.Game(384, 480, Phaser.AUTO, 'game');
game.state.add('Main', ColorMemory.Main);
game.state.start('Main');

//})();
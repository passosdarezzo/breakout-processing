// *******************************************************
// GLOBAL VARIABLES
// *******************************************************
var ColorMemory = {
	/* Here we've just got some global level vars that persist regardless of State swaps */
	//score: 0,

	/* Quantidade de vida do personagem */
	//life: 10,
	
	//step: 2,
	//patternSize: 3,
	
	gameOptions: {
		playSound: true
	},

	musicPlayer: undefined,
	
	// Variaveis do level select
	thumbRows : 4,
	// number of thumbnail cololumns
	thumbCols : 3,
	// width of a thumbnail, in pixels
	thumbWidth : 64,
	// height of a thumbnail, in pixels
	thumbHeight : 64,
	// space among thumbnails, in pixels
	thumbSpacing : 8,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	starsArray : [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	// level currently playing
	level : 0,
	
	stages: [{step:1, patSize:5,   mode:'Follow'}, 
				{step:1, patSize:10, mode:'Follow'},
				{step:1, patSize:15, mode:'Follow'},
				{step:1, patSize:20, mode:'Follow'},
				{step:1, patSize:25, mode:'Follow'},
				{step:1, patSize:30, mode:'Follow'},
				{step:1, patSize:35, mode:'Follow'},
				{step:1, patSize:40, mode:'Follow'},]
};

ColorMemory.Main = function(game){};

ColorMemory.Main.prototype = {
	preload: function(){
		firstRunLandscape = game.scale.isGameLandscape;
		
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
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.forceOrientation(false, true);
		game.scale.enterIncorrectOrientation.add(handleIncorrect);
		game.scale.leaveIncorrectOrientation.add(handleCorrect);
		
		/*
		this.scale.minWidth = 320;
		this.scale.minHeight = 480;
		this.scale.maxWidth = 768;
		this.scale.maxHeight = 1152;
		game.scale.refresh();*/

		this.state.add('Splash', ColorMemory.Splash);
		this.state.start('Splash');
	}
};

function handleIncorrect(){
     	if(!game.device.desktop){
     		document.getElementById("turn").style.display="block";
     	}
	}
	
function handleCorrect(){
	if(!game.device.desktop){
		if(firstRunLandscape){
			gameRatio = window.innerWidth/window.innerHeight;		
			game.width = Math.ceil(640*gameRatio);
			game.height = 640;
			game.renderer.resize(game.width,game.height);
			game.state.start("Game");		
		}
		document.getElementById("turn").style.display="none";
	}
}

// *******************************************************
// START
// *******************************************************
var gameRatio = window.innerWidth/window.innerHeight;		
var firstRunLandscape;
//var game = new Phaser.Game(Math.ceil(640*gameRatio), 640, Phaser.CANVAS);
var game = new Phaser.Game(Math.ceil(640*gameRatio), 640, Phaser.CANVAS, 'game');
game.state.add('Main', ColorMemory.Main);
game.state.start('Main');

//})();

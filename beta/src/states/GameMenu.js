ColorMemory.GameMenu = function(game){};

ColorMemory.GameMenu.prototype = {
	menuConfig:{
		className: "inverse",
		startY: 260,
		startX: 30
	},

	init: function(){
		/*this.titleText = this.game.make.text(this.game.world.centerX, 100, "cRiStiano", {
			font: 'bold 60pt TheMinion',
			fill: '#FDFFB5',
			align: 'center'
		});*/
		this.titleText = game.make.text(10, 100, 'Color Memory');
		this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.titleText.anchor.set(0,0);
		this.optionCount = 1;
	},

	create: function(){
		// Adicionar background
		game.add.sprite(0, 0, 'level-1-bg');
		game.stage.disableVisibilityChange = true;
		game.add.existing(this.titleText);

		// Sound
		/*var sound = game.add.sprite(300, 50, ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
		sound.inputEnabled = true;
		sound.events.onInputUp.add(function(){
			ColorMemory.gameOptions.playSound = !ColorMemory.gameOptions.playSound;
			sound.loadTexture(ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
			console.log('Sound:' + ColorMemory.gameOptions.playSound);
		});*/
		
		// Level Game
		var level = game.add.text(30, 300, 'Game');
		level.anchor.set(0,0);
		level.inputEnabled = true;
		level.setStyle({
	    	fill: 'white',
	        stroke: 'rgba(200,200,200,0.5)'
	    });
		level.events.onInputUp.add(function(){
			game.state.start('LevelSelect');
		});
		/* Get the element that triggered a specific event: target */
		level.events.onInputOver.add(function(target){
			console.log('Input Over');
			target.setStyle({
		    	fill: '#FEFFD5',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});
		level.events.onInputOut.add(function(target){
			console.log('Input Out');
			target.setStyle({
		    	fill: 'white',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});

		// Endless Game
		var endless = game.add.text(30, 340, 'Endless Game');
		endless.anchor.set(0,0);
		endless.inputEnabled = true;
		endless.setStyle({
	    	fill: 'white',
	        stroke: 'rgba(200,200,200,0.5)'
	    });
		endless.events.onInputUp.add(function(){
			game.state.start('Endless');
		});
		/* Get the element that triggered a specific event: target */
		endless.events.onInputOver.add(function(target){
			console.log('Input Over');
			target.setStyle({
		    	fill: '#FEFFD5',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});
		endless.events.onInputOut.add(function(target){
			console.log('Input Out');
			target.setStyle({
		    	fill: 'white',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});

		// Help
		var help = game.add.text(30, 400, 'Help');
		help.anchor.set(0,0);
		help.inputEnabled = true;
		help.setStyle({
	    	fill: 'white',
	        stroke: 'rgba(200,200,200,0.5)'
	    });
		help.events.onInputUp.add(function(){
			game.state.start('LevelSelect');
		});
		/* Get the element that triggered a specific event: target */
		help.events.onInputOver.add(function(target){
			console.log('Input Over');
			target.setStyle({
		    	fill: '#FEFFD5',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});
		help.events.onInputOut.add(function(target){
			console.log('Input Out');
			target.setStyle({
		    	fill: 'white',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});

	},

	update: function(){

	}
};

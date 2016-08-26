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
		this.titleText = game.make.text(10, 100, 'CrIstiAno');
		this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.titleText.anchor.set(0,0);
		this.optionCount = 1;
	},

	create: function(){
		// Adicionar background
		game.add.sprite(0, 0, 'menu-bg');
		game.stage.disableVisibilityChange = true;
		game.add.existing(this.titleText);

		// Sound
		var sound = game.add.sprite(300, 50, ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
		sound.inputEnabled = true;
		sound.events.onInputUp.add(function(){
			ColorMemory.gameOptions.playSound = !ColorMemory.gameOptions.playSound;
			sound.loadTexture(ColorMemory.gameOptions.playSound ? 'sound-on' : 'sound-off');
			console.log('Sound:' + ColorMemory.gameOptions.playSound);
		});

		// Start
		var start = game.add.text(30, 300, '1_CRIS_START');
		start.anchor.set(0,0);
		start.inputEnabled = true;
		start.setStyle({
	    	fill: 'white',
	        stroke: 'rgba(200,200,200,0.5)'
	    });
		start.events.onInputUp.add(function(){
			game.state.start('Game');
		});
		/* Get the element that triggered a specific event: target */
		start.events.onInputOver.add(function(target){
			console.log('Input Over');
			target.setStyle({
		    	fill: '#FEFFD5',
		        stroke: 'rgba(200,200,200,0.5)'
		    });
		});
		start.events.onInputOut.add(function(target){
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

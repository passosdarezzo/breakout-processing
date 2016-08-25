BetaAsteroid.Game = function(game){
	// Define constants
	this.SHOT_DELAY = 200; // milliseconds (10 bullets/second)
	this.ASTEROID_DELAY = 700;
	this.BULLET_SPEED = 500; // pixels/second
	this.NUMBER_OF_BULLETS = 20;
	this.NUMBER_OF_ASTEROIDS = 40;
	this.isGameRunning = false;
	this.reg = {};
	this.life = undefined;
	this.reg = {};
};
//var reg = {};
BetaAsteroid.Game.prototype = {

	create: function(){
		this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'level-1-bg');
		
		// Create a label to use as a button
		btnPause = game.add.sprite(10, 10, 'pause');
		btnPause.inputEnabled = true;
		btnPause.events.onInputUp.add(function () {
			// When the pause button is pressed, we pause the game
			game.paused = !game.paused;

			// Then add the menu
			//menu = game.add.sprite(game.width/2, game.height/2, 'menu');
			menu = game.add.text(game.world.centerX, 250, "PAUSE", {
				font: 'bold 60pt TheMinion',
				fill: '#FDFFB5',
				align: 'center'
			});
			menu.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
			menu.anchor.setTo(0.5, 0.5);

			btnPause.loadTexture('play');
		});

		// Add a input listener that can help us return from being paused
		game.input.onDown.add(unpause, self);

		// And finally the method that handels the pause menu
		function unpause(event){
			// Only act if paused
			if(game.paused){
				// Calculate the corners of the menu
				var x1 = btnPause.position.x, 
					x2 = btnPause.position.x + btnPause.width,
					y1 = btnPause.position.y, 
					y2 = btnPause.position.y + btnPause.height;

				// Check if the click was inside the menu
				if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
					// Remove the menu and the label
					menu.destroy();

					btnPause.loadTexture('pause');

					// Unpause the game
					game.paused = false;
				}
			}
		}
		
		this.moon = this.game.add.sprite(0, game.height-90, 'moon');
		this.game.physics.enable(this.moon, Phaser.Physics.ARCADE);

		// Create an object pool of bullets
		this.bulletPool = this.game.add.group();
		//this.bulletPool.z = -6;
		for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
			// Create each bullet and add it to the group.
			//var bullet = this.game.add.sprite(0, 0, 'bullet');
			var bullet = new Phaser.Sprite(this.game, 0, 0, 'bullet');
			this.game.world.addChildAt(bullet, 1);
			
			this.bulletPool.add(bullet);

			// Set its pivot point to the center of the bullet
			bullet.anchor.setTo(0.5, 0.5);

			// Enable physics on the bullet
	        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

	        // Set its initial state to "dead".
	        bullet.kill();
	    }

		this.gun = game.add.sprite(this.game.width/2, game.height-140, 'gun');
		this.gun.anchor.setTo(0.3, 0.5);
		this.game.add.sprite((this.game.width/2) - 130, game.height-160, 'base-gun');

	    // Create an object pool of asteroids
	    this.asteroidPool = this.game.add.group();
	    this.asteroidPool.createMultiple(this.NUMBER_OF_ASTEROIDS, 'shootAsteroid', '0001');
	    this.asteroidPool.forEach(this.setupAsteroid, this);
	    
	    // Create an object pool of explosions
	    this.explosionPool = this.game.add.group();
	    this.explosionPool.createMultiple(this.NUMBER_OF_ASTEROIDS, 'shootAsteroid', 'asteroid_explode1');
	    this.explosionPool.forEach(this.setupExplosion, this);

	    // Simulate a pointer click/tap input at the center of the stage
	    // when the example begins running.
	    this.game.input.activePointer.x = this.game.width/2;
	    this.game.input.activePointer.y = this.game.height/2;

	    this.counter = new Counter(this.game, 0, 0);
	    this.game.add.existing(this.counter);
	    this.counter.x = this.game.world.centerX;
	    this.counter.y = 20;
	    this.counter.setScore(BetaAsteroid.score, false);

	    this.scoreCount = 0;

	    // initiate the modal class
	    this.reg.modal = new gameModal(game);
	    this.createModals();
	    //this.reg.modal.showModal('instructions');

	    //var life = undefined;
		this.game.add.existing(this.life = new BetaAsteroid.LifeBar(this.game, 80, 10, 10, this.game.input));
		
		this.isGameRunning = true;
	},

	createModals: function(){
		/////// INSTRUCTIONS //////////
		this.reg.modal.createModal({
		        type:"instructions",
		        includeBackground: false,
		        modalCloseOnInput: true,
				itemsArr: [
							{
								type: "image",
								content: "modalBG",
								offsetY: -20,
								contentScale: 1
							},
							{
								type: "image",
								content: "mouseLeft",
								contentScale: 0.5,
								offsetY: -80
							},

							{
								type : "text",
								content: "X",
								fontSize: 52,
								color: "0x000000",
								offsetY: -130,
								offsetX: 240,
								callback: this.beginGame
							}

						]
		});

		///////// GAMEOVER //////////
   this.reg.modal.createModal({
            type:"gameoverModal",
            includeBackground: true,
            modalCloseOnInput: true,
  itemsArr: [
                {
                    type: "image",
                    content: "gameover",
                    offsetY: -110,
                    contentScale: 0.6
            },
                {
                    type: "image",
                    content: "tryagain",
                    contentScale: 0.6
            },
                {
                    type: "image",
                    content: "yes",
                    offsetY: 100,
                    offsetX: -80,
                    contentScale: 0.6,
                    callback: function () {
                        alert("YES!");
                      window.console.log("yes");
                    }
            },
                {	
                    type: "image",
                    content: "no",
                    offsetY: 100,
                    offsetX: 80,
                    contentScale: 0.6,
                    callback: function () {	
                        console.log('GameOver!!! Continuar? Não!');
                    
            		}
				}
            ]
   });
	},
	
	beginGame: function(){
		console.log("Game Running: " + this.isGameRunning);
		this.isGameRunning = true;
		console.log("Game Running: " + this.isGameRunning);
		
		console.log(this.NUMBER_OF_BULLETS);
		//this.reg.modal.hideModal("instructions");
	},

	setupExplosion: function(explosion){
		explosion.animations.add('kaboom', 
								[ 'asteroid_explode1',
								  'asteroid_explode2',
								  'asteroid_explode3',
								  'asteroid_explode4'],
								 10,
								 false);
	},

	startBounceTween: function() {	    
	    var bounce = this.game.add.tween(this.moon);
		bounce.to({
			y: [this.game.height - 80, this.game.height - 90] // You can tween to multiple values using an array
				}, 200, Phaser.Easing.Quadratic.Out);
	    bounce.start();
	},

	update: function(){
		//  Scroll the background
    	this.starfield.tilePosition.y += 0.5;

		if(this.isGameRunning){
			// Shoot a bullet
			if (this.game.input.activePointer.isDown) {
				this.shootBullet();
			}

			// Aim the gun at the pointer.
			// All this function does is calculate the angle using
			// Math.atan2(yPointer-yGun, xPointer-xGun)
			var a = Math.ceil(this.game.physics.arcade.angleToPointer(this.gun));
			if( a >= -3 && a <= 0){
				this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
			}

			this.createAsteroids();

			//  Run collision
			this.game.physics.arcade.overlap(this.bulletPool, this.asteroidPool, this.collisionHandlerBulletAsteroid, null, this);
			this.game.physics.arcade.overlap(this.asteroidPool, this.moon, this.collisionHandlerAsteroidMoon, null, this);

			if(BetaAsteroid.life <= 0){
				this.isGameRunning = false;
				this.reg.modal.showModal('gameoverModal');
				game.paused = true;

			}
		}
		
	},

	collisionHandlerAsteroidMoon: function(asteroid, moon){
		// Remove a bala e o asteroide
		moon.kill();

		this.startBounceTween();

		// Adiciona animação de explosão
	    var explosion = this.explosionPool.getFirstExists(false);
	    explosion.reset(moon.body.x, moon.body.y + 20);
	    explosion.play('kaboom', 30, false, true);

		this.life.changeLife(--BetaAsteroid.life, this.life);
	},

	collisionHandlerBulletAsteroid: function(bullet, asteroid){
		// Score counter
		this.counter.setScore(++BetaAsteroid.score, true);

		// Remove a bala e o asteroide
		bullet.kill();
		asteroid.kill();
		
		// Adiciona animação de explosão
	    var explosion = this.explosionPool.getFirstExists(false);
	    explosion.reset(asteroid.body.x, asteroid.body.y);
	    explosion.play('kaboom', 30, false, true);
	},

	setupAsteroid: function(asteroid) {
		asteroid.anchor.x = 0.5;
		asteroid.anchor.y = 0.5;
		
		asteroid.animations.add('move', ['0001', '0002', '0003',
										 '0004', '0005', '0006',
										 '0007', '0008', '0009',
										 '0010', '0011', '0012'],
										 10,
										 true);
		this.game.physics.enable(asteroid, Phaser.Physics.ARCADE);

		asteroid.kill();
	},

	createAsteroids: function(){
		// Enforce a short delay between shots by recording
	    // the time that each bullet is shot and testing if
	    // the amount of time since the last shot is more than
	    // the required delay.
	    if (this.lastAsteroidCreated === undefined) this.lastAsteroidCreated = 0;
	    if (this.game.time.now - this.lastAsteroidCreated < this.ASTEROID_DELAY) return;
	    this.lastAsteroidCreated = this.game.time.now;

		var asteroid = this.asteroidPool.getFirstDead();

		if(asteroid === null || asteroid === undefined){
			return;
		}

		asteroid.revive();
		asteroid.checkWorldBounds = true;
	    asteroid.outOfBoundsKill = true;
	    //asteroid.reset(Math.random() * this.game.width + asteroid.width, 0);
	    asteroid.reset(Math.floor(Math.random() * (this.game.width-asteroid.width)) + asteroid.width  , 0);
	    
	    // Shoot it in the right direction
	    asteroid.body.velocity.x = 1 - (Math.random() * 5);
	    asteroid.body.velocity.y = 100;

	    asteroid.animations.play('move');
	},

	shootBullet: function() {
	    // Enforce a short delay between shots by recording
	    // the time that each bullet is shot and testing if
	    // the amount of time since the last shot is more than
	    // the required delay.
	    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
	    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
	    this.lastBulletShotAt = this.game.time.now;

	    // Get a dead bullet from the pool
	    var bullet = this.bulletPool.getFirstDead();

	    // If there aren't any bullets available then don't shoot
	    if (bullet === null || bullet === undefined) return;

	    // Revive the bullet
	    // This makes the bullet "alive"
	    bullet.revive();

	    // Bullets should kill themselves when they leave the world.
	    // Phaser takes care of this for me by setting this flag
	    // but you can do it yourself by killing the bullet if
	    // its x,y coordinates are outside of the world.
	    bullet.checkWorldBounds = true;
	    bullet.outOfBoundsKill = true;

	    // Set the bullet position to the gun position.
	    bullet.reset(this.gun.x, this.gun.y);
	    bullet.rotation = this.gun.rotation;

	    // Shoot it in the right direction
	    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
	    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
	}
};

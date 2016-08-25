BetaAsteroid.LifeBar = function(game, x, y, pieces, target){
	Phaser.Sprite.call(this, game, x, y, 'lifeBar');
	this.target = target;
	this.pieces = pieces;
	this.total = this.width;
};
BetaAsteroid.LifeBar.prototype = Object.create(Phaser.Sprite.prototype);
BetaAsteroid.LifeBar.prototype.constructor = BetaAsteroid.LifeBar;
BetaAsteroid.LifeBar.prototype.create = function(){
};
BetaAsteroid.LifeBar.prototype.changeLife = function(amountOfLife, life){
	amountOfLife = (this.total / this.pieces) * amountOfLife;
	if(amountOfLife < 0){
		amountOfLife = 0;
	}

	var cropRect = new Phaser.Rectangle(0,0, amountOfLife, life.height);
	life.crop(cropRect);
};

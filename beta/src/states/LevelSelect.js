ColorMemory.LevelSelect = function(game){};

// how many pages are needed to show all levels?
var pages;
// group where to place all level thumbnails
var levelThumbsGroup;
// current page
var currentPage;
// arrows to navigate through level pages
var leftArrow;
var rightArrow;

ColorMemory.LevelSelect.prototype = {
  	create: function(){
  		// how many pages are needed to show all levels?
		// CAUTION!! EACH PAGE SHOULD HAVE THE SAME AMOUNT OF LEVELS, THAT IS
		// THE NUMBER OF LEVELS *MUST* BE DIVISIBLE BY THUMBCOLS*THUMBROWS
  		pages = ColorMemory.starsArray.length/(ColorMemory.thumbRows*ColorMemory.thumbCols);
  		// current page according to last played level, if any
		currentPage = Math.floor(ColorMemory.level/(ColorMemory.thumbRows*ColorMemory.thumbCols));
		if(currentPage>pages-1){
			currentPage = pages-1;
		}
		// left arrow button, to turn one page left
		leftArrow = game.add.button(50,420,"level_arrows",this.arrowClicked,this);
		leftArrow.anchor.setTo(0.5);
		leftArrow.frame = 0;
		// can we turn one page left?
		if(currentPage==0){
			leftArrow.alpha = 0.3;
		}
		// right arrow button, to turn one page right
		rightArrow = game.add.button(270,420,"level_arrows",this.arrowClicked,this);
		rightArrow.anchor.setTo(0.5);
		rightArrow.frame = 1;
		// can we turn one page right?
		if(currentPage==pages-1){
			rightArrow.alpha = 0.3;
		}
		// creation of the thumbails group
		levelThumbsGroup = game.add.group();
		// determining level thumbnails width and height for each page
		var levelLength = ColorMemory.thumbWidth*ColorMemory.thumbCols+ColorMemory.thumbSpacing*(ColorMemory.thumbCols-1);
		var levelHeight = ColorMemory.thumbWidth*ColorMemory.thumbRows+ColorMemory.thumbSpacing*(ColorMemory.thumbRows-1);
		// looping through each page
		for(var l = 0; l < pages; l++){
			// horizontal offset to have level thumbnails horizontally centered in the page
			var offsetX = (game.width-levelLength)/2+game.width*l;
			// I am not interested in having level thumbnails vertically centered in the page, but
			// if you are, simple replace my "20" with
			// (game.height-levelHeight)/2
			var offsetY = 20;
			// looping through each level thumbnails
		     for(var i = 0; i < ColorMemory.thumbRows; i ++){
		     	for(var j = 0; j < ColorMemory.thumbCols; j ++){  
		     		// which level does the thumbnail refer?
					var levelNumber = i*ColorMemory.thumbCols+j+l*(ColorMemory.thumbRows*ColorMemory.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
					var levelThumb = game.add.button(offsetX+j*(ColorMemory.thumbWidth+ColorMemory.thumbSpacing), offsetY+i*(ColorMemory.thumbHeight+ColorMemory.thumbSpacing), "levels", this.thumbClicked, this);	
					// shwoing proper frame
					levelThumb.frame=ColorMemory.starsArray[levelNumber];
					// custom attribute 
					levelThumb.levelNumber = levelNumber+1;
					// adding the level thumb to the group
					levelThumbsGroup.add(levelThumb);
					// if the level is playable, also write level number
					if(ColorMemory.starsArray[levelNumber]<4){
						var style = {
							font: "18px Arial",
							fill: "#ffffff"
						};
						var levelText = game.add.text(levelThumb.x+5,levelThumb.y+5,levelNumber+1,style);
						levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
						levelThumbsGroup.add(levelText);
					}
				}
			}
		}
		// scrolling thumbnails group according to level position
		levelThumbsGroup.x = currentPage * game.width * -1
	},
	
	arrowClicked:function(button){
		// touching right arrow and still not reached last page
		if(button.frame==1 && currentPage<pages-1){
			leftArrow.alpha = 1;
			currentPage++;
			// fade out the button if we reached last page
			if(currentPage == pages-1){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
		// touching left arrow and still not reached first page
		if(button.frame==0 && currentPage>0){
			rightArrow.alpha = 1;
			currentPage--;
			// fade out the button if we reached first page
			if(currentPage == 0){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * game.width * -1
			}, 400, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}		
	},
	
	thumbClicked:function(button){
		// the level is playable, then play the level!!
		if(button.frame < 4){
			ColorMemory.level = button.levelNumber;
			
			game.state.start(ColorMemory.stages[ColorMemory.level].mode);
			
		}
		// else, let's shake the locked levels
		else{
			var buttonTween = game.add.tween(button)
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.start();
		}
	}
}
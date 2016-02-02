// Constants 
int COLUMNS_BRICKS = 9; 
int ROWS_BRICKS = 6;
int WINDOW_WIDTH = 450; 
int WINDOW_HEIGHT = 500; 
int BRICK_WIDTH = 25;
int BRICK_HEIGHT = 15;
int HITS = 3;

// Global Variables 
Paddle pad; 
Ball ball; 
Brick [][] bricks; 
PFont font;
PImage backgroundImage; 
boolean running = false;
Score myScore;
color [] c = { 
  color(#00C618), 
  color(#04859D), 
  color(#FF7C00), 
  color(#FF7A73), 
  color(#FF8C00), 
  color(#37DA7E)
};

// ************************************************************ 
// Object2D 
// ************************************************************ 
public class Object2D {
	protected int objWidth; 
	protected int objHeight; 
	protected PVector position;
	protected PVector velocity;

	public Object2D(int x, int y, int w, int h) { 
		position = new PVector(x, y);
		velocity = new PVector(0, 0);
		objWidth = w; 
		objHeight = h;
	} 

	public Object2D(int posX, int posY, int w, int h, int velocityX, int velocityY) { 
		position = new PVector(posX, posY);
		velocity = new PVector(velocityX, velocityY);
		objWidth = w; 
		objHeight = h;
	} 

	public boolean detectCollision(Object2D obj) {
	    int tw = objWidth;
	    int th = objHeight;
	    int rw = obj.objWidth;
	    int rh = obj.objHeight;
	    if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
	    	return false;
	    }

	    int tx = position.x;
	    int ty = position.y;
	    int rx = obj.position.x;
	    int ry = obj.position.y;
	    rw += rx;
	    rh += ry;
	    tw += tx;
	    th += ty;
	    //      overflow || intersect
	    return ((rw < rx || rw > tx) &&
	      (rh < ry || rh > ty) &&
	      (tw < tx || tw > rx) &&
	      (th < ty || th > ry));
  	}

}

// ************************************************************ 
//  Score
// ************************************************************ 
public class Score {
	int score = 0;

	public void draw() {
		textFont(font, 20);
		//fill(140, 214, 22, 169);
		fill(255, 255, 255);
		text("Pontos:", 5, 25);
		text(score + "", 80, 25);
	}

	public void incScore(int pontos){
		score += pontos;
	}
}

// ************************************************************ 
// Brick 
// ************************************************************ 
public class Brick extends Object2D { 
	color first;
	int hits = 0;
	boolean isBrickActive = true;
	color [] d = { 
		color(9, 175, 255), 
		color(255, 91, 13), 
		color(255, 0, 0), 
		color(128, 255, 0)
	};
	

	public Brick(int xBrick, int yBrick, int brickWidth, int brickHeight) { 
		super(xBrick, yBrick, brickWidth, brickHeight);
	} 

	public void setColor(color newColor) {
		this.first = newColor;
	}

	public void draw() { 
		stroke(0);
		strokeWeight(2);
		rect(position.x, position.y, objWidth, objHeight);
	} 

	public void hit() {
		hits++;
		if ( hits > HITS){
			isBrickActive = false;
		}
	}

	public boolean isActive() {
		return isBrickActive;
	}
} 

// ************************************************************ 
// Ball 
// ************************************************************ 
public class Ball extends Object2D { 
	color c = color(120, 20, 150); 
	int radius = 20; 
	float radiusOsc = 1.0; 
	// Sombra bola
	int qtd = 20;
	float mx[] = new float[qtd];
	float my[] = new float[qtd];

	public Ball(int x, int y, int objWidth, int objHeight, int velocityX, int velocityY) { 
		super(x, y, objWidth, objHeight, velocityX, velocityY);
	} 

	public void collidePaddle(Paddle pad) { 
		// Verifica se colidiu com o paddle
		if (detectCollision(pad)) { 
			// Redireciona a bola
			velocity.y = -velocity.y;

			Ball b = new Ball(round(position.x + velocity.x), round(this.position.y + this.velocity.y), 15, 15);
			if (pad.detectCollision(b)) {
				this.velocity.x = -this.velocity.x;
			}

		}
	}
	
	public void collideBricks(Object2D [][] obj) {
		for (int i = 0; i < COLUMNS_BRICKS; i++) {
		  for (int j = 0; j < ROWS_BRICKS; j++) {
			if (bricks[i][j].isActive() && detectCollision(bricks[i][j])) {
				this.velocity.y = -this.velocity.y;
				bricks[i][j].hit();
				
				
				Ball b = new Ball(round(this.position.x + this.velocity.x), round(this.position.y + this.velocity.y), 15, 15);
				if (bricks[i][j].detectCollision(b)) {
				this.velocity.x = -this.velocity.x;
				}

				// Score
			  	myScore.incScore(20);

				break;
			}
		  }
		}
	} 

	void update() { 
		radiusOsc = radiusOsc + sin(frameCount/2); 

		position.x += velocity.x; 
		position.y += velocity.y; 

		if (this.position.x < 0 || (this.position.x + this.objWidth) > width) {
		  velocity.x = -velocity.x; 
		}

		if (position.y < 0) {
		  velocity.y = -velocity.y; 
		}

		// se a bola atingir a parte debaixo da tela 
		if (position.y > height) { 
			running = false; 
			velocity.y = -velocity.y;
		}
	} 

	void draw() { 
	fill(c); // cor do preenchimento 

	// Cycle through the array, using a different entry on each frame. 
	// Using modulo (%) like this is faster than moving all the values over.
	int which = frameCount % qtd;
	mx[which] = this.position.x;
	my[which] = this.position.y;

	for (int i = 0; i < qtd; i++) {
	  // which+1 is the smallest (the oldest in the array)
	  int index = (which+1 + i) % qtd;
	  noStroke();
	  ellipse(mx[index] + objWidth, my[index] + objHeight, i, i);
	 //println("MX: " + mx[index] + objWidth);
	  //println("MY: " + my[index] + objHeight);
	}
	stroke(0); // cor das linhas 
	ellipse(position.x+objWidth, position.y+objHeight, radiusOsc+radius, radius);
	//println("position.x: " + (position.x+objWidth));
	//println("position.y: " + (position.y+objHeight));
	} 

	public void setX(int x) { 
	this.position.x = x;
	} 

	public void setY(int y) { 
	this.position.y = y;
	}
} 

// ************************************************************ 
// Paddle 
// ************************************************************ 
public class Paddle extends Object2D { 
	int offsetX; 
	int offsetY; 
	color paddleColor = color(#FF0700); 

	public Paddle(int newX, int newY, int newObjWidth, int newObjHeight) { 
		super(newX, newY, newObjWidth, newObjHeight); 
		offsetX = -abs(newObjWidth/2); 
		offsetY = -30; 
		position.y += offsetY;
	} 

	public void setColor(color newColor) { 
		this.paddleColor = newColor;
	} 

	public color getColor() { 
		return this.paddleColor;
	} 

	public void updatePaddle() { 
		if(mouseX > (objWidth / 2)){
			position.x = mouseX + offsetX; 
		}
	} 

	public void draw() { 
		stroke(36,  72, 72); 
		strokeWeight(2); 
		strokeJoin(ROUND); 
		fill(paddleColor); 
		rect(position.x, position.y, objWidth, objHeight, 8);
	}

	public void update(){

	}
} 

public void mouseReleased() {
	if (mouseButton == LEFT && !running) {
		running = true;  
		//delayMilliSeconds(100);

		if(ball.velocity.y < 0){
			ball.velocity.y = ball.velocity.y;
		} else {
			ball.velocity.y = -ball.velocity.y;
		}
	}
}

public void desenhaBlocos() {
  for (int i = 0; i < COLUMNS_BRICKS; i++) {
    for (int j = 0; j < ROWS_BRICKS; j++) { 
      	if (bricks[i][j].isActive()) {     
			bricks[i][j].draw();
		}
    }
  }
}

public void delaySeconds(int seconds) { 
  	int start = second(); 
  	int end = 0; 

  	while ( (end - start) < seconds) {
		end = second();
  	}
} 

public void delayMilliSeconds(int milli) {
	int start = millis(); 
	int end = 0; 

	while ( (end - start) < milli) {
		end = millis();
	}
}

// ************************************************************ 
// SETUP 
// ************************************************************ 
void setup() {
		frameRate(45); 
		size(WINDOW_WIDTH, WINDOW_HEIGHT); 
		smooth(); 
		backgroundImage = loadImage("background.png"); 

		// Font
		font = loadFont("font.vlw");
		textFont(font, 42);

		// Score
		myScore = new Score();

		//ellipseMode(CORNERS);
		pad = new Paddle(mouseX, height, 35, 12); 
		ball = new Ball(mouseX, WINDOW_HEIGHT - 70, 22, 22, 4, -5); 

		bricks = new Brick[COLUMNS_BRICKS][ROWS_BRICKS]; 
		for (int i = 0; i < COLUMNS_BRICKS; i++) {
			for (int j = 0; j < ROWS_BRICKS; j++) { 
				bricks[i][j] = new Brick(	(60 + 40*i), 
											(40 + j*25), 
											BRICK_WIDTH, 
											BRICK_HEIGHT);
			}
		}
} 

// ************************************************************ 
// DRAW MAIN LOOP 
// ************************************************************ 
void draw() { 
		// tela de fundo 
		image(backgroundImage, 0, 0, width, height);

		// atualiza o pad
		pad.updatePaddle(); 
		
		// desenha o pad
		pad.draw(); 

		// Desenha os blocos
		desenhaBlocos();

		// Desenha a pontuação
		myScore.draw();
		
		// se o jogo iniciou  
		if (running) {
			ball.update(); 
			ball.collidePaddle(pad); 
			ball.collideBricks(bricks);
			ball.draw();
		} else { 
			fill(253, 126, 0);
			textFont(font, 42);
			text("Breakout!", 130, 300);
			ball.setX(mouseX + pad.offsetX); 
			ball.setY(WINDOW_HEIGHT - 70); 
			ball.draw();
		}
} 



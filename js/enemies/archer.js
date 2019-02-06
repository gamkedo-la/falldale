var archerMoveSpeed = 0.5;
const ARCHER_TIME_BETWEEN_CHANGE_DIR = 300;
const ARCHER_PATROL_RADIUS = 200;

archerClass.prototype = new enemyClass();
function archerClass(archerName) {
	this.speed = 4;
	this.myArcherPic = archerPic; // which picture to use
	this.myName = archerName;
	
	this.maxhealth = 6;
	this.alive = true;
	this.biteReadyTicker = 30;
	this.biteReady = true;
	
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 44;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.archerMove = true;
	
	this.superClassReset = this.reset;
	this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
		this.myArcherPic;
		this.health = 6;
	} 
			
	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove(ARCHER_TIME_BETWEEN_CHANGE_DIR, archerMoveSpeed);
	}

	this.takeDamage = function(howMuch) {
		this.health -= howMuch;
	}
	
	this.archerBite = function() {

		if(this.biteReady == true){
			redWarrior.health = redWarrior.health -1;	
			dialog = "Ouch! I've been bite by a archer.";	
			this.biteReady = false;
		}
		else if(this.biteReady == false) {	
			this.biteReadyCounter();
		}
	}
	
	this.biteReadyCounter = function() {
		if(this.biteReadyTicker > 0){ 
			this.biteReadyTicker--;
		} else if(this.biteReadyTicker <= 0){
			this.biteReadyTicker = 30;
			this.biteReady = true;
		}
	}

	this.isOverlappingPoint = function(testX, testY) {  // textX is redWarrior.x and testY is redWarrior.y
		
		//test if redWarrior is inside box of Monster
				
		if(this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY){
			this.archerBite();
		}
		// add result if true
	}
		
	this.draw = function() { 
						
		if(this.archerMove) {
			this.tickCount++;
		}
		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;
			if(this.frameIndex < this.numberOfFrames-1) {
				this.frameIndex += 1;
			} else {
				this.frameIndex = 0;
			}
		}	
		if(this.health > 0){
			
			if(gamePaused == false){
				this.sx = this.frameIndex * this.width;
			}
			
			canvasContext.drawImage(shadowPic, this.x-8, this.y+32);
			canvasContext.drawImage(this.myArcherPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);

				if(displayHealth){
				colorRect(this.x,this.y-16, 40,12, "black"); 
				colorRect(this.x+2,this.y-14, 35, 8, "red");
				colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
				}
				if(debugMode){
					colorText(this.myName, this.x, this.y-20, "red");
					colorText("HP: "+this.health, this.x, this.y-10, "red");
					
					colorRect(this.x,this.y, 5,5, "red"); 
					colorRect(this.x,this.y+this.height, 5,5, "red")
					colorRect(this.x+this.width,this.y, 5,5, "red")
					colorRect(this.x+this.width,this.y+this.height, 5,5, "red")
				}
		} else {   
			canvasContext.drawImage(deadArcherPic, this.x,this.y); 
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}
		
	}
}
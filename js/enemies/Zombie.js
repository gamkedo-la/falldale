var zombieMoveSpeed = 0.5;
const ZOMBIE_TIME_BETWEEN_CHANGE_DIR = 700;

zombieClass.prototype = new enemyClass();
function zombieClass(zombieName) {
	
	this.speed = 2;
	this.myZombiePic = zombiePic; 
	this.myName = zombieName;
	
	this.maxhealth = 30;
	this.alive = true;
	this.biteReadyTicker = 30;
	this.biteReady = true;
	
		
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 25;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.zombieMove = true; 
	
	this.superClassReset = this.reset;
	this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
		this.myZombiePic = zombiePic; 
		this.health = 30;
	}
		
	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove(ZOMBIE_TIME_BETWEEN_CHANGE_DIR, zombieMoveSpeed);
	}

	this.takeDamage = function(howMuch) {
		this.health -= howMuch;
		zombieHurtSound.play();
	}
	
	this.zombieBite = function() {
		if(this.biteReady == true){
			redWarrior.health = redWarrior.health -1;	
			playerHurtSound.play();
			dialog = "Ouch! I've been bite by a zombie for 1 point of damage.";	
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
			this.biteReadyTicker = 60; //amount of time between bites
			this.biteReady = true;
		}
	}

	this.isOverlappingPoint = function(testX, testY) {  // textX is redWarrior.x and testY is redWarrior.y
		
		//test if redWarrior is inside box of Monster
		
		if(this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY){
			this.zombieBite();
		}
		
		// add result if true
		
	}
		
	this.draw = function() { 

			
		if(this.zombieMove) {
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
			
			canvasContext.drawImage(shadowPic, this.x-20, this.y+32);
			canvasContext.drawImage(this.myZombiePic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);

			if(displayHealth){
				colorRect(this.x,this.y-16, 40,12, "black"); 
				colorRect(this.x+2,this.y-14, 35, 8, "red");
				colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
			}
			if(debugMode){
				colorText(this.myName, this.x, this.y-20, "red");
				colorText("HP: "+this.health, this.x, this.y-10, "red");
				
				colorRect(this.x,this.y, 5,5, "red");
				colorRect(this.x,this.y+this.height, 5,5, "red");
				colorRect(this.x+this.width,this.y, 5,5, "red");
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red");
				}
		} else {
				canvasContext.drawImage(deadZombiePic, this.x,this.y);
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}	
	}
}



zombieClass.prototype = new enemyClass();
function zombieClass(zombieName, whichPic) {
	
	this.speed = 2;
	this.myZombiePic = whichPic; 
	this.myName = zombieName;
	
	this.maxhealth = 30;
	this.alive = true;
	this.myBite = new biteClass();		//
	this.myBite.baseBiteLife = 2;		//Zombies bite, all the time
	this.myBite.baseBiteCooldown = 2;	//
	
		
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 30;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.zombieMove = true; 
	this.zombieTimeBetweenChangeDir = 700;
	this.zombieMoveSpeed = 0.4;
	
	this.superClassReset = this.reset;
	this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
		this.newRandomPic();
		this.health = 30;
		this.zombieTimeBetweenChangeDir = Math.floor(Math.random() * 800) + 1;
	}
		
	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove(this.zombieTimeBetweenChangeDir, this.zombieMoveSpeed);

		this.myBite.move();
        this.myBite.x = this.x;
        this.myBite.y = this.y;
	}
	
	    this.newRandomPic = function() {
        var whichPic = Math.round(Math.random() * 3);
        switch (whichPic) {
            case 0:
                this.myZombiePic = zombiePic;
                break;
            case 1:
                this.myZombiePic = zombiePic2;
                break;
            case 2:
                this.myZombiePic = zombiePic3;
                break;
        }
    }
	

	this.takeDamage = function(howMuch) {
		this.health -= howMuch;
		zombieHurtSound.play();
	}
	
	this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
            dialog = "Ouch! I've been bite by a zombie.  I hope it isn't contagious.";
        }
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
			
			this.sx = 0;
			
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
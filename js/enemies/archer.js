var archerMoveSpeed = 0.5;
const ARCHER_TIME_BETWEEN_CHANGE_DIR = 20;
const ARCHER_PATROL_RADIUS = 200;

archerClass.prototype = new enemyClass();
function archerClass(archerName) {
	this.speed = archerMoveSpeed;
	this.myArcherPic = archerPic; // which picture to use
	this.myName = archerName;
	
	this.maxhealth = 6;
	this.alive = true;
	this.myBite = new biteClass();	//
	this.myBite.baseBiteLife = 30;			//Archers bite, but they're not very good at it
	this.myBite.baseBiteCooldown = 10;		//
	this.displayHealth = false;
	this.archerHealthCountdownSeconds = 5;
	this.archerDisplayHealthCountdown = this.archerHealthCountdownSeconds * 30;

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
		this.superClassMove(ARCHER_TIME_BETWEEN_CHANGE_DIR);

		this.myBite.move();
        this.myBite.x = this.x;
        this.myBite.y = this.y;
	}
	
	this.distributeTreasure = function(){
		var chanceOnTreasure = Math.round(Math.random() * 10);
		if(chanceOnTreasure >= 7){	
			console.log("Treasure Provided")		
			var randomTreasure = Math.round(Math.random() * 3);
			switch (randomTreasure) {
				case 0:
				// heart
				console.log("heart");
				break;
				case 1:
				// gold
				console.log("gold");
				break;
				case 2:
				// healing potion
				console.log("healing potion");
				break;
			}
		}
	}

	this.takeDamage = function(howMuch) {
		this.health -= howMuch;
		this.displayHealth = true;
	}

	this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
			setDialogUICountdown(5);
            dialog = "Ouch! I've been bite by an Archer! An Archer!";
        }
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

				if(this.displayHealth){
					if(this.archerDisplayHealthCountdown >= 0) {
						colorRect(this.x,this.y-16, 40,12, "black"); 
						colorRect(this.x+2,this.y-14, 35, 8, "red");
						colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
						this.archerDisplayHealthCountdown--;	
					} else {
						this.archerDisplayHealthCountdown = this.archerHealthCountdownSeconds * 30;
						this.displayHealth = false;
					}

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
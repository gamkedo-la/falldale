const SWORD_LIFE = 5;
const SWORD_SPEED = 1.0;
var swordAlive = false;
var displayDamagePoints = 0;
var damageUIVisibilityCountdown = 0;


function swordClass() {
	this.sx = 0;
	this.sy = 0;
	this.ang = 01;
	this.xv = 5;
	this.yv = 5;
	this.swordLife = SWORD_LIFE;
	this.coolDownTime = 2;
	this.mySwordPic = swordPic;
	this.damagePoints = 6;
	this.damageDice = 6; // 6 Sided Dice
	this.immunity = false;
	this.attackHitBonus = 10;
	this.toHitPoint = 0;
	this.attackDice = 20;


	this.reset = function() {
		this.swordLife = 0;
		swordAlive = true;
	} 
	
	this.rollToDetermineIfHit = function() {
		this.setDamageUICountdown(3);
		this.toHitPoints = Math.floor(Math.random() * this.attackDice) + 1
	}
	
	this.rollForDamage = function() {
		if(this.toHitPoints >= 10){
			this.damagePoints = Math.floor(Math.random() * this.damageDice) + 1
			displayDamagePoints = this.damagePoints;
		}
	}
	
	this.setDamageUICountdown = function (seconds) {
		damageUIVisibilityCountdown = seconds * 30; // 30fps
	}

	this.move = function(weilder) {
		if(this.swordLife > 0) {
			this.swordLife--;
		this.swX = weilder.x;
		this.swY = weilder.y;	  
		}
	}

	this.isSwordReadyToSwing = function() {
        return(this.swordLife <= 0);
    }
	
	this.shootFrom = function(weilder) {
		this.x = weilder.x;
		this.y = weilder.y;
		
		this.rollToDetermineIfHit();
		if(this.toHitPoints > 0){
			this.rollForDamage();
		}
		this.swordLife = SWORD_LIFE;
	}
	
	this.hitTest = function(weilder, adversary) {
		if(this.swordLife <= 0) {
			return false;
		}

	this.checkhit = function() {
		if(this.toHitPoints >= 10){
			
			if(this.damagePoints > 0){
				dialog = "Successful hit "+ adversary.myName+" for " + this.damagePoints +" damage point!";
				if (adversary.takeDamage) { // this can sometimes be undefined
					adversary.takeDamage(this.damagePoints)
				}
				this.damagePoints = 0;
			}

			if(adversary.health < 0){
				weilder.experience = weilder.experience + 100;
				weilder.checkForLevelUp();
			}
		} else {
			dialog = adversary.myName + " dodged your sword swing.  You rolled a " + this.toHitPoints;
		}
	}
	
		if(direction == "north") {// warrior facing North
			
						
			if(	this.x+25 > adversary.x &&    // within left side
				this.x+25 < (adversary.x + adversary.width) && //within right side
				this.y-20 > adversary.y && // within top side
				this.y-20 < (adversary.y + adversary.height)) // within bottom 
					{ 
						this.checkhit();
					}
		} else if(direction == "south") {// warrior facing South
			
			if(	this.x + 10 > adversary.x &&    // within left side
				this.x + 10 < (adversary.x + adversary.width) && //within right side
				this.y + 70 > adversary.y && // within top side
				this.y + 70 < (adversary.y + adversary.height)) // within bottom 
					{ 
						this.checkhit();
					}			
		} else if(direction == "west") {// warrior facing West
						
			if(	this.x -30 > adversary.x &&    // within left side
				this.x -30 < (adversary.x + adversary.width) && //within right side
				this.y + 25 > adversary.y && // within top side
				this.y + 25 < (adversary.y + adversary.height)) 
					{
						this.checkhit();
					}			
		} else if(direction == "east") {// warrior facing East
						
			if(	this.x + 60 > adversary.x &&    // within left side
				this.x + 60 < (adversary.x + adversary.width) && //within right side
				this.y + 25 > adversary.y && // within top side
				this.y + 25 < (adversary.y + adversary.height)) // within bottom 
					{ 
						this.checkhit();
					}			    
 		} else {
			return false;
		}
	}
	
	this.draw = function(weilder) {

		var swordWidth = 10;
		var swordLength = 40;
		var swordXLocation = weilder.x;
		var swordYLocation = weilder.y;
		
		if(direction == "north") {
			swordWidth = 10;
			swordLength = 20;
			swordXLocation = weilder.centerX+5;
			swordYLocation = weilder.y - swordLength;
		} else if(direction == "south") {
			swordWidth = 10;
			swordLength = 40;
			swordXLocation = weilder.centerX-10;
			swordYLocation = weilder.centerY+10;
		} else if(direction == "west") {
			swordWidth = 40;
			swordLength = 10;
			swordXLocation = weilder.x - swordWidth + 10;
			swordYLocation = weilder.centerY;
		} else if(direction == "east") {
			swordWidth = 40;
			swordLength = 10;
			swordXLocation = weilder.x + 20;
			swordYLocation = weilder.centerY;
		} 
		
		if(this.swordLife > 0) {
			swordAlive = false;
			colorRect(swordXLocation, swordYLocation, swordWidth, swordLength, "gray" );
		}
	}	
}


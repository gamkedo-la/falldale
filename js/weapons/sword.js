const SWORD_LIFE = 5;
const SWORD_SPEED = 1.0;
const SWORD_COOLDOWN = 2;
//var swordAlive = false;
var displayDamagePoints = 0;
var damageUIVisibilityCountdown = 0;

swordClass.prototype = new weaponClass();
function swordClass() {
	this.xv = 5;
	this.yv = 5;
	this.life = SWORD_LIFE;
	this.coolDownTime = 0;
	this.isMagic = false;
	this.mySwordPic = swordPic;
	this.immunity = false;
	this.attackHitBonus = 10; 
		
	this.shootFrom = function(weilder) {
		this.x = weilder.x;
		this.y = weilder.y;
		
		this.rollToDetermineIfHit();
		if(this.toHitPoints > 0){
			this.rollForDamage();
		}
		
		this.life = SWORD_LIFE;
		this.coolDownTime = SWORD_COOLDOWN;
	}
	
	//override weaponClass.hitTest
	this.hitTest = function(weilder, adversary) {
		if(this.life <= 0) {
			return false;
		}

	this.checkhit = function() {
		if(this.toHitPoints >= 10){
			
			if(this.damagePoints > 0){
				dialogManager.setDialogWithCountdown("Successful hit "+ adversary.myName+" for " + this.damagePoints +" damage point!");
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
			dialogManager.setDialogWithCountdown(adversary.myName + " dodged your sword swing.  You rolled a " + this.toHitPoints);
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
		var rotation = 0;
		
		if(direction == "north") {
			swordWidth = 10;
			swordLength = 20;
			swordXLocation = weilder.centerX+5;
			swordYLocation = weilder.y - swordLength + 10;
		} else if(direction == "south") {
			swordWidth = 10;
			swordLength = 40;
			swordXLocation = weilder.centerX - 5;
			swordYLocation = weilder.centerY + 35;
			rotation = Math.PI;
		} else if(direction == "west") {
			swordWidth = 40;
			swordLength = 10;
			swordXLocation = weilder.x - swordWidth + 30;
			swordYLocation = weilder.centerY;
			rotation = -Math.PI / 2;
		} else if(direction == "east") {
			swordWidth = 40;
			swordLength = 10;
			swordXLocation = weilder.x + 60;
			swordYLocation = weilder.centerY + 30;
			rotation = Math.PI / 2;
		} 
		
		if(this.life > 0) {
			if(this.isMagic) {
				this.mySwordPic = magicSwordPic;
			} else {
				this.mySwordPic = swordPic;
			}
			canvasContext.save();
			if(rotation != 0) {
				canvasContext.translate(swordXLocation, swordYLocation);
				canvasContext.rotate(rotation);
				canvasContext.drawImage(this.mySwordPic, -swordWidth/2, -swordLength/2);
			} else {
				canvasContext.drawImage(this.mySwordPic, swordXLocation, swordYLocation);
			}
			
			canvasContext.restore();
		}
	}	
}


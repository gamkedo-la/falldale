//Club for Goblins
const CLUB_LIFE = 5;
const CLUB_SPEED = 1.0;
const CLUB_COOLDOWN = 2;

clubClass.prototype = new weaponClass();
function clubClass() {
    this.damageDice = 4; // 6 Sided Dice
    this.damagePoints = 4;
    
    this.life = 0;
    this.baseClubLife = CLUB_LIFE;
    this.coolDownTime = 0;
    this.baseClubCooldown = CLUB_COOLDOWN;

    this.shootFrom = function(weilder) {
		this.x = weilder.x;
		this.y = weilder.y;
        
		this.life = this.baseClubLife;
        this.coolDownTime = this.baseClubCooldown;
    }

    //override weaponClass.rangeTest
    this.rangeTest = function(weilder, adversary) {
        if(weilder.direction == "north") {// warrior facing North
            if(	this.x+25 > adversary.x &&    // within left side
                this.x+25 < (adversary.x + adversary.width) && //within right side
                this.y-20 > adversary.y && // within top side
                this.y-20 < (adversary.y + adversary.height)) {// within bottom 
                    return true;
            }
        } else if(weilder.direction == "south") {// warrior facing South
            if(	(this.x + 10 > adversary.x) &&    // within left side
                (this.x + 10 < (adversary.x + adversary.width)) && //within right side
                (this.y + 70 > adversary.y) && // within top side
                (this.y + 70 < (adversary.y + adversary.height))) {// within bottom 
                    return true;
            }			
        } else if(weilder.direction == "west") {// warrior facing West        
            if(	this.x -30 > adversary.x &&    // within left side
                this.x -30 < (adversary.x + adversary.width) && //within right side
                this.y + 25 > adversary.y && // within top side
                this.y + 25 < (adversary.y + adversary.height)) {
                    return true;
            }			
        } else if(weilder.direction == "east") {// warrior facing East
            if(	this.x + 60 > adversary.x &&    // within left side
                this.x + 60 < (adversary.x + adversary.width) && //within right side
                this.y + 25 > adversary.y && // within top side
                this.y + 25 < (adversary.y + adversary.height)) {// within bottom 
                    return true;
            }			    
        } else {
            return false;
        }
    }
    
    //override weaponClass.hitTest
	this.hitTest = function(weilder, adversary) {
		if(this.life <= 0) {
			return false;
		}

        this.rollToDetermineIfHit();
        if(this.toHitPoints > 10){
            //this is a hit
            this.rollForDamage();
            this.life = 0;//assumes weapons are only good for one hit
            adversary.takeDamage(this.damagePoints);
            return true;
        } else {
            //this is a miss
            this.life = 0;//assumes weapons are only good for one try
            return false;
        }
    }
}
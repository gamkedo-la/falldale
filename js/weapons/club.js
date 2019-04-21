//Club for Goblins
const CLUB_LIFE = 5;
const BASE_CLUB_COOLDOWN = 15;

clubClass.prototype = new weaponClass();
function clubClass() {
    this.damageDice = 4; // 6 Sided Dice
    this.damagePoints = 4;
    this.attackDice = 20;
    this.attackBonus = 1;

    this.life = 0;
    this.baseClubLife = CLUB_LIFE;
    this.coolDownTime = 0;
    this.clubCooldown = BASE_CLUB_COOLDOWN;

    this.shootFrom = function(weilder) {
		this.x = weilder.x;
		this.y = weilder.y;
        
		this.life = this.baseClubLife;
        this.coolDownTime = this.clubCooldown;
        this.clubCooldown = Math.floor(Math.random() * BASE_CLUB_COOLDOWN);
    }

    //override weaponClass.rangeTest
    this.rangeTest = function(weilder, adversary) {
        if(weilder.direction == "north") {// warrior facing North
            if(this.rangeHitTest(25, -20, adversary)) {return true;}
        } else if(weilder.direction == "south") {// warrior facing South
            if(this.rangeHitTest(10, 70, adversary)) {return true;}
        } else if(weilder.direction == "west") {// warrior facing West
            if(this.rangeHitTest(-30, 25, adversary)) {return true;}
        } else if(weilder.direction == "east") {// warrior facing East
            if(this.rangeHitTest(60, 25, adversary)) {return true;}
        }

        return false;
    }

    this.rangeHitTest = function(deltaX, deltaY, adversary) {
        if((this.x + deltaX > adversary.x) &&
           (this.x + deltaX < (adversary.x + adversary.width)) &&
           (this.y + deltaY > adversary.y) &&
           (this.y + deltaY < (adversary.y + adversary.height))) {
                return true;
        }

        return false;
    }
    
    //override weaponClass.hitTest
	this.hitTest = function(weilder, adversary) {
		if(this.life <= 0) {
			return false;
		}

        this.rollToDetermineIfHit();
        if(this.toHitPoints > redWarrior.armor){
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
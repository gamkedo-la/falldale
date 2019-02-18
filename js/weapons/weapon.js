//Weapon Super Class
function weaponClass() {
    //establish some reasonable defaults, based on original rock.js values
    this.sx = 0;
    this.sy = 0;
    this.speed = 5;
    this.ang = 01;
    this.xv = 1;
    this.yv = 1;
    this.length = 10;
    this.width = 5;
    this.damage = 0;
    this.life = 0;
    this.coolDownTime = 0;
    this.damageDice = 6; // 6 Sided Dice
	this.damagePoints = 6;
    this.toHitPoints = 0;
	this.attackDice = 20;

    this.rollToDetermineIfHit = function() {
		this.setDamageUICountdown();
        this.toHitPoints = Math.floor(Math.random() * this.attackDice) + 1;
	}
	
	this.rollForDamage = function() {
		if(this.toHitPoints >= 10){
			this.damagePoints = Math.floor(Math.random() * this.damageDice) + 1;
			displayDamagePoints = this.damagePoints;
		}
	}
	
	this.setDamageUICountdown = function () {
		damageUIVisibilityCountdown = damageUICountdown * framesPerSecond;
	}

    this.isReady = function() {
		if((this.life <= 0) && (this.coolDownTime <= 0)) {
			this.damage = this.baseDamage;
			return true;
		}
        return false;
    }

    this.hitTest = function(thisEnemy) {
        if ((this.life <= 0) || (this.damage <= 0)) {
            return false;
        }

        if (this.x > thisEnemy.x && // within left side
            this.x < (thisEnemy.x + thisEnemy.width) && //within right side
            this.y > thisEnemy.y && // within top side
            this.y < (thisEnemy.y + thisEnemy.height)) { // within bottom 
                this.life = 0;//assumes weapons are only good for one hit
                return true;
        } else {
            return false;
        }
    }

    this.move = function() {
		if(this.life > 0) {
			this.life--;  
        }
        
        if(damageUIVisibilityCountdown <= 0) {
            this.toHitPoints = 0;
        }

		if(this.coolDownTime > 0) {this.coolDownTime--;}
	}

    this.draw = function() {

    }
}
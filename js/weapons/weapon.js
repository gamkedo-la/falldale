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
  this.life = 0;
  this.coolDownTime = 0;
  this.damageDice = 6; // 6 Sided Dice
  this.damageBonus = 1;
  this.damagePoints = 6;
  this.toHitPoints = 0;
  this.attackDice = 20;
  this.attackBonus = 1;


  this.diceRoll = function(dieToRoll) {
  	return Math.floor(Math.random() * (dieToRoll - 1)) + (1 + this.damageBonus);
  }

  this.rollToDetermineIfHit = function () {
    this.setDamageUICountdown();
    this.toHitPoints = this.diceRoll(this.attackDice);
  };

  this.rollForDamage = function () {
  	this.damagePoints = this.diceRoll(this.damageDice);
    displayDamagePoints = this.damagePoints;
  };

  this.setDamageUICountdown = function () {
    damageUIVisibilityCountdown = damageUICountdown * FRAMES_PER_SECOND;
  };

  this.reset = function () {
    this.life = 0;
  };

  this.isReady = function () {
    if ((this.life <= 0) && (this.coolDownTime <= 0)) {
      return true;
    }
    return false;
  };

  this.rangeTest = function (adversary) {
    if (this.x > adversary.x && // within left side
        this.x < (adversary.x + adversary.width) && //within right side
        this.y > adversary.y && // within top side
        this.y < (adversary.y + adversary.height)) {
      return true;
    } else {
      return false;
    }
  };

  this.hitTest = function (wielder, adversary) {
    if (this.life <= 0) {
      return false;
    }

    //Close enough to the enemy to determine if this is a hit or not
    this.rollToDetermineIfHit();
    if (this.toHitPoints + wielder.experienceLevel > adversary.armorRating) {
      //this is a hit
      this.rollForDamage();
      this.life = 0;//assumes weapons are only good for one hit      
      adversary.takeDamage(this.damagePoints, this.x, this.y);
      return true;
    } else {
      //this is a miss
      this.life = 0;//assumes weapons are only good for one try
      return false;
    }
  };

  this.move = function () {
    if (this.life > 0) {
      this.life--;
    }

    if (damageUIVisibilityCountdown <= 0) {
      this.toHitPoints = 0;
    }

    if (this.coolDownTime > 0) {
      this.coolDownTime--;
    }
  };

  this.draw = function () {

  }
}
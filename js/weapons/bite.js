const BITE_LIFE = 6;
const BASE_BITE_COOLDOWN = 25;

biteClass.prototype = new weaponClass();

function biteClass() {
  this.damageDice = 4; // 6 Sided Dice
  this.damagePoints = 4;
  this.attackDice = 24;
  this.attackBonus = 1;

  this.life = 0;
  this.baseBiteLife = BITE_LIFE;
  this.coolDownTime = 0;
  this.biteCooldown = BASE_BITE_COOLDOWN;

  this.shootFrom = function (wielder) {
    this.x = wielder.x;
    this.y = wielder.y;

    this.life = this.baseBiteLife;
    this.coolDownTime = this.biteCooldown;
    this.biteCooldown = Math.floor(Math.random() * BASE_BITE_COOLDOWN);
  };

  //override weaponClass.rangeTest
  this.rangeTest = function (wielder, adversary) {
    if (wielder.direction == "north") {// warrior facing North
      if (this.rangeHitTest(25, -20, adversary)) {
        return true;
      }
    } else if (wielder.direction == "south") {// warrior facing South
      if (this.rangeHitTest(10, 70, adversary)) {
        return true;
      }
    } else if (wielder.direction == "west") {// warrior facing West
      if (this.rangeHitTest(-30, 25, adversary)) {
        return true;
      }
    } else if (wielder.direction == "east") {// warrior facing East
      if (this.rangeHitTest(60, 25, adversary)) {
        return true;
      }
    }

    return false;
  };

  this.rangeHitTest = function (deltaX, deltaY, adversary) {
    if (adversary == undefined)
      return false;

    if ((this.x + deltaX > adversary.x) &&
        (this.x + deltaX < (adversary.x + adversary.width)) &&
        (this.y + deltaY > adversary.y) &&
        (this.y + deltaY < (adversary.y + adversary.height))) {
      return true;
    }

    return false;
  };

  //override weaponClass.hitTest
  this.hitTest = function (wielder, adversary) {
    if (this.life <= 0) {
      return false;
    }

    this.rollToDetermineIfHit();
    if (this.toHitPoints > redWarrior.armor) {
      //this is a hit
      this.rollForDamage();
      adversary.takeDamage(this.damagePoints, this.x, this.y);
      return true;
    } else {
      //this is a miss
      return false;
    }
  };

  this.draw = function (wielder) {

    let biteXLocation = wielder.x;
    let biteYLocation = wielder.y;
    let rotation = 0;

    let centerX = wielder.x + (wielder.width / 2);
    let centerY = wielder.y + (wielder.height / 2);

    if (wielder.direction == "north") {
      biteXLocation = wielder.x;
      biteYLocation = centerY - (wielder.height / 2);
      rotation = 0;    
    } else if (wielder.direction == "south") {
      biteXLocation = wielder.x;
      biteYLocation = centerY + (wielder.height / 2);
      rotation = 0;
    } else if (wielder.direction == "west") {
      biteXLocation = centerX - (wielder.height / 2);
      biteYLocation = centerY + (wielder.width / 2);
      rotation = -Math.PI / 2;
    } else if (wielder.direction == "east") {      
      biteXLocation = centerX + (wielder.height / 2);
      biteYLocation = centerY - (wielder.width / 2);
      rotation = Math.PI / 2;
    }

    if (this.life > 0) {
      this.mybitePic = bitePic;
      canvasContext.save();
      
      canvasContext.translate(biteXLocation, biteYLocation);        
      canvasContext.rotate(rotation);
      canvasContext.drawImage(this.mybitePic, 0, 0);

      canvasContext.restore();
    }
  }
}
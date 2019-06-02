//OrcSword for Orcs
const ORCSWORD_LIFE = 6;
const BASE_ORCSWORD_COOLDOWN = 20;

orcSwordClass.prototype = new weaponClass();

function orcSwordClass() {
  this.damageDice = 4; // 6 Sided Dice
  this.damagePoints = 10;
  this.damageBonus = 2;
  this.attackDice = 22;
  this.attackBonus = 3;

  this.life = 0;
  this.baseOrcSwordLife = ORCSWORD_LIFE;
  this.coolDownTime = 0;
  this.orcSwordCooldown = BASE_ORCSWORD_COOLDOWN;

  this.shootFrom = function (wielder) {
    this.x = wielder.x;
    this.y = wielder.y;

    this.life = this.baseOrcSwordLife;
    this.coolDownTime = this.orcSwordCooldown;
    this.orcSwordCooldown = Math.floor(Math.random() * BASE_ORCSWORD_COOLDOWN);
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

    let orcSwordWidth = 10;
    let orcSwordLength = 40;
    let orcSwordXLocation = wielder.x;
    let orcSwordYLocation = wielder.y;
    let rotation = 0;

    let centerX = wielder.x + wielder.width / 2;
    let centerY = wielder.y + wielder.height / 2;

    if (wielder.direction == "north") {
      orcSwordWidth = 10;
      orcSwordLength = 20;
      orcSwordXLocation = centerX + 5;
      orcSwordYLocation = wielder.y - orcSwordLength + 10;
    } else if (wielder.direction == "south") {
      orcSwordWidth = 10;
      orcSwordLength = 40;
      orcSwordXLocation = centerX - 5;
      orcSwordYLocation = centerY + 35;
      rotation = Math.PI;
    } else if (wielder.direction == "west") {
      orcSwordWidth = 40;
      orcSwordLength = 10;
      orcSwordXLocation = wielder.x - orcSwordWidth + 30;
      orcSwordYLocation = centerY - 2;
      rotation = -Math.PI / 2;
    } else if (wielder.direction == "east") {
      orcSwordWidth = 40;
      orcSwordLength = 10;
      orcSwordXLocation = wielder.x + 60;
      orcSwordYLocation = centerY - 2;
      rotation = Math.PI / 2;
    }

    if (this.life > 0) {
      this.myorcSwordPic = swordPic;
      canvasContext.save();

      if (rotation != 0) {
        canvasContext.translate(orcSwordXLocation, orcSwordYLocation);
        canvasContext.rotate(rotation);
        canvasContext.drawImage(this.myorcSwordPic, -orcSwordWidth / 2, -orcSwordLength / 2);
      } else {
        canvasContext.drawImage(this.myorcSwordPic, orcSwordXLocation, orcSwordYLocation);
      }

      canvasContext.restore();
    }
  }
}
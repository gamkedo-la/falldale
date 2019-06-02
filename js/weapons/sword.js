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

  this.shootFrom = function (wielder) {
    this.x = wielder.x;
    this.y = wielder.y;

    this.rollToDetermineIfHit();
    if (this.toHitPoints > 0) {
      this.rollForDamage();
    }

    this.life = SWORD_LIFE;
    this.coolDownTime = SWORD_COOLDOWN;
  };

  this.checkhit = function (adversary) {
    if (this.toHitPoints >= 10) {

      if (this.damagePoints > 0) {
        dialogManager.setDialogWithCountdown("Successful hit " + adversary.myName + " for " + this.damagePoints + " damage point!");
        if (adversary.takeDamage) { // this can sometimes be undefined
          adversary.takeDamage(this.damagePoints, this.x, this.y);
        }
        this.damagePoints = 0;
      }

      if (adversary.health < 0) {
        wielder.experience = wielder.experience + 100;
        wielder.checkForLevelUp();
      }
    } else {
      dialogManager.setDialogWithCountdown(adversary.myName + " dodged your sword swing.  You rolled a " + this.toHitPoints + ".");
    }
  };

  //override weaponClass.hitTest
  this.hitTest = function (wielder, adversary) {
    if (this.life <= 0) {
      return false;
    }

    let enemyRect = adversary;
    let weaponRect = {};
    let warriorWidth = 50;
    let swordLength = 30;
    let swordWidth = 30;

    if (redWarrior.direction == "north") {// warrior facing North

      weaponRect.x = this.x + warriorWidth - swordWidth;
      weaponRect.width = swordWidth;
      weaponRect.y = this.y - swordLength;
      weaponRect.height = swordLength;

    } else if (redWarrior.direction == "south") {// warrior facing South

      weaponRect.x = this.x;
      weaponRect.width = swordWidth;
      weaponRect.y = this.y + warriorWidth;
      weaponRect.height = swordLength;

    } else if (redWarrior.direction == "west") {// warrior facing West

      weaponRect.x = this.x - swordLength;
      weaponRect.width = swordLength;
      weaponRect.y = this.y + warriorWidth - swordWidth;
      weaponRect.height = swordWidth;

    } else if (redWarrior.direction == "east") {// warrior facing East

      weaponRect.x = this.x + warriorWidth;
      weaponRect.width = swordLength;
      weaponRect.y = this.y + warriorWidth - swordWidth;
      weaponRect.height = swordWidth;

    } else {
      return false;
    }

    if (this.rangeTest(weaponRect, enemyRect))
      this.checkhit(adversary)
  };

  this.rangeTest = function (weaponRect, enemyRect) {
    return !(enemyRect.x > (weaponRect.x + weaponRect.width) ||
        (enemyRect.x + enemyRect.width) < weaponRect.x ||
        enemyRect.y > (weaponRect.y + weaponRect.height) ||
        (enemyRect.y + enemyRect.height) < weaponRect.y);
  };

  this.draw = function (wielder) {

    var swordWidth = 10;
    var swordLength = 40;
    var swordXLocation = wielder.x;
    var swordYLocation = wielder.y;
    var rotation = 0;

    if (redWarrior.direction == "north") {
      swordWidth = 10;
      swordLength = 20;
      swordXLocation = wielder.centerX + 5;
      swordYLocation = wielder.y - swordLength + 10;
    } else if (redWarrior.direction == "south") {
      swordWidth = 10;
      swordLength = 40;
      swordXLocation = wielder.centerX - 5;
      swordYLocation = wielder.centerY + 35;
      rotation = Math.PI;
    } else if (redWarrior.direction == "west") {
      swordWidth = 40;
      swordLength = 10;
      swordXLocation = wielder.x - swordWidth + 30;
      swordYLocation = wielder.centerY;
      rotation = -Math.PI / 2;
    } else if (redWarrior.direction == "east") {
      swordWidth = 40;
      swordLength = 10;
      swordXLocation = wielder.x + 60;
      swordYLocation = wielder.centerY + 30;
      rotation = Math.PI / 2;
    }

    if (this.life > 0) {
      if (this.isMagic) {
        this.mySwordPic = magicSwordPic;
      } else {
        this.mySwordPic = swordPic;
      }
      canvasContext.save();
      if (rotation != 0) {
        canvasContext.translate(swordXLocation, swordYLocation);
        canvasContext.rotate(rotation);
        canvasContext.drawImage(this.mySwordPic, -swordWidth / 2, -swordLength / 2);
      } else {
        canvasContext.drawImage(this.mySwordPic, swordXLocation, swordYLocation);
      }

      canvasContext.restore();
    }
  }
}


const FIREBALL_LIFE = 30;
const FIREBALL_DAMAGE = 1;

enemyFireBallClass.prototype = new weaponClass();

function enemyFireBallClass() {
  this.movementAng = 0;
  this.baseDamage = FIREBALL_DAMAGE;
  this.damageDice = 4;//4 sided die, overrides default 6
  this.damagePoints = 4;//overrides default 6

  this.superClassMove = this.move;
  this.move = function () {
    this.superClassMove();

    this.x += this.xv;
    this.y += this.yv;
  };

  this.shootFrom = function (warriorAttack, dir = direction) {

    this.direction = dir;

    if (this.direction == "north") {
      this.xv = 0;
      this.yv = -this.speed;
      this.length = 20;
      this.width = 4;
      this.movementAng = Math.PI * 0.5;

      this.x = warriorAttack.x;
      this.y = warriorAttack.y + 30;
    } else if (this.direction == "south") {
      this.xv = 0;
      this.yv = this.speed;
      this.length = 20;
      this.width = 4;
      this.movementAng = Math.PI * -0.5;

      this.x = warriorAttack.x + 5;
      this.y = warriorAttack.y + 25;

    } else if (this.direction == "west") {
      this.xv = -this.speed;
      this.yv = 0;
      this.length = 4;
      this.width = 20;
      this.movementAng = Math.PI;

      this.x = warriorAttack.x;
      this.y = warriorAttack.y + 30;
    } else if (this.direction == "east") {
      this.xv = this.speed;
      this.yv = 0;
      this.length = 4;
      this.width = 20;
      this.movementAng = 0;
      this.x = warriorAttack.x + 15;
      this.y = warriorAttack.y + 30;
    }

    this.life = FIREBALL_LIFE;
  };

  this.superClassHitTest = this.hitTest;
  this.hitTest = function (wielder, adversary) {
    if (this.superClassHitTest(wielder, adversary)) {
      dialogManager.setDialogWithCountdown("Successful fireball on " + adversary.myName + "!", 5);
    }
  };

  this.draw = function () {
    if (this.life > 0) {
      //colorCircle(this.x, this.y, 5, "orange");
      canvasContext.drawImage(fireballPic, this.x - 4, this.y - 4);
    }
  }

}
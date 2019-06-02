var bullywugMoveSpeed = 0.5;
const BULLYWUG_TIME_BETWEEN_CHANGE_DIR = 100;
var bullywugsKilled = 0;

bullywugClass.prototype = new enemyClass();

function bullywugClass() {
  this.speed = bullywugMoveSpeed;
  this.maxhealth = 10;
  this.myMelee = new clubClass();
  this.width = 50;
  this.numberOfFrames = 0;
  this.height = 50;
  this.ticksPerFrame = 5;
  this.treasureAvailable = true;
  this.chanceToProvideTreasure = 1;
  this.hurtSound = goblinHurtSound;
  this.picVariants = [ bullywugPic ];
  this.deadPic = deadGoblinPic;
  this.faceNorthMul = 0;
  this.faceSouthMul = 0;
  this.shadowXOffset = 16;
  this.shadowYOffset = 20;

  this.superClassInitialize = this.initialize;
  this.initialize = function (enemyName, enemyPic, numberOfFrames = 1) {
    this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
    this.originalNumberOfFrames = this.numberOfFrames;
  };

  this.superClassMove = this.move;
  this.move = function () {
    this.superClassMove(BULLYWUG_TIME_BETWEEN_CHANGE_DIR);
    this.myMelee.move();
    this.myMelee.x = this.x;
    this.myMelee.y = this.y;
  };

  this.distributeTreasure = function () {
    // TODO: port back to enemyClass
    var chanceOnTreasure = Math.round(Math.random() * 10);
    if (chanceOnTreasure >= 1) {
      console.log("Treasure Provided");
      var randomTreasure = Math.round(Math.random() * 4);
      switch (randomTreasure) {
        case 1:
          heartsList.push(new heartClass(1, this.x, this.y));
          break;
        case 2:
          goldList.push(new goldClass(5, this.x, this.y));
          break;
        case 3:
          healingPotionList.push(new healingPotionClass(1, this.x, this.y));
          break;
        case 4:
          console.log("Provide Map");
          if (redWarrior.haveMap == false) {
            mapList.push(new mapClass(this.x, this.y));
          } else {
            goldList.push(new goldClass(5, this.x, this.y));
          }
          break;
      }
    }
  };

  this.superClassTakeDamage = this.takeDamage;
  this.takeDamage = function (howMuch, fromX, fromY) {
    this.superClassTakeDamage(howMuch, fromX, fromY);
    if (!this.alive && this.treasureAvailable) {
      this.distributeTreasure();
      this.treasureAvailable = false;
      bullywugsKilled++;
      countGoblinforQuestOne();
    }
  };

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      // add function here for hit chance
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by a bullywug.", 5);
      return true;
    }
    return false;
  };

  this.superClassNewRandomPic = this.newRandomPic;
  this.newRandomPic = function () {
    this.superClassNewRandomPic();
    if (this.myPic == bullywugPic) {
      this.numberOfFrames = this.originalNumberOfFrames;
    } else {
      this.numberOfFrames = 1;
    }
  }
}

const ORC_SPEED = 1.2;
const ORC_TIME_BETWEEN_CHANGE_DIR = 200;

var orcsKilled = 0;

orcClass.prototype = new enemyClass();

function orcClass() {
  this.speed = ORC_SPEED;
  this.health = 12;
  this.maxhealth = 12;
  this.alive = true;
  this.myMelee = new orcSwordClass();  
  this.treasureAvailable = true;
  this.myBite = new biteClass();
  this.displayHealth = false;
  this.tickCount = 0;
  this.frameIndex = 0;
  this.width = 51;
  this.numberOfFrames = 6;
  this.height = 69;
  this.ticksPerFrame = 5;
  this.shadowXOffset = 4;
  this.shadowYOffset = 56;
  this.deadPic = deadOrcPic;
  this.picVariants = [ orcPic, orcPic2, orcPic3 ];

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    //this.mySword.reset();
  };
 
  this.superClassInitialize = this.initialize;
  this.initialize = function (enemyName, enemyPic, numberOfFrames) {
    this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
    this.originalNumberOfFrames = this.numberOfFrames;
  };
  
  this.superClassMove = this.move;
  this.move = function () {
   this.superClassMove(ORC_TIME_BETWEEN_CHANGE_DIR);
    this.myMelee.move();
    this.myMelee.x = this.x;
    this.myMelee.y = this.y;
  };
  
  this.distributeTreasure = function () {
    // TODO: port back to enemyClass
    var chanceOnTreasure = Math.round(Math.random() * 10);
    if (chanceOnTreasure >= 8) {
      console.log("Treasure Provided");
      var randomTreasure = Math.round(Math.random() * 3);
      switch (randomTreasure) {
        case 1:
          heartsList.push(new heartClass(2, this.x, this.y));
          break;
        case 2:
          goldList.push(new goldClass(10, this.x, this.y));
          break;
        case 3:
          healingPotionList.push(new healingPotionClass(1, this.x, this.y));
          break;
      }
	}
  }

  this.superClassTakeDamage = this.takeDamage;
  this.takeDamage = function (howMuch, fromX, fromY) {
    this.superClassTakeDamage(howMuch, fromX, fromY);
    if (!this.alive && this.treasureAvailable) {
      this.distributeTreasure();
      this.treasureAvailable = false;
      orcsKilled++;
      countOrcforQuestTwo();
	}
  }

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by an Orc! That really hurts.", 5);
//            dialog = "Ouch! I've been bitten by a Orc! That really hurts.";
      return true;
    }
    return false;
  }
}

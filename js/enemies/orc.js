const ORC_SPEED = 0.6;

orcClass.prototype = new enemyClass();

function orcClass() {
  this.speed = ORC_SPEED;
  this.health = 12;
  this.maxhealth = 12;
  this.alive = true;
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

  this.superClassMove = this.move;
  this.move = function () {
    this.superClassMove(this.timeBetweenChangeDir);

    if (this.walkNorth) {
      this.sy = 0;
    }

    if (this.walkSouth) {
      this.sy = this.height * 1;
    }
    if (this.walkWest) {
      this.sy = this.height * 2;
    }
    if (this.walkEast) {
      this.sy = this.height * 3;
    }
  };

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

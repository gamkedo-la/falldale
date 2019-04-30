const ORCBOSS_SPEED = 0.6;

orcBossClass.prototype = new enemyClass();

function orcBossClass() {
  this.speed = ORC_SPEED;
  this.maxhealth = 100;
  this.width = 81;
  this.height = 100;
  this.ticksPerFrame = 5;
  this.faceNorthMul = 1;
  this.faceSouthMul = 0;
  this.shadowOffsetX = 4;
  this.shadowOffsetY = 54;
  this.deadPic = deadOrcBossPic;
  this.framesPerDeadOrcBoss = 0;

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
  };

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by the Orc King! That really hurts.", 5);
      return true;
    }
    return false;
  }
  this.countFramesForDeadOrcBoss = function () {
    this.framesPerDeadOrcBoss++;
    if (this.framesPerDeadOrcBoss == 120) {
      enemyReadyToRemove();
    }
  };
    
  this.superClassDraw = this.draw;
  this.draw = function () {
    this.superClassDraw();
	console.log(this.health)
    if (!this.alive) {
	  if(displayQ3){
		questThreeComplete();
	  }
      this.countFramesForDeadOrcBoss();
      removeEnemy();
    }
  }
}

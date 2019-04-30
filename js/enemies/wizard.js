const WIZARD_SPEED = 0.6;


wizardClass.prototype = new enemyClass();

function wizardClass() {
  this.speed = WIZARD_SPEED;
  this.maxhealth = 500;
  this.width = 50;
  this.height = 90;
  this.ticksPerFrame = 5;
  this.shadowXOffset = 4;
  this.shadowYOffset = 54;
  this.deadPic = deadGoblinPic;
  this.treasureAvailable = true;

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
  };

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by a Wizard! That really hurts.", 5);
//            dialog = "Ouch! I've been bitten by a Wizard! That really hurts.";
      return true;
    }
    return false;
  }
  
  this.distributeTreasure = function () {
    // TODO: port back to enemyClass
      console.log("Crystal to be Provide");
	  this.treasureAvailable = false;
  }
  
  this.superClassTakeDamage = this.takeDamage;
  this.takeDamage = function (howMuch) {
    this.superClassTakeDamage(howMuch);
    if (!this.alive && this.treasureAvailable) {
      this.distributeTreasure();
      this.treasureAvailable = false;
	  questFiveComplete()
    } 
  }
}

var archerMoveSpeed = 0.5;
const ARCHER_TIME_BETWEEN_CHANGE_DIR = 20;
const ARCHER_PATROL_RADIUS = 200;
const ARCHER_SHOTLANE_THICKNESS = 50;

archerClass.prototype = new enemyClass();

function archerClass(archerName) {
  this.speed = archerMoveSpeed;
  this.maxhealth = 6;
  this.width = 50;
  this.height = 50;
  this.ticksPerFrame = 8;
  this.faceNorthMul = 1;
  this.faceSouthMul = 0;
  this.shadowXOffset = 8;
  this.shadowYOffset = 32;

  this.superClassInitialize = this.initialize;
  this.initialize = function (enemyName, enemyPic, numberOfFrames) {
    this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
    this.originalNumberOfFrames = this.numberOfFrames;
    this.myArrow = new arrowClass(this.direction);
    this.arrowList = [];
    this.myBite.baseBiteLife = 30; //Archers bite, but they're not very good at it
    this.myBite.baseBiteCooldown = 10; //
    this.myRanged = new rangedWeaponClass(); //Archers can shoot arrows
  };

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.myArrow.reset();
  };

  this.superClassMove = this.move;
  this.move = function () {
    this.superClassMove(ARCHER_TIME_BETWEEN_CHANGE_DIR);
    this.myArrow.move();
    if (this.alive) {
      this.checkToFireArrow();
    }
  };

  this.checkToFireArrow = function () {
    if(!redWarrior.isInsideAnyBuilding) {
      if (this.direction == "south") {
        if (this.y <= redWarrior.y) { //Archer above the player
          if ((this.x <= redWarrior.x + ARCHER_SHOTLANE_THICKNESS) &&
              (this.x >= redWarrior.x - ARCHER_SHOTLANE_THICKNESS)) {
            // console.log("I'm facing South and above the player");
            this.shotArrow();
          }
        }
      }
      if (this.direction == "north") { //Archer is below the Archer
        if (this.y >= redWarrior.y) {
          if ((this.x <= redWarrior.x + ARCHER_SHOTLANE_THICKNESS) &&
              (this.x >= redWarrior.x - ARCHER_SHOTLANE_THICKNESS)) {
            // console.log("I'm facing North and below the player");
            this.shotArrow();
          }
        }
      }
      if (this.direction == "east") { // Archer is West of the Archer
        if (this.x <= redWarrior.x) {
          if ((this.y <= redWarrior.y + ARCHER_SHOTLANE_THICKNESS) &&
              (this.y >= redWarrior.y - ARCHER_SHOTLANE_THICKNESS)) {
            // console.log("I'm facing East and West of the player");
            this.shotArrow();
          }
        }
      }
      if (this.direction == "west") { // Archer is East of the Archer
        if (this.x >= redWarrior.x) {
          if ((this.y <= redWarrior.y + ARCHER_SHOTLANE_THICKNESS) &&
              (this.y >= redWarrior.y - ARCHER_SHOTLANE_THICKNESS)) {
            // console.log("I'm facing West and East of the player");
            this.shotArrow();
          }
        }
      }
    }
  };

  this.shotArrow = function () {
    if (this.myArrow.isReady()) {
      this.myArrow.shootFrom(this, this.direction);
      arrowShotSound.play();
    }
  };

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      // need to add a function for chance to do damage
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by an Archer! An Archer!", 5);
      return true;
    }
    return false;
  };

  this.rangedAttack = function () {

  };

  this.superClassDraw = this.draw;
  this.draw = function () {
    this.superClassDraw();
    this.myArrow.draw();
  }
}

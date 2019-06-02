const SKELETON_SPEED = 0.5;
const SKELETON_TIME_BETWEEN_CHANGE_DIR = 600;
var skeletonKilled = 0;

skeletonClass.prototype = new enemyClass();

function skeletonClass() {
  this.speed = SKELETON_SPEED;
  this.maxhealth = 20;
  this.width = 31;
  this.numberOfFrames = 6;
  this.height = 52;
  this.ticksPerFrame = 5;
  this.timeBetweenChangeDir = 700;
  this.treasureAvailable = true;
  this.framesPerDeadSkeleton = 0;
  this.myMelee = new orcSwordClass();  
  this.hurtSound = skeletonHurtSound;
  this.picVariants = [ skeletonPic, skeletonPic2, skeletonPic3 ];
  this.shadowXOffset = 16;
  this.shadowYOffset = 32;
  this.deadPic = deadSkeletonPic;
  this.health = 15;
  this.alive = true;

  this.superClassInitialize = this.initialize;
  this.initialize = function (enemyName, enemyPic, numberOfFrames) {
    this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
	this.originalNumberOfFrames = this.numberOfFrames;
    this.myBite.baseBiteLife = 30;	//Skeletons bite, but they're not very good at it
    this.myBite.baseBiteCooldown = 10;
    this.pather = new Pathfinder3();
  };


  this.distributeTreasure = function () {
    var chanceOnTreasure = Math.round(Math.random() * 10);
    if (chanceOnTreasure >= 1) {
      console.log("Treasure Provided");
      var randomTreasure = Math.round(Math.random() * 3);
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
      }
    }
  };
  
  this.distributeTreasure = function () {
    // TODO: port back to enemyClass
    var chanceOnTreasure = Math.round(Math.random() * 10);
    if (chanceOnTreasure >= 9) {
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
	  skeletonsKilledInGraveyard();
	  skeletonKilled++;
    }
  };

  this.superClassMove = this.move;
  this.move = function () {
   this.superClassMove(SKELETON_TIME_BETWEEN_CHANGE_DIR);
    this.myMelee.move();
    this.myMelee.x = this.x;
    this.myMelee.y = this.y;
  };


  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by a Skeleton! Who knew they could do that?!?", 5);
      return true;
    }
    return false;
  };
  
  this.distributeTreasure = function () {
    // TODO: port back to enemyClass
    var chanceOnTreasure = Math.round(Math.random() * 10);
    if (chanceOnTreasure >= 9) {
      console.log("Treasure Provided");
      var randomTreasure = Math.round(Math.random() * 3);
      switch (randomTreasure) {
        case 1:
          heartsList.push(new heartClass(5, this.x, this.y));
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

  this.countFramesForDeadSkeleton = function () {
    this.framesPerDeadSkeleton++;
    if (this.framesPerDeadSkeleton == 120) {
      enemyReadyToRemove();
    }
  };
  
  this.superClassNewRandomPic = this.newRandomPic;
  this.newRandomPic = function () {
    this.superClassNewRandomPic();
    if (this.myPic == goblinPic) {
      this.numberOfFrames = this.originalNumberOfFrames;
    } else {
      this.numberOfFrames = 1;
    }
  }

  this.superClassDraw = this.draw;
  this.draw = function () {
    this.superClassDraw();
    if (!this.alive) {
      this.countFramesForDeadSkeleton();
      removeEnemy();
    }
  }
}

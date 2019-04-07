const SKELETON_SPEED = 0.5;

skeletonClass.prototype = new enemyClass();
function skeletonClass() {
	this.speed = SKELETON_SPEED;
	this.maxhealth = 8;
	this.width = 31;
	this.numberOfFrames = 6;
	this.height = 52;
	this.ticksPerFrame = 5;
	this.timeBetweenChangeDir = 700;
	this.treasureAvailable = true;
	this.framesPerDeadSkeleton = 0;
	this.hurtSound = skeletonHurtSound;
	this.picVariants = [skeletonPic, skeletonPic2, skeletonPic3];
	this.shadowXOffset = 16;
	this.shadowYOffset = 32;
	this.deadPic = deadSkeletonPic;
	
	this.superClassInitialize = this.initialize;
	this.initialize = function(enemyName, enemyPic) {
		this.superClassInitialize(enemyName, enemyPic);
		this.myBite.baseBiteLife = 30;	//Skeletons bite, but they're not very good at it
		this.myBite.baseBiteCooldown = 10;
		this.pather = new Pathfinder3();
	}

	this.distributeTreasure = function(){
		var chanceOnTreasure = Math.round(Math.random() * 10);
		if(chanceOnTreasure >= 1){	
			console.log("Treasure Provided")		
			var randomTreasure =  Math.round(Math.random() * 3);
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
	}

	this.superClassTakeDamage = this.takeDamage;	
	this.takeDamage = function(howMuch) {
		this.superClassTakeDamage(howMuch);
		if(this.alive && this.treasureAvailable){
			this.distributeTreasure();
			this.treasureAvailable = false;
		}
	}
	
	this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
			dialogManager.setDialogWithCountdown("Ouch! I've been bitten by a Skeleton! Who knew they could do that?!?", 5);
			return true;
		}
		return false;
    }
	
	this.countFramesForDeadSkeleton = function(){
		this.framesPerDeadSkeleton++;
		if(this.framesPerDeadSkeleton == 120){
			enemyReadyToRemove();
		}
	}
	
	this.superClassDraw = this.draw;
	this.draw = function() {
		this.superClassDraw();
		if (!this.alive) {
			this.countFramesForDeadSkeleton();
			removeEnemy();
		}
	}
}

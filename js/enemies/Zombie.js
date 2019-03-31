const ZOMBIE_SPEED = 0.3;


zombieClass.prototype = new enemyClass();
function zombieClass() {
	this.speed = ZOMBIE_SPEED;
	this.maxhealth = 30;
	this.width = 30;
	this.height = 52;
	this.numberOfFrames = 6;
	this.ticksPerFrame = 7;
	this.timeBetweenChangeDir = 700;
	this.picVariants = [zombiePic, zombiePic2, zombiePic3];
	this.hurtSound = zombieHurtSound;
	this.deadPic = deadZombiePic;
	this.shadowXOffset = 20;
	this.shadowYOffset = 32;
	
	this.superClassInitialize = this.initialize;
	this.initialize = function(enemyName, enemyPic) {
		this.superClassInitialize(enemyName, enemyPic);
		this.myBite.baseBiteLife = 2;		//Zombies bite, all the time
		this.myBite.baseBiteCooldown = 2;	//
	}

	this.superClassReset = this.reset;
	this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
		this.timeBetweenChangeDir = Math.floor(Math.random() * 700) + 101;//set minimum time to 101 => avoid tazmanian zombie
	}

	this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
			dialogManager.setDialogWithCountdown("Ouch! I've been bite by a zombie.  I hope it isn't contagious.", 5);
			return true;
		}
		return false;
    }
}

const SKELETON_SPEED = 0.5;

skeletonClass.prototype = new enemyClass();
function skeletonClass(skeletonName) {
	this.speed = SKELETON_SPEED;
	this.mySkeletonPic = skeletonPic; // which picture to use
	this.myName = skeletonName;

	this.maxhealth = 8;
	this.alive = true;
	this.myBite = new biteClass();	//
	this.myBite.baseBiteLife = 30;			//Archers bite, but they're not very good at it
	this.myBite.baseBiteCooldown = 10;		//
	this.displayHealth = false;
	this.skeletonHealthCountdownSeconds = 5;
	this.skeletonDisplayHealthCountdown = this.skeletonHealthCountdownSeconds * 30;

	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 35;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.skeletonMove = true;
	this.skeletonTimeBetweenChangeDir = 700;
	this.pather = new Pathfinder3();
	this.treasureAvailable = true;
	this.framesPerDeadSkeleton = 0;

	this.superClassReset = this.reset;
	this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
		this.mySkeletonPic = skeletonPic;
		this.health = 8;
		this.newRandomPic();
	}
	
	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove(this.skeletonTimeBetweenChangeDir);
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
	
	
	this.takeDamage = function(howMuch) {
		this.health -= howMuch;
		skeletonHurtSound.play();
		this.displayHealth = true;
		if(this.health <= 0){
			if(this.treasureAvailable){
				this.distributeTreasure();
				this.treasureAvailable = false;
			}
		}
	}
	
	this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
			setDialogUICountdown(5);
            dialog = "Ouch! I've been bite by a Skeleton! Who knew they could do that?!?";
        }
    }
	
	this.newRandomPic = function() {
        var whichPic = Math.round(Math.random() * 3);
        switch (whichPic) {
            case 0:
                this.mySkeletonPic = skeletonPic;
                break;
            case 1:
                this.mySkeletonPic = skeletonPic2;
                break;
            case 2:
                this.mySkeletonPic = skeletonPic3;
                break;
        }
    }
	
	this.countFramesForDeadSkeleton = function(){
		this.framesPerDeadSkeleton++;
		if(this.framesPerDeadSkeleton == 120){
			enemyReadyToRemove()
		}
	}
	
		
	this.draw = function() { 
		if(this.skeletonMove) {
			this.tickCount++;
		}
		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;
			if(this.frameIndex < this.numberOfFrames-1) {
				this.frameIndex += 1;
			} else {
				this.frameIndex = 0;
			}
		}
		
		if(this.health > 0){
			
			if(gamePaused == false){
				this.sx = this.frameIndex * this.width;
			}
			
			this.sy = 0;
			this.sx = 0;
			
			canvasContext.drawImage(shadowPic, this.x-16, this.y+32);
			canvasContext.drawImage(this.mySkeletonPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
			
			if(this.displayHealth){
				if(this.skeletonDisplayHealthCountdown >= 0) {
					colorRect(this.x,this.y-16, 40,12, "black"); 
					colorRect(this.x+2,this.y-14, 35, 8, "red");
					colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
					this.skeletonDisplayHealthCountdown--;
				} else {
					this.skeletonDisplayHealthCountdown = this.skeletonHealthCountdownSeconds * 30;
					this.displayHealth = false;
				}
			}
			
			
			if(debugMode){
				colorRect(this.x,this.y, 5,5, "red"); 
				colorRect(this.x,this.y+this.height, 5,5, "red");
				colorRect(this.x+this.width,this.y, 5,5, "red");
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red");
				}
		
		} else {
			this.countFramesForDeadSkeleton();
			canvasContext.drawImage(deadSkeletonPic, this.x,this.y);
			//removeEnemy();
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}	
	}
}
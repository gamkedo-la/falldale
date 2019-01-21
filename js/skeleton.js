var goblinMoveSpeed = 0.5;
const SKELETON_TIME_BETWEEN_CHANGE_DIR = 700;
const SKELETON_COLLISION_RADIUS = 10;

skeletonClass.prototype = new enemyClass();
function skeletonClass(skeletonName) {
	this.speed = 2;
	this.mySkeletonPic = skeletonPic; // which picture to use
	this.myName = "Untitled skeleton";

	this.maxhealth = 8;
	this.alive = true;
	this.biteReadyTicker = 30;
	this.biteReady = true;
	this.myName = skeletonName;
		
	
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 35;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.skeletonMove = true;


	this.reset = function(whichImage, skeletonName) {
		this.name = skeletonName;
		this.mySkeletonPic;

		this.health = 8;
		
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_SKELETON) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
		console.log("No Skeleton Start found!");
	} // end of skeletonRest func
	

	
	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove(SKELETON_TIME_BETWEEN_CHANGE_DIR, goblinMoveSpeed);
	}
	
	this.skeletonBite = function() {

		if(this.biteReady == true){
			redWarrior.health = redWarrior.health -0.5;	
			playerHurtSound.play();
			dialog = "Ouch! I've been bite by a skeleton for .5 points of damage.";	
			this.biteReady = false;
		}
		else if(this.biteReady == false) {	
			this.biteReadyCounter();
		}
	}
	
	this.biteReadyCounter = function() {
		if(this.biteReadyTicker > 0){ 
			this.biteReadyTicker--;
		} else if(this.biteReadyTicker <= 0){
			this.biteReadyTicker = 30;
			this.biteReady = true;
		}
	}

	this.isOverlappingPoint = function(testX, testY) {  // textX is redWarrior.x and testY is redWarrior.y
		
		//test if redWarrior is inside box of Monster
				
		if(this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY){
			this.skeletonBite();
		}
		// add result if true
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
			this.sx = this.frameIndex * this.width;
			canvasContext.drawImage(this.mySkeletonPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
			
			if(displayHealth){
				colorRect(this.x,this.y-16, 40,12, "black"); 
				colorRect(this.x+2,this.y-14, 35, 8, "red");
				colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
			}
			
			
			if(debugMode){
				colorRect(this.x,this.y, 5,5, "red"); 
				colorRect(this.x,this.y+this.height, 5,5, "red");
				colorRect(this.x+this.width,this.y, 5,5, "red");
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red");
				}
		
		} else {
			canvasContext.drawImage(deadSkeletonPic, this.x,this.y);
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}	
	}
}
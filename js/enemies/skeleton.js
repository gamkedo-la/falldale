
skeletonClass.prototype = new enemyClass();
function skeletonClass(skeletonName) {
	this.speed = 2;
	this.mySkeletonPic = skeletonPic; // which picture to use
	this.myName = skeletonName;

	this.maxhealth = 8;
	this.alive = true;
	this.myBite = new biteClass();	//
	this.myBite.baseBiteLife = 30;			//Archers bite, but they're not very good at it
	this.myBite.baseBiteCooldown = 10;		//

	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 35;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.skeletonMove = true;
	this.skeletonTimeBetweenChangeDir = 700;
	this.skeletonMoveSpeed = 0.5;
	this.pather = new Pathfinder3();
	this.currentPath = [];
	this.currentPathIndex = 1;

	this.superClassReset = this.reset;
	this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
		this.mySkeletonPic = skeletonPic;
		this.health = 8;
		this.newRandomPic();
	}
	

	
	this.superClassMove = this.move;
	this.move = function() {
		//		this.superClassMove(this.skeletonTimeBetweenChangeDir, this.skeletonMoveSpeed);

		if (this.health <= 0) {
			return;
		}

		var nextX = this.x;
		var nextY = this.y;
		this.cyclesTilDirectionChange--;
		if (this.cyclesTilDirectionChange <= 0) {
			this.cyclesTilDirectionChange = this.skeletonTimeBetweenChangeDir;
//			console.log("Skeleton Direction Change: " + this.cyclesTilDirectionChange);
			const thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
			const warriorTileIndex = getTileIndexAtPixelCoord(redWarrior.x, redWarrior.y);

//			console.log("Skeleton Index: " + thisTileIndex + ", Warrior Index: " + warriorTileIndex);

			this.currentPath = this.pather.pathFrom_To_(thisTileIndex, warriorTileIndex);
			this.currentPathIndex = 1;
//			console.log("Current Path: " + this.currentPath);
		}

		if(this.currentPath == null) {
//			console.log("Skeleton Path is null");
			this.superClassMove(this.skeletonTimeBetweenChangeDir, this.skeletonMoveSpeed);
		} else {
			let nextPos = getCenterPixelCoordForArrayIndex(this.currentPath[this.currentPathIndex]);
//			console.log("Index: " + this.currentPath[this.currentPathIndex] + ", Next Pos: (" + nextPos.x + ", " + nextPos.y + "), This Pos: (" + this.x + ", " + this.y + ")");
			if((Math.abs(nextPos.x - this.x) < 5) && (Math.abs(nextPos.y - this.y) < 5)) {
				console.log("Made it to the next step: " + this.currentPathIndex);
				this.currentPathIndex++;
				if(this.currentPathIndex == this.currentPath.length) {
					this.superClassMove(this.skeletonTimeBetweenChangeDir, this.skeletonMoveSpeed);
					this.myBite.move();
					this.myBite.x = this.x;
					this.myBite.y = this.y;
					return;
				} else {
					nextPos = getCenterPixelCoordForArrayIndex(this.currentPath[this.currentPathIndex]);
				}
			}

			if(nextPos.x > this.x) {
//				console.log("Moving East");
				this.walkNorth = false;
				this.walkEast = true;
				this.walkWest = false;
				this.walkSouth = false;
			} else if(nextPos.x < this.x) {
//				console.log("Moving West");
				this.walkNorth = false;
				this.walkEast = false;
				this.walkWest = true;
				this.walkSouth = false;
			} else if(nextPos.y > this.y) {
//				console.log("Moving South");
				this.walkNorth = false;
				this.walkEast = false;
				this.walkWest = false;
				this.walkSouth = true;
			} else if(nextPos.y < this.y) {
//				console.log("Moving North");
				this.walkNorth = true;
				this.walkEast = false;
				this.walkWest = false;
				this.walkSouth = false;
			}
		}

		// which directional image to use

		if (this.walkNorth) {
			nextY -= this.skeletonMoveSpeed * this.speedMult;
			this.sx = 0;
			this.sy = (this.height)+1;
			this.direction = "north";
		}

		if (this.walkSouth) {
			nextY += this.skeletonMoveSpeed * this.speedMult;
			this.sx = 0;
			this.sy = 0;
			this.direction = "south";
		}
		if (this.walkWest) {
			nextX -= this.skeletonMoveSpeed * this.speedMult;
			this.sx = 0;
			this.sy = (this.height*2)+1;
			this.direction = "west";
		}
		if (this.walkEast) {
			nextX += this.skeletonMoveSpeed * this.speedMult;
			this.sx = 0;
			this.sy = (this.height*3)+1;
			this.direction = "east";
		}

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
		var walkIntoTileType = TILE_WALL;

		if (this.direction == "north") {
			walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, (nextY - 25));
		}
		if (this.direction == "south") {
			walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, (nextY + 25));
		}
		if (this.direction == "west") {
			walkIntoTileIndex = getTileIndexAtPixelCoord((nextX - 25), nextY);
		}
		if (this.direction == "east") {
			walkIntoTileIndex = getTileIndexAtPixelCoord((nextX + 25), nextY);
		}

		if (walkIntoTileIndex != undefined) {
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch (walkIntoTileType) {
			case TILE_BRIDGE_LOWER:
			case TILE_ROAD:
				this.x = nextX;
				this.y = nextY;
				this.speedMult = 1.0;
				break;
			case TILE_GRASS:
				this.x = nextX;
				this.y = nextY;
				this.speedMult = 0.5;
				break;
			case TILE_TREE:
				this.changeDirection();
				break;
			case TILE_FINISH:
				this.changeDirection();
				break;
			case TILE_YELLOW_DOOR:
				this.changeDirection();
				break;
			case TILE_GREEN_DOOR:
				this.changeDirection();
				break;
			case TILE_RED_DOOR:
				this.changeDirection();
				break;
			case TILE_BLUE_DOOR:
				this.changeDirection();
				break;
			case TILE_YELLOW_KEY:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_RED_KEY:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_BLUE_KEY:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GREEN_KEY:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_WATER:
				this.changeDirection();
				break
			case TILE_WALL:
				this.changeDirection();
				break;
			case TILE_SPIKES:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.health = this.health - .5; // Damage to Health
				roomGrid[walkIntoTileIndex] = TILE_SPIKES_BLOODY;
				spikeSound.play();
				break;
			case TILE_SPIKES_BLOODY:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				break;
		}

		this.myBite.move();
        this.myBite.x = this.x;
        this.myBite.y = this.y;
	}

	this.takeDamage = function(howMuch) {
		this.health -= howMuch;
		skeletonHurtSound.play();
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
var zombieMoveSpeed = 0.5;
const ZOMBIE_TIME_BETWEEN_CHANGE_DIR = 700;
const ZOMBIE_COLLISION_RADIUS = 10;

function zombieClass(zombieName) {
	this.x = 0;
	this.y = 0;
	this.speed = 2;
	this.myZombiePic = zombiePic; // which picture to use
	this.myName = zombieName;
	this.health = 30;
	this.maxhealth = 30;
	this.alive = true;
	this.biteReadyTicker = 30;
	this.biteReady = true;
	
	this.cyclesTilDirectionChange = 0;
	this.addedCyclesTilDirectionChange = 0;
	this.cyclesOfZombieActive = 0;
	this.cyclesofZombieResting = Math.random()*400;
	this.zombieResting = false;
	this.zombieRestingTime = Math.random()*400;
	
	this.sx = 50;
	this.sy = 0;
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 25;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.zombieMove = true;
	this.walkNorth = false;
	this.walkEast = true;
	this.walkSouth = false;
	this.walkWest = false;

	this.reset = function(whichImage, zombieName) {
		this.name = zombieName;
		this.myZombiePic;

		this.health = 30;
		
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_ZOMBIE) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Zombie Start if
			} //end of col row for
		} // end of row for
		console.log("No Zombie Start found!");
	} // end of zombieRest func
	
	this.changeDirection = function() {
		if(this.walkNorth == true) {
			this.walkNorth = false;
			this.walkEast = true;
		} else if(this.walkWest == true) {
			this.walkWest = false;
			this.walkNorth = true;
		} else if(this.walkEast == true) {
			this.walkEast = false;
			this.walkSouth = true;
		} else if(this.walkSouth == true) {
			this.walkSouth = false;
			this.walkWest = true;
		}	
	}
	
	this.move = function() {
		var nextX = this.x; 
		var nextY = this.y;
		
		if(this.health > 0){
					
			this.cyclesTilDirectionChange--;
			if(this.cyclesTilDirectionChange <= 0) {
				if(this.addedCyclesTilDirectionChange <= 0) {
					this.cyclesTilDirectionChange = ZOMBIE_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange++; 
				}
				else if(this.addedCyclesTilDirectionChange == 1) {
					this.cyclesTilDirectionChange = ZOMBIE_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange++;
				}
				else if(this.addedCyclesTilDirectionChange == 2) {
					this.cyclesTilDirectionChange = ZOMBIE_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange++;
				}
				else if(this.addedCyclesTilDirectionChange == 3) {
					this.cyclesTilDirectionChange = ZOMBIE_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange = 0;
				}
			}
			
			// which directional image to use

			if(this.walkNorth) {
				nextY -= zombieMoveSpeed;
				this.sx = 0;
				this.sy = 50;
				zombieDirection = "north";
			}
			
			if(this.walkSouth) {
				nextY += zombieMoveSpeed;
				this.sx = 0;
				this.sy = 0;
				zombieDirection = "south";
			}
			if(this.walkWest) {
				nextX -= zombieMoveSpeed;
				this.sx = 0;
				this.sy = 100;
				zombieDirection = "west";
			}
			if(this.walkEast) {
				nextX += zombieMoveSpeed;
				this.sx = 0;
				this.sy = 150;
				zombieDirection = "east";
			}
			
			var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
			var walkIntoTileType = TILE_WALL;
			
			if(zombieDirection == "north") {
				walkIntoTileIndex = getTileTypeAtPixelCoord(nextX,(nextY-25));
			}
			if(zombieDirection == "south") {
				walkIntoTileIndex = getTileTypeAtPixelCoord(nextX,(nextY+25));
			}
			if(zombieDirection == "west") {
				walkIntoTileIndex = getTileTypeAtPixelCoord((nextX-25), nextY);
			}
			if(zombieDirection == "east") {
				walkIntoTileIndex = getTileTypeAtPixelCoord((nextX+25), nextY);
			}

			if(walkIntoTileIndex != undefined) {
				walkIntoTileType = roomGrid[walkIntoTileIndex];
			}
			
		switch(walkIntoTileType) {
				case TILE_ROAD:
					this.x = nextX;
					this.y = nextY;
					goblinMoveSpeed = 0.5;
					break;
				case TILE_GRASS:
					this.x = nextX;
					this.y = nextY;
					goblinMoveSpeed = 0.3;
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
		} else {
			this.x = this.x;
			this.y = this.y;
		}		
	}
	
	this.zombieBite = function() {
		if(this.biteReady == true){
			redWarrior.health = redWarrior.health -1;	
			playerHurtSound.play();
			dialog = "Ouch! I've been bite by a zombie for 1 point of damage.";	
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
			this.biteReadyTicker = 60; //amount of time between bites
			this.biteReady = true;
		}
	}

	this.isOverlappingPoint = function(testX, testY) {  // textX is redWarrior.x and testY is redWarrior.y
		
		//test if redWarrior is inside box of Monster
		
		if(this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY){
			this.zombieBite();
		}
		
		// add result if true
		
	}
		
	this.draw = function() { 

			
		if(this.zombieMove) {
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
			canvasContext.drawImage(this.myZombiePic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);

			if(displayHealth){
				colorRect(this.x,this.y-16, 40,12, "black"); 
				colorRect(this.x+2,this.y-14, 35, 8, "red");
				colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
			}
			if(debugMode){
				colorText(this.myName, this.x, this.y-20, "red");
				colorText("HP: "+this.health, this.x, this.y-10, "red");
				
				colorRect(this.x,this.y, 5,5, "red");
				colorRect(this.x,this.y+this.height, 5,5, "red");
				colorRect(this.x+this.width,this.y, 5,5, "red");
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red");
				}
		} else {
				canvasContext.drawImage(deadZombiePic, this.x,this.y);
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}	
	}
}
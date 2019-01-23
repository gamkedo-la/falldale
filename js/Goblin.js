var goblinMoveSpeed = 0.5;
const GOBLIN_TIME_BETWEEN_CHANGE_DIR = 300;
const GOBLIN_PATROL_RADIUS = 200;

goblinClass.prototype = new enemyClass();
function goblinClass(goblinName) {
	this.speed = 4;
	this.myGoblinPic = goblinPic; // which picture to use
	this.myName = "Untitled goblin";
	this.health = 12;
	this.maxhealth = 12;
	this.alive = true;
	this.biteReadyTicker = 30;
	this.biteReady = true;
	this.myName = goblinName;
		
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 39;
	this.numberOfFrames = 4;
	this.height = 37;
	this.ticksPerFrame = 5;
	this.goblinMove = true;
	
	this.patrolling = true;
	this.chasing = false;
	this.attacking = false;
	
	this.reset = function(whichImage, goblinName) {
		this.name = goblinName;
		this.myGoblinPic;

		this.health = 12;
		
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_GOBLIN) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
		console.log("No Goblin Start found!");
	} // end of goblinRest func
	
this.superClassMove = this.move;	
	this.move = function() {
		var nextX = this.x; 
		var nextY = this.y;
		
		this.changeDirection = function() {
			if(this.walkNorth) {
				this.walkNorth = false;
				this.walkEast = true;	
			} else if(this.walkWest) {
				this.walkWest = false;
				this.walkNorth = true;
			} else if(this.walkEast) {
				this.walkEast = false;
				this.walkSouth = true;
			} else if(this.walkSouth) {
				this.walkSouth = false;
				this.walkWest = true;
			}		
		}
		
		if(this.health > 0){
							
			/*var deltaX = redWarrior.x - this.x;
			var deltaY = redWarrior.y - this.y;
			var dist = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
			var dist = Math.floor(dist);
			
			var moveX = this.speed * deltaX/dist;
			var moveY = this.speed * deltaY/dist;
			
					
			if (dist >= 40 && dist <= GOBLIN_PATROL_RADIUS){
				this.attacking = false;
				this.patrolling = false;
				this.chasing = true;
			} 			
			else if (dist < 40){
				this.attacking = true;
				this.patrolling = false;
				this.chasing = false;
			} 
			else {
				this.attacking = false;
				this.patrolling = true;
				this.chasing = false;
			}	
		
			if(this.patrolling){
				
			this.cyclesTilDirectionChange--;
					
				if(this.cyclesTilDirectionChange <= 0) {
					if(this.addedCyclesTilDirectionChange <= 0) {
						this.cyclesTilDirectionChange = GOBLIN_TIME_BETWEEN_CHANGE_DIR;
						this.changeDirection();
						this.addedCyclesTilDirectionChange++; 
					}
					else if(this.addedCyclesTilDirectionChange == 1) {
						this.cyclesTilDirectionChange = GOBLIN_TIME_BETWEEN_CHANGE_DIR;
						this.changeDirection();
						this.addedCyclesTilDirectionChange++;
					}
					else if(this.addedCyclesTilDirectionChange == 2) {
						this.cyclesTilDirectionChange = GOBLIN_TIME_BETWEEN_CHANGE_DIR;
						this.changeDirection();
						this.addedCyclesTilDirectionChange++;
					}
					else if(this.addedCyclesTilDirectionChange == 3) {
						this.cyclesTilDirectionChange = GOBLIN_TIME_BETWEEN_CHANGE_DIR;
						this.changeDirection();
						this.addedCyclesTilDirectionChange = 0;
					}
				}
			}
			/* else if(this.chasing){
				
				dialog = "I'm being chased!";		
				
				if(dist > 30) {
					nextX += moveX;
					nextY += moveY;
					if(nextY < redWarrior.y){
						this.walkSouth;
					}
					else{
						this.walkNorth;
					}
				} else if ( dist <= 30) {
					this.chasing = false;
					this.attacking = true;
				}
			}
			else if(this.attacking){
				dialog = "start combat!";
					playerHurtSound.play();
					this.chasing = false;
					this.attacking = true;
			}
			
	
			
			// which directional image to use

			if(this.walkNorth) {
				this.sx = 0;
				this.sy = 37;
				goblinDirection = "north";
				if(this.patrolling){
					nextY -= goblinMoveSpeed;
				}
			}
			if(this.walkSouth) {
				this.sx = 0;
				this.sy = 0;
				goblinDirection = "south";
				if(this.patrolling){
					nextY += goblinMoveSpeed;
				}
			}
			if(this.walkWest) {
				this.sx = 0;
				this.sy = 111;
				goblinDirection = "west";
				if(this.patrolling){
					nextX -= goblinMoveSpeed;
				}
			}
			if(this.walkEast) {
				this.sx = 0;
				this.sy = 74;
				goblinDirection = "east";
				if(this.patrolling){
					nextX += goblinMoveSpeed;
				}
			}
			
			var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
			var walkIntoTileType = TILE_WALL;
			
			if(goblinDirection == "north") {
				walkIntoTileIndex = getTileTypeAtPixelCoord(nextX,(nextY-25));
			}
			if(goblinDirection == "south") {
				walkIntoTileIndex = getTileTypeAtPixelCoord(nextX,(nextY+25));
			}
			if(goblinDirection == "west") {
				walkIntoTileIndex = getTileTypeAtPixelCoord((nextX-25), nextY);
			}
			if(goblinDirection == "east") {
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
		} */
	}
	
	this.goblinBite = function() {

		if(this.biteReady == true){
			redWarrior.health = redWarrior.health -1;	
			dialog = "Ouch! I've been bite by a goblin.";	
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
			this.goblinBite();
		}
		// add result if true
	}
		
	this.draw = function() { 
						
		if(this.goblinMove) {
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
			canvasContext.drawImage(this.myGoblinPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
			if(debugMode){
				colorText(this.myName, this.x, this.y-20, "red");
				colorText("HP: "+this.health, this.x, this.y-10, "red");
				
				colorRect(this.x,this.y, 5,5, "red") 
				colorRect(this.x,this.y+this.height, 5,5, "red")
				colorRect(this.x+this.width,this.y, 5,5, "red")
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red")
			}
			
			if(displayHealth){
				colorRect(this.x,this.y-16, 40,12, "black"); 
				colorRect(this.x+2,this.y-14, 35, 8, "red");
				colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
			}
		} else {   
			canvasContext.drawImage(deadGoblinPic, this.x,this.y); 
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}
	}
}
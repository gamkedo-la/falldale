console.log("enemy Class Loaded");

function enemyClass() {
    this.x = 0;
    this.y = 0;
    this.speedMult = 1.0;
    this.cyclesTilDirectionChange = 0;
    this.addedCyclesTilDirectionChange = 0;
    this.cyclesOfActive = 0;
    this.cyclesofResting = Math.random() * 400;
    this.resting = false;
    this.restingTime = Math.random() * 400;
    this.health = 8;
    this.sx = 50;
    this.sy = 0;
    this.direction = "east";
    this.walkNorth = false;
    this.walkEast = true;
    this.walkSouth = false;
    this.walkWest = false;

    this.move = function(timeBetweenDirChange, moveSpeed) {
        if (this.health <= 0) {
            return;
        }
		
        var nextX = this.x;
        var nextY = this.y;
        this.cyclesTilDirectionChange--;
        if (this.cyclesTilDirectionChange <= 0) {
            if (this.addedCyclesTilDirectionChange <= 0) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange++;
            } else if (this.addedCyclesTilDirectionChange == 1) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange++;
            } else if (this.addedCyclesTilDirectionChange == 2) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange++;
            } else if (this.addedCyclesTilDirectionChange == 3) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange = 0;
            }
        }

        // which directional image to use

        if (this.walkNorth) {
            nextY -= moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = 50;
            this.direction = "north";
        }

        if (this.walkSouth) {
            nextY += moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = 0;
            this.direction = "south";
        }
        if (this.walkWest) {
            nextX -= moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = 100;
            this.direction = "west";
        }
        if (this.walkEast) {
            nextX += moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = 150;
            this.direction = "east";
        }

        var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL;

        if (this.direction == "north") {
            walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, (nextY - 25));
        }
        if (this.direction == "south") {
            walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, (nextY + 25));
        }
        if (this.direction == "west") {
            walkIntoTileIndex = getTileTypeAtPixelCoord((nextX - 25), nextY);
        }
        if (this.direction == "east") {
            walkIntoTileIndex = getTileTypeAtPixelCoord((nextX + 25), nextY);
        }

        if (walkIntoTileIndex != undefined) {
            walkIntoTileType = roomGrid[walkIntoTileIndex];
        }

        switch (walkIntoTileType) {
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
    }

    this.changeDirection = function() {
        if (this.walkNorth == true) {
            this.walkNorth = false;
            this.walkEast = true;
        } else if (this.walkWest == true) {
            this.walkWest = false;
            this.walkNorth = true;
        } else if (this.walkEast == true) {
            this.walkEast = false;
            this.walkSouth = true;
        } else if (this.walkSouth == true) {
            this.walkSouth = false;
            this.walkWest = true;
        }
    }
	
	this.reset = function(enemytype){
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);				
				var tileType = enemytype;
				
				if(roomGrid[arrayIndex] == tileType) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
	}
}
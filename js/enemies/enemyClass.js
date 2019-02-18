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
				this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
            } else if (this.addedCyclesTilDirectionChange == 1) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange++;
				this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
            } else if (this.addedCyclesTilDirectionChange == 2) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange++;
				this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
            } else if (this.addedCyclesTilDirectionChange == 3) {
                this.cyclesTilDirectionChange = timeBetweenDirChange;
                this.changeDirection();
                this.addedCyclesTilDirectionChange = 0;
				this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
            }
        }

        // which directional image to use

        if (this.walkNorth) {
            nextY -= moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = (this.height)+1;
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
            this.sy = (this.height*2)+1;
            this.direction = "west";
        }
        if (this.walkEast) {
            nextX += moveSpeed * this.speedMult;
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

    this.isOverlappingPoint = function() { // textX is redWarrior.x and testY is redWarrior.y
        if(this.myBite.isReady()) {
            this.myBite.shootFrom(this);
            if(this.myBite.hitTest(redWarrior)) {
                return true;
            }
        }
    }

    this.takeDamage = function(howMuch) {
        console.log("Did not override enemyClass.takeDamage(howMuch) => INVINCIBLE!");
		return;//failure to override results in invincible enemies
	}
	
	this.reset = function(resetX, resetY){
        this.x = resetX;
        this.y = resetY;
	}
}
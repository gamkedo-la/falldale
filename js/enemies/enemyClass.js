function enemyClass() {
    this.x = 0;
    this.y = 0;
    this.myName = "anEnemy";
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
    this.myBite = null;
    this.myMelee = null;
    this.myRanged = null;
    this.pather = null;
	this.currentPath = [];
	this.currentPathIndex = 0;

    this.move = function(timeBetweenChangeDir, moveSpeed) {
        if (this.health <= 0) {
			return;
		}
        let nextPos = this.pathFindingMove(timeBetweenChangeDir, moveSpeed);
		if(this.currentPath == null) {
            nextPos = this.randomMove(timeBetweenChangeDir, moveSpeed);
		} else {
            if(nextPos == null) {
                nextPos = this.randomMove(timeBetweenChangeDir, moveSpeed);
            } else {
                this.x = nextPos.x;
                this.y = nextPos.y;
            }
        }

        if(this.myBite != null) {
            this.myBite.move();
            this.myBite.x = this.x;
            this.myBite.y = this.y;    
        }

        var hasRanged = this.myRanged != null;
		var canRangeNow = hasRanged && this.myRanged.rangeTest(redWarrior);	
		
		if(canRangeNow) {
            if(this.myRanged.isReady()) {
                this.myRanged.shootFrom(this);
                if(this.myRanged.hitTest(this, redWarrior)) {
                    console.log("Ranged Damage Done");
                }
            }
        }
    }

    this.pathFindingMove = function(timeBetweenDirChange, moveSpeed) {
        if(this.pather == null) {return null;} //this enemy is not fully initialized yet

        var nextX = this.x;
        var nextY = this.y;
        
		this.cyclesTilDirectionChange--;
		if ((this.cyclesTilDirectionChange <= 0) || (this.currentPath == null)) {
			this.cyclesTilDirectionChange = timeBetweenDirChange;
			const thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
			const warriorTileIndex = getTileIndexAtPixelCoord(redWarrior.x, redWarrior.y);

			this.currentPath = this.pather.pathFrom_To_(thisTileIndex, warriorTileIndex);
            this.currentPathIndex = 0;

            if(this.currentPath == null) {return null;}
        }
        
        const currentTile = getTileIndexAtPixelCoord(this.x, this.y);
        const nextTile = this.currentPath[this.currentPathIndex];

        if(currentTile == nextTile) {
            this.currentPathIndex++;
            if(this.currentPathIndex == this.currentPath.length) {
                return null;
            }
        }

        if(nextTile - currentTile > 1) {
            this.changeDirection("south");
        } else if(nextTile - currentTile < -1) {
            this.changeDirection("north");
        } else if(nextTile - currentTile == -1) {
            this.changeDirection("west");
        } else if(nextTile - currentTile == 1) {
            this.changeDirection("east");
        }

        let newPos = this.changePosition(nextX, nextY, moveSpeed);

        return {x:newPos.x, y:newPos.y};
    }

    this.randomMove = function(timeBetweenDirChange, moveSpeed) {
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

        let newPos = this.changePosition(nextX, nextY, moveSpeed);
        this.walkAdjustment(newPos.x, newPos.y);

        return {x:newPos.x, y:newPos.y};
    }

    this.changePosition = function(nextX, nextY, moveSpeed) {
        // which directional image to use
        let newPos = {x:nextX, y:nextY};

        if (this.walkNorth) {
            newPos.y -= moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = (this.height)+1;
            this.direction = "north";
        }

        if (this.walkSouth) {
            newPos.y += moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = 0;
            this.direction = "south";
        }
        if (this.walkWest) {
            newPos.x -= moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = (this.height*2)+1;
            this.direction = "west";
        }
        if (this.walkEast) {
            newPos.x += moveSpeed * this.speedMult;
            this.sx = 0;
            this.sy = (this.height*3)+1;
            this.direction = "east";
        }

        return newPos;
    }

    this.walkAdjustment = function(nextX, nextY) {
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
    }

    this.changeDirection = function(newDirection) {
        if(newDirection == undefined) {
            const newDir = Math.floor(3 * Math.random());
            if (this.walkNorth == true) {
                this.walkNorth = false;
                switch(newDir) {
                    case 0:
                        this.walkSouth = true;
                        this.walkEast = false;
                        this.walkWest = false;
                    break;
                    case 1:
                        this.walkSouth = false;
                        this.walkEast = true;
                        this.walkWest = false;
                    break;
                    case 2:
                        this.walkSouth = false;
                        this.walkEast = false;
                        this.walkWest = true;
                    break;
                }
            } else if (this.walkWest == true) {
                this.walkWest = false;
                switch(newDir) {
                    case 0:
                        this.walkSouth = true;
                        this.walkEast = false;
                        this.walkNorth = false;
                    break;
                    case 1:
                        this.walkSouth = false;
                        this.walkEast = true;
                        this.walkNorth = false;
                    break;
                    case 2:
                        this.walkSouth = false;
                        this.walkEast = false;
                        this.walkNorth = true;
                    break;
                }
            } else if (this.walkEast == true) {
                this.walkEast = false;
                switch(newDir) {
                    case 0:
                        this.walkSouth = true;
                        this.walkNorth = false;
                        this.walkWest = false;
                    break;
                    case 1:
                        this.walkSouth = false;
                        this.walkNorth = true;
                        this.walkWest = false;
                    break;
                    case 2:
                        this.walkSouth = false;
                        this.walkNorth = false;
                        this.walkWest = true;
                    break;
                }
            } else if (this.walkSouth == true) {
                this.walkSouth = false;
                switch(newDir) {
                    case 0:
                        this.walkNorth = true;
                        this.walkEast = false;
                        this.walkWest = false;
                    break;
                    case 1:
                        this.walkNorth = false;
                        this.walkEast = true;
                        this.walkWest = false;
                    break;
                    case 2:
                        this.walkNorth = false;
                        this.walkEast = false;
                        this.walkWest = true;
                    break;
                }
            }
        } else {
            if(newDirection == "east") {
                this.walkNorth = false;
                this.walkEast = true;
                this.walkWest = false;
                this.walkSouth = false;
            } else if(newDirection == "west") {
                this.walkNorth = false;
                this.walkEast = false;
                this.walkWest = true;
                this.walkSouth = false;
            } else if(newDirection == "south") {
                this.walkNorth = false;
                this.walkEast = false;
                this.walkWest = false;
                this.walkSouth = true;
            } else if(newDirection == "north") {
                this.walkNorth = true;
                this.walkEast = false;
                this.walkWest = false;
                this.walkSouth = false;
            }
        }
    }

    this.isOverlappingPoint = function() { 
		var hasMelee = this.myMelee != null;
        var canMeleeNow = hasMelee && this.myMelee.rangeTest(this, redWarrior);
		
		
		if(this.myBite.rangeTest(redWarrior)) {
            if(this.myBite.isReady()) {
                this.myBite.shootFrom(this);
                if(this.myBite.hitTest(this, redWarrior)) {
                    return true;
                }
            }
        } else if(canMeleeNow) {
            if(this.myMelee.isReady()) {
                this.myMelee.shootFrom(this);
                if(this.myMelee.hitTest(this, redWarrior)) {
                    return true;
                }
            }
        } 
		return false;
    }

    this.takeDamage = function(howMuch) {
        console.log("Did not override enemyClass.takeDamage(howMuch) => INVINCIBLE!");
		return;//failure to override results in invincible enemies
	}
	
	this.reset = function(resetX, resetY) {
        this.pather = new Pathfinder3();
        this.changeDirection();
        this.x = resetX;
        this.y = resetY;
	}
}
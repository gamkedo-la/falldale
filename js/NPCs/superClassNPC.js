function npcSuperClass() {
  this.x = 0;
  this.y = 0;
  this.speed = 0.5;
  this.myName = "anNPC";
  this.speedMult = 1.0;
  this.cyclesTilDirectionChange = 0;
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
  this.pather = null;
  this.currentPath = null;
  this.currentPathIndex = 0;
  this.patrolPoints = null;
  this.currentPatrolIndex = 0;
  this.readyToRemove = false;

  this.move = function (timeBetweenChangeDir) {
    if (this.health <= 0) {
      return;
    }
    console.log("Calling Superclass Pathfinding");
    let nextPos = this.pathFindingMove(timeBetweenChangeDir, this.speed);
    if (this.currentPath == null) {
      nextPos = this.randomMove(timeBetweenChangeDir, this.speed);
    } else {
      if (nextPos == null) {
        nextPos = this.randomMove(timeBetweenChangeDir, this.speed);
      }
    }

    this.x = nextPos.x;
    this.y = nextPos.y;
  };

  this.pathFindingMove = function (timeBetweenDirChange) {
    console.log("calling this path finding move from Superclass NPC");
    if (this.pather == null) {
      return null;
    } //this enemy is not fully initialized yet
    if (this.patrolPoints == null) {
      console.log("No Patrol points, bailing on path finding move");
      return null;
    }

    const currentTile = getTileIndexAtPixelCoord(this.x, this.y);
    if (this.currentPath == null) {
      console.log("Attempting to use patrol path");
      this.currentPath = this.pather.pathFrom_To_(currentTile, this.patrolPoints[ 0 ], this.isPassableTile);
      this.currentPathIndex = 0;
    }

    if (this.currentPath == null) {
      if (this.myName == "Gabriel") {
        console.log("Path was null despite my best efforts");
      }

      return null;
    }

    let nextTile = this.currentPath[ this.currentPathIndex ];
    if (this.myName == "Gabriel") {
      newPos = this.getNewPosition();
//            console.log(`Path finding for Gabriel: (${newPos.x}, ${newPos.y})`);
      console.log(`CurrentTile: ${ currentTile }, NextTile: ${ nextTile }`);
//            console.log(`CurrentPath: ${this.currentPath}, CurrentPathIndex: ${this.currentPathIndex}`);
//            console.log(`PatrolPoints: ${this.patrolPoints}`);
    }

//        if(currentTile == nextTile) {
    const tileCenter = getCenterPixelCoordForArrayIndex(currentTile);
    if ((Math.abs(tileCenter.x - this.x) < TILE_W / 3) && (Math.abs(tileCenter.y - this.y < TILE_H))) {
      this.currentPathIndex++;
      if (this.currentPathIndex == this.currentPath.length) {//need new path
        this.currentPatrolIndex++;
        if (this.currentPatrolIndex == this.patrolPoints.length) {//need to start over
          this.currentPatrolIndex = 0;
        }

        this.currentPath = this.pather.pathFrom_To_(currentTile, this.patrolPoints[ this.currentPatrolIndex ], this.isPassableTile);
        this.currentPathIndex = 0;

        if (this.currentPath == null) {
          if (this.myName == "Gabriel") {
            console.log(`Path was null despite my best efforts: ${ roomGrid[ 138 ] }`);
            console.log(`CurrentTile: ${ currentTile }, NextTile: ${ this.patrolPoints[ this.currentPatrolIndex ] }`);
          }

          return null;
        }
      }

      nextTile = this.currentPath[ this.currentPathIndex ];
    }

    if (nextTile - currentTile > 1) {
      this.changeDirection("south");
    } else if (nextTile - currentTile < -1) {
      this.changeDirection("north");
    } else if (nextTile - currentTile == -1) {
      this.changeDirection("west");
    } else if (nextTile - currentTile == 1) {
      this.changeDirection("east");
    }

    return this.getNewPosition();
  };

  this.randomMove = function (timeBetweenDirChange) {
    this.cyclesTilDirectionChange--;
    if (this.cyclesTilDirectionChange <= 0) {
      this.cyclesTilDirectionChange = timeBetweenDirChange;
      this.changeDirection();
      this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    }

    return this.getNewPosition();
  };

  this.getNewPosition = function () {
    // which directional image to use
    let newX = this.x;
    let newY = this.y;

    this.updateSpeedMult();

    if (this.walkNorth) {
      newY -= this.speed * this.speedMult;
      this.sx = 0;
      this.sy = (this.height) + 1;
      this.direction = "north";
    }

    if (this.walkSouth) {
      newY += this.speed * this.speedMult;
      this.sx = 0;
      this.sy = 0;
      this.direction = "south";
    }
    if (this.walkWest) {
      newX -= this.speed * this.speedMult;
      this.sx = 0;
      this.sy = (this.height * 2) + 1;
      this.direction = "west";
    }
    if (this.walkEast) {
      newX += this.speed * this.speedMult;
      this.sx = 0;
      this.sy = (this.height * 3) + 1;
      this.direction = "east";
    }

    return { x: newX, y: newY };
  };

  this.tileTypeAtPosition = function (nextX, nextY) {
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    var walkIntoTileType = TILE_WALL;

    if (direction == "north") {
      walkIntoTileIndex = getTileIndexAtPixelCoord(nextX + (this.width / 2), nextY);
    }
    if (direction == "south") {
      walkIntoTileIndex = getTileIndexAtPixelCoord(nextX + (this.width / 2), nextY + this.height);
    }
    if (direction == "west") {
      walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY + (this.height / 2));
    }
    if (direction == "east") {
      walkIntoTileIndex = getTileIndexAtPixelCoord(nextX + this.width, nextY + (this.height / 2));
    }

    if (walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[ walkIntoTileIndex ];
    }

    return walkIntoTileType;
  };

  this.updateSpeedMult = function () {
    const walkIntoTileType = this.tileTypeAtPosition(this.x, this.y);

    switch (walkIntoTileType) {
        //TODO: Do we want NPCs to trigger the transition to bloody spikes?
      case TILE_SPIKES:
        this.health = this.health - 0.5; // Damage to Health
        roomGrid[ walkIntoTileIndex ] = TILE_SPIKES_BLOODY;
        spikeSound.play();
        break;
    }

    this.speedMult = this.speedMultForTileType(walkIntoTileType);
    if (!this.isPassableTile(walkIntoTileType)) {
      this.speedMult = 0;
    }

    if (this.speedMult == 0) {
      if (this.walkNorth) {
        this.changeDirection("south");
      } else if (this.walkEast) {
        this.changeDirection("west");
      } else if (this.walkWest) {
        this.changeDirection("east");
      } else if (this.walkSouth) {
        this.changeDirection("north");
      }
    }
  };

  this.changeDirection = function (newDirection) {
    if (newDirection == undefined) {
      const newDir = Math.floor(4 * Math.random());
      if (this.walkNorth == true) {
        this.walkNorth = false;
        switch (newDir) {
          case 0:
            this.walkSouth = true;
            this.walkEast = false;
            this.walkWest = false;
            this.npcMove = true;
            break;
          case 1:
            this.walkSouth = false;
            this.walkEast = true;
            this.walkWest = false;
            this.npcMove = true;
            break;
          case 2:
            this.walkSouth = false;
            this.walkEast = false;
            this.walkWest = true;
            this.npcMove = true;
            break;
          case 3:
            this.walkSouth = false;
            this.walkEast = false;
            this.walkWest = false;
            this.npcMove = false;
            break;
        }
      } else if (this.walkWest == true) {
        this.walkWest = false;
        switch (newDir) {
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
          case 3:
            this.walkSouth = false;
            this.walkEast = false;
            this.walkWest = false;
            this.npcMove = false;
            break;
        }
      } else if (this.walkEast == true) {
        this.walkEast = false;
        switch (newDir) {
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
          case 3:
            this.walkSouth = false;
            this.walkEast = false;
            this.walkWest = false;
            this.npcMove = false;
            break;
        }
      } else if (this.walkSouth == true) {
        this.walkSouth = false;
        switch (newDir) {
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
          case 3:
            this.walkSouth = false;
            this.walkEast = false;
            this.walkWest = false;
            this.npcMove = false;
            break;
        }
      }
    } else {
      if (newDirection == "east") {
        this.walkNorth = false;
        this.walkEast = true;
        this.walkWest = false;
        this.walkSouth = false;
        this.npcMove = true;
      } else if (newDirection == "west") {
        this.walkNorth = false;
        this.walkEast = false;
        this.walkWest = true;
        this.walkSouth = false;
        this.npcMove = true;
      } else if (newDirection == "south") {
        this.walkNorth = false;
        this.walkEast = false;
        this.walkWest = false;
        this.walkSouth = true;
        this.npcMove = true;
      } else if (newDirection == "north") {
        this.walkNorth = true;
        this.walkEast = false;
        this.walkWest = false;
        this.walkSouth = false;
        this.npcMove = true;
      }
    }
  };

  this.isOverlappingPoint = function () {
    var hasMelee = this.myMelee != null;
    var canMeleeNow = hasMelee && this.myMelee.rangeTest(this, redWarrior);


    if (this.myBite.rangeTest(redWarrior)) {
      if (this.myBite.isReady()) {
        this.myBite.shootFrom(this);
        if (this.myBite.hitTest(this, redWarrior)) {
          return true;
        }
      }
    } else if (canMeleeNow) {
      if (this.myMelee.isReady()) {
        this.myMelee.shootFrom(this);
        if (this.myMelee.hitTest(this, redWarrior)) {
          return true;
        }
      }
    }
    return false;
  };

  this.takeDamage = function (howMuch) {
    console.log("Did not override enemyClass.takeDamage(howMuch) => INVINCIBLE!");
    //failure to override results in invincible enemies
  };

  this.reset = function (resetX, resetY, direction) {
    this.pather = new Pathfinder3();
    this.changeDirection(direction);
    this.x = resetX;
    this.y = resetY;
  };

  this.speedMultForTileType = function (tileType) {
    switch (tileType) {
      case TILE_YELLOW_DOOR:
      case TILE_GREEN_DOOR:
      case TILE_RED_DOOR:
      case TILE_BLUE_DOOR:
      case TILE_WALL:
      case TILE_TREE:
      case TILE_TREE2TOPHALF:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
      case TILE_WATER:
      case TILE_FOUNTAIN:
        return 0;
      case TILE_GRASS:
        return 0.5;
      case TILE_BRIDGE_UPPER:
      case TILE_BRIDGE_LOWER:
      case TILE_ROAD:
        return 1;
      default:
        return this.speedMult;
    }
  };

  this.isPassableTile = function (aTile) {
    switch (aTile) {
      case TILE_WALL:
      case TILE_DOOR:
      case TILE_YELLOW_DOOR:
      case TILE_GREEN_DOOR:
      case TILE_BLUE_DOOR:
      case TILE_RED_DOOR:
      case TILE_ROOF_FRONTRIGHT:
      case TILE_ROOF_SIDERIGHT:
      case TILE_ROOF_BACKRIGHT:
      case TILE_FRONTWALL_WINDOW:
      case TILE_FRONTWALL_SOLID:
      case TILE_FRONTDOOR_YELLOW:
      case TILE_ROOF_BACKSIDE:
      case TILE_ROOF_BACKLEFT:
      case TILE_ROOF_LEFTSIDE:
      case TILE_ROOF_FRONTLEFT:
      case TILE_ROOF_FRONT:
      case TILE_ROOF_CENTER:
      case TILE_HEALER_BW:
      case TILE_HEALER_BW_CABINET_POTIONS:
      case TILE_HEALER_BW_CABINET_LH:
      case TILE_HEALER_BW_CABINET_EMPTY:
      case TILE_HEALER_BW_LS:
      case TILE_HEALER_BW_RS:
      case TILE_HEALER_DESK:
      case TILE_HEALER_FRONTDOOR:
      case TILE_HEALER_FW_LS:
      case TILE_HEALER_FW_WINDOW:
      case TILE_HEALER_LW:
      case TILE_HEALER_RW:
      case TILE_HEALER_FW_RS:
      case TILE_BS_BW:
      case TILE_BS_BW_CABINET_POTIONS:
      case TILE_BS_BW_CABINET_EMPTY:
      case TILE_BS_BW_LS:
      case TILE_BS_BW_RS:
      case TILE_BS_DESK:
      case TILE_BS_BW_WEAPONSRACK:
      case TILE_BS_BW_WEAPONSRACKBOTTOM:
      case TILE_BS_FW_LS:
      case TILE_BS_LW:
      case TILE_BS_FW_RS:
//            case TILE_HOUSE_FRONT_WALL:
//            case TILE_HOUSE_FRONT_WALL_DAMAGED:
//            case TILE_HOUSE_FRONT_WALL_BROKEN:
//            case TILE_HOUSE_FRONT_WINDOW:
//            case TILE_HOUSE_FRONT_WINDOW_BROKEN:
//            case TILE_HOUSE_FW_RS:
//            case TILE_HOUSE_FW_LS:
//            case TILE_HOUSE_BW:
//            case TILE_HOUSE_BW_LS:
//            case TILE_HOUSE_BW_RS:
//            case TILE_HOUSE_BW_WINDOW:
//            case TILE_HOUSE_LS_BED_TOP:
//            case TILE_HOUSE_LS_BED_BOTTOM:
//            case TILE_HOUSE_DRESSER_TOP:
//            case TILE_HOUSE_DRESSER_BOTTOM:
      case TILE_BAR_CABINET:
      case TILE_BAR:
      case TILE_BAR_TOP:
      case TILE_CHAIR:
      case TILE_MAUSOLEUM_TL:
      case TILE_MAUSOLEUM_TM:
      case TILE_MAUSOLEUM_TR:
      case TILE_MAUSOLEUM_ML:
      case TILE_MAUSOLEUM_MM:
      case TILE_MAUSOLEUM_MR:
      case TILE_MAUSOLEUM_BL:
      case TILE_MAUSOLEUM_BM:
      case TILE_MAUSOLEUM_BR:
      case TILE_ZOMBIE:
      case TILE_ZOMBIE2:
      case TILE_ZOMBIE3:
      case TILE_GREEN_ORC_SWORD:
      case TILE_GREEN_ORC_CLUB:
      case TILE_GREEN_ORC_AX:
      case TILE_ARCHER:
      case TILE_SHOPKEEPER:
      case TILE_HEALER:
      case TILE_PRINCESS:
      case TILE_DODD:
      case TILE_TARAN:
      case TILE_DELKON:
      case TILE_ADDY:
        // case TILE_GABRIEL:
      case TILE_FENTON:
      case TILE_TREE:
      case TILE_TREE2TOPHALF:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
      case TILE_GRAVEYARD_FENCE_LEFT:
      case TILE_GRAVEYARD_FENCE_RIGHT:
      case TILE_GRAVEYARD_FENCE:
      case TILE_GRAVE_1:
      case TILE_GRAVE_2:
      case TILE_GRAVE_3:
      case TILE_GRAVE_4:
      case TILE_SKELETON:
      case TILE_GOBLIN:
      case TILE_SPIKES:
      case TILE_SPIKES_BLOODY:
      case TILE_WATER:
      case TILE_FOUNTAIN:
        return false;
        /*
         case TILE_HOUSE_FRONT_WALL:
         case TILE_HOUSE_FRONT_WALL_DAMAGED:
         case TILE_HOUSE_FRONT_WALL_BROKEN:
         case TILE_HOUSE_FRONT_WINDOW:
         case TILE_HOUSE_FRONT_WINDOW_BROKEN:
         case TILE_HOUSE_FW_RS:
         case TILE_HOUSE_FW_LS:
         case TILE_HOUSE_BW:
         case TILE_HOUSE_BW_LS:
         case TILE_HOUSE_BW_RS:
         case TILE_HOUSE_BW_WINDOW:
         case TILE_HOUSE_LS_BED_TOP:
         case TILE_HOUSE_LS_BED_BOTTOM:
         case TILE_HOUSE_DRESSER_TOP:
         case TILE_HOUSE_DRESSER_BOTTOM:

         case TILE_PLAYERSTART:
         case TILE_ROAD:
         case TILE_BRIDGE_UPPER:
         case TILE_BRIDGE_LOWER:
         case TILE_FOREST_PORTAL:
         case TILE_GRASS:
         case TILE_GRAVE_YARD_PORTAL:
         case TILE_HOME_VILLAGE_PORTAL:
         case TILE_ARROWS:
         case TILE_THROWINGROCKS:
         case TILE_KEY:
         case TILE_YELLOW_KEY:
         case TILE_GREEN_KEY:
         case TILE_BLUE_KEY:
         case TILE_RED_KEY:
         case TILE_TREASURE:
         case TILE_MAP:
         case TILE_BAT:
         return true;*/
      default:
        return true;
    }
  }
}
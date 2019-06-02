const AI_VISION_RANGE = 350;//will use pathfinding if within this number

function enemyReadyToRemove() {
  for (var i = 0; i < enemyList.length; i++) {
    if (enemyList[ i ].health <= 0) {
      enemyList[ i ].readyToRemove = true;
    }
  }
}

function removeEnemy() {
  for (var i = enemyList.length - 1; i >= 0; i--) {
    if (enemyList[ i ].readyToRemove) {
      enemyList.splice(i, 1);
    }
  }
}

function enemyClass() {
  this.type = "enemy";
  this.x = 0;
  this.y = 0;
  this.bounceX = 0;
  this.bounceY = 0;
  this.bounceTargetX = 0;
  this.bounceTargetY = 0;
  this.isBouncedBack = false;
  this.bounceSpeedFactor = 0.2;
  this.speed = 0.5;
  this.myName = "anEnemy";
  this.enemyMove = true;
  this.speedMult = 1.0;
  this.cyclesTilDirectionChange = 0;
  this.cyclesOfActive = 0;
  this.cyclesofResting = Math.random() * 400;
  this.resting = false;
  this.restingTime = Math.random() * 400;
  this.maxhealth = 8;
  this.armorRating = 10;
  this.sx = 50;
  this.sy = 0;
  this.direction = "east";
  this.walkNorth = false;
  this.walkEast = true;
  this.walkSouth = false;
  this.walkWest = false;
  this.faceNorthMul = 1;
  this.faceSouthMul = 0;
  this.faceWestMul = 2;
  this.faceEastMul = 3;
  this.myBite = null;
  this.myMelee = null;
  this.myRanged = null;
  this.pather = null;
  this.currentPath = [];
  this.currentPathIndex = 0;
  this.readyToRemove = false;
  this.isFlying = false;
  this.displayHealth = false;
  this.healthCountdownSeconds = 5;
  this.chanceToProvideTreasure = 7;
  this.treasure = [ "heart", "gold", "healing potion" ];
  this.hurtSound = null;
  this.timeBetweenChangeDir = 50;
  this.animateOnGamePause = false;
  this.shadowXOffset = 5;
  this.shadorYOffset = 50;
  this.deadPic = null;
  this.picVariants = [];
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = 5;

  this.initialize = function (enemyName, enemyPicture, numberOfFrames = 6) {
    this.health = this.maxhealth;
    this.alive = this.health > 0;
    this.myName = enemyName;
    this.myPic = enemyPicture;
    this.myBite = new biteClass();
    this.displayHealthCountdown = this.healthCountdownSeconds * FRAMES_PER_SECOND;
    this.numberOfFrames = numberOfFrames;
  };

  this.draw = function () {
    if (this.enemyMove) {
      this.tickCount++;
    }
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
    if (this.alive) {
      if (this.displayHealth) {
        this.drawHealth();
      }
      if (!gamePaused || this.animateOnGamePause) {
        this.sx = this.frameIndex * this.width;
      }

      var hasMelee = this.myMelee != null;
      if (hasMelee && (this.direction == "north" || this.direction == "west")) {
        this.myMelee.draw(this);
      }

      canvasContext.drawImage(shadowPic, this.x - this.shadowXOffset, this.y + this.shadowYOffset);
      canvasContext.drawImage(this.myPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);

      if (hasMelee && (this.direction == "south" || this.direction == "east")) {
        this.myMelee.draw(this);
      }

      if (debugMode) {
        colorText(this.myName, this.x, this.y - 20, "red");
        colorText("HP: " + this.health, this.x, this.y - 10, "red");
        colorRect(this.x, this.y, 5, 5, "red");
        colorRect(this.x, this.y + this.height, 5, 5, "red");
        colorRect(this.x + this.width, this.y, 5, 5, "red");
        colorRect(this.x + this.width, this.y + this.height, 5, 5, "red");

        if (typeof this.currentPath !== "undefined" && this.currentPath != null) {
          canvasContext.globalAlpha = 0.2;
          for (var i = 0; i < this.currentPath.length; i++) {
            var locHere = getPixelCoordForArrayIndex(this.currentPath[ i ]);
            if (i == this.currentPathIndex) {
              colorRect(locHere.x, locHere.y, TILE_W, TILE_H, "yellow");
            } else {
              colorRect(locHere.x, locHere.y, TILE_W, TILE_H, "white");
            }
          }
          canvasContext.globalAlpha = 1.0;
        }

      }
    } else if (this.deadPic != null) {
      canvasContext.drawImage(this.deadPic, Math.round(this.x), Math.round(this.y));
    }
  };

  this.drawHealth = function () {
    if (this.displayHealthCountdown >= 0) {
      colorRect(this.x, this.y - 16, 40, 12, "black");
      colorRect(this.x + 2, this.y - 14, 35, 8, "red");
      colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
      this.displayHealthCountdown--;
    } else {
      this.displayHealthCountdown = this.healthCountdownSeconds * FRAMES_PER_SECOND;
      this.displayHealth = false;
    }
  };

  this.setFacing = function () {
    if (this.walkNorth) {
      this.sy = this.height * this.faceNorthMul;
    }

    if (this.walkSouth) {
      this.sy = this.height * this.faceSouthMul;
    }
    if (this.walkWest) {
      this.sy = this.height * this.faceWestMul;
    }
    if (this.walkEast) {
      this.sy = this.height * this.faceEastMul;
    }
  };

  this.move = function (timeBetweenChangeDir) {
    if ((this.health <= 0 || !this.enemyMove) && !this.isBouncedBack) {
      return;
    }

    this.storePos();

    OverlayFX.maybeLeaveFootprint(this);
    
    if (this.isBouncedBack) {            
      let nextBounceX = this.x + this.bounceX * this.bounceSpeedFactor;
      let nextBounceY = this.y + this.bounceY * this.bounceSpeedFactor;
      if (this.isPassableTile(this.tileTypeAtPosition(nextBounceX, nextBounceY))) {
        this.x = nextBounceX;
        this.y = nextBounceY;
      }
      if (Math.abs(this.x - this.bounceTargetX) < 0.1 || 
          Math.abs(this.y - this.bounceTargetY) < 0.1) {
        this.isBouncedBack = false;
      }
    }
    else {
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
    }

    this.setFacing();
    if (this.myBite != null) {
      this.myBite.move();
      this.myBite.x = this.x;
      this.myBite.y = this.y;
    }

    var hasRanged = this.myRanged != null;
    var canRangeNow = hasRanged && this.myRanged.rangeTest(redWarrior);

    if (canRangeNow) {
      if (this.myRanged.isReady()) {
        this.myRanged.shootFrom(this);
        if (this.myRanged.hitTest(this, redWarrior)) {
          console.log("Ranged Damage Done");
        }
      }
    }
  };

  this.nonPathDistance = function (x1, y1, x2, y2) {
    var XD = x2 - x1;
    var YD = y2 - y1;
    return Math.sqrt(XD * XD + YD * YD);
  };

  this.pathFindingMove = function (timeBetweenDirChange) {
    if (this.pather == null) {
      return null;
    } //this enemy is not fully initialized yet

    this.cyclesTilDirectionChange--;
    if ((this.cyclesTilDirectionChange <= 0) || (this.currentPath == null)) {
      this.cyclesTilDirectionChange = timeBetweenDirChange;
      const thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
      const warriorTileIndex = getTileIndexAtPixelCoord(redWarrior.x, redWarrior.y);

      var dist = this.nonPathDistance(this.x, this.y, redWarrior.x, redWarrior.y);
      //console.log("distance to player is " + dist);

      if (dist > AI_VISION_RANGE || redWarrior.isInsideAnyBuilding) {
        this.currentPath = null;
        return null;
      }

      this.currentPath = this.pather.pathFrom_To_(thisTileIndex, warriorTileIndex, this.isPassableTile);
      this.currentPathIndex = 0;

      if (this.myName == "Bat") {
//                console.log("Path: " + this.currentPath + ", Warrior Tile: " + warriorTileIndex);
      }

      if (this.currentPath == null) {
        return null;
      }
    }

    const currentTile = getTileIndexAtPixelCoord(this.x, this.y);
    const nextTile = this.currentPath[ this.currentPathIndex ];

    if (currentTile == nextTile) {
      this.currentPathIndex++;
      if (this.currentPathIndex == this.currentPath.length) {
        return null;
      }
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

    let newPos = this.getNewPosition();

    return { x: newPos.x, y: newPos.y };
  };

  this.randomMove = function (timeBetweenDirChange) {
    this.cyclesTilDirectionChange--;
    if (this.cyclesTilDirectionChange <= 0) {
      this.cyclesTilDirectionChange = timeBetweenDirChange;
      this.changeDirection();
      this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    }

    let newPos = this.getNewPosition();

    if (this.myName == "Bat") {
//            console.log("NextPos: (" + this.x + ", " + this.y + ")");
    }

    return { x: newPos.x, y: newPos.y };
  };

  this.getNewPosition = function () {
    // which directional image to use
    let newX = this.x;
    let newY = this.y;

    this.updateSpeedMult();

    if (this.walkNorth) {
      newY -= this.speed * this.speedMult;
      this.sx = 0;
      this.sy = 0;
      this.direction = "north";
    }

    if (this.walkSouth) {
      newY += this.speed * this.speedMult;
      this.sx = 0;
      this.sy = (this.height) + 1;
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

    if (this.direction == "north") {
      walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, (nextY - 25));
    } else if (this.direction == "south") {
      walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, (nextY + 25));
    } else if (this.direction == "west") {
      walkIntoTileIndex = getTileIndexAtPixelCoord((nextX - 25), nextY);
    } else if (this.direction == "east") {
      walkIntoTileIndex = getTileIndexAtPixelCoord((nextX + 25), nextY);
    }

    if (walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[ walkIntoTileIndex ];
    }

    return walkIntoTileType;
  };

  this.updateSpeedMult = function () {
    const walkIntoTileType = this.tileTypeAtPosition(this.x, this.y);


    switch (walkIntoTileType) {
      case TILE_SPIKES:
        const aTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
        this.health = this.health - 0.5; // Damage to Health

        setNewTypeForTileObjectAtIndex(TILE_SPIKES_BLOODY, aTileIndex);
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
      const newDir = Math.floor(3 * Math.random());
      if (this.walkNorth) {
        switch (newDir) {
          case 0:
            this.changeDirection("south");
            break;
          case 1:
            this.changeDirection("east");
            break;
          case 2:
            this.changeDirection("west");
            break;
        }
      } else if (this.walkWest) {
        switch (newDir) {
          case 0:
            this.changeDirection("south");
            break;
          case 1:
            this.changeDirection("east");
            break;
          case 2:
            this.changeDirection("north");
            break;
        }
      } else if (this.walkEast) {
        switch (newDir) {
          case 0:
            this.changeDirection("south");
            break;
          case 1:
            this.changeDirection("north");
            break;
          case 2:
            this.changeDirection("west");
            break;
        }
      } else if (this.walkSouth) {
        switch (newDir) {
          case 0:
            this.changeDirection("north");
            break;
          case 1:
            this.changeDirection("east");
            break;
          case 2:
            this.changeDirection("west");
            break;
        }
      }
    } else {
      this.walkNorth = false;
      this.walkEast = false;
      this.walkWest = false;
      this.walkSouth = false;

      if (newDirection == "east") {
        this.walkEast = true;
      } else if (newDirection == "west") {
        this.walkWest = true;
      } else if (newDirection == "south") {
        this.walkSouth = true;
      } else if (newDirection == "north") {
        this.walkNorth = true;
      }
    }
  };

  this.storePos = function () {
    this.prevX = this.x;
    this.prevY = this.y;
  };

  this.restorePos = function () {
    this.x = this.prevX;
    this.y = this.prevY;
  };

  this.isOverlappingPoint = function () {
    if (this.alive) {
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
    }
    return false;
  };

  this.distributeTreasure = function () {
    var chanceOnTreasure = Math.round(Math.random() * 10);
    if (chanceOnTreasure >= this.chanceToProvideTreasure) {
      var randomTreasureIndex = Math.round(Math.random() * this.treasure.length);
      this.console.log(this.treasure[ randomTreasureIndex ]);
    }
  };

  this.takeDamage = function (howMuch, fromX, fromY, bounceDistance = 100) {
    this.health -= howMuch;
    if (this.health < 0) {
      this.health = 0;
    }
    if (this.hurtSound != null) {
      this.hurtSound.play();
    }
    this.alive = this.health > 0;
    this.displayHealth = true;
    this.isBouncedBack = true;
    
    if (fromX != null && fromY != null) {
      let dirX = this.x - fromX;
      let dirY = this.y - fromY;
      let length = Math.sqrt(dirX * dirX + dirY * dirY);
      dirX /= length;
      dirY /= length;

      this.bounceX = dirX * bounceDistance;
      this.bounceY = dirY * bounceDistance;      
      this.bounceTargetX = this.x + this.bounceX;
      this.bounceTargetY = this.y + this.bounceY;
    }
  };

  this.reset = function (resetX, resetY) {
    this.pather = new Pathfinder3();
    this.changeDirection();
    this.x = resetX;
    this.y = resetY;
    this.health = this.maxhealth;
    if (this.hasOwnProperty("myBite")) {
      this.myBite.reset();
    }
    if (this.picVariants.length) {
      this.newRandomPic();
    }
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
      case TILE_OPEN_DOORWAY:
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
      case TILE_GABRIEL:
      case TILE_FENTON:
      case TILE_TREE:
      case TILE_TREE2TOPHALF:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
	  case TILE_MAUSOLEUM_TL:
	  case TILE_MAUSOLEUM_TM:
	  case TILE_MAUSOLEUM_TR:
	  case TILE_MAUSOLEUM_ML:
	  case TILE_MAUSOLEUM_MM:
	  case TILE_MAUSOLEUM_MR:
	  case TILE_MAUSOLEUM_BL:
	  case TILE_MAUSOLEUM_BM:
	  case TILE_MAUSOLEUM_BR:
	  case TILE_GRAVEYARD_FENCE_LEFT:
	  case TILE_GRAVEYARD_FENCE_RIGHT:
	  case TILE_GRAVEYARD_FENCE:
	  case TILE_GRAVEYARD_FENCE_SIDE:
	  case TILE_GRAVEYARD_FENCE_BR:
	  case TILE_GRAVEYARD_FENCE_TR:
	  case TILE_GRAVEYARD_FENCE_LEFTSIDE:
	  case TILE_GRAVEYARD_FENCE_BL:
	  case TILE_GRAVEYARD_FENCE_TL:
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
      case TILE_BRIDGE_UPPER:
      case TILE_OPEN_DOORWAY:
	  case TILE_ORC_HOUSE_FL:
	  case TILE_ORC_HOUSE_FR:
	  case TILE_ORC_HOUSE_BL:
	  case TILE_ORC_HOUSE_BR:
	  case TILE_ORC_HOUSE_WALL:
	  case TILE_ORC_HOUSE_LS:
	  case TILE_ORC_HOUSE_RS:
	  case TILE_ORC_HOUSE_WINDOW:
	  case TILE_WIZARD_BW_TS:
	  case TILE_WIZARD_BW_BS:
	  case TILE_WIZARD_BW_LC_TS:
	  case TILE_WIZARD_BW_RC_TS:
	  case TILE_WIZARD_LW:
	  case TILE_WIZARD_RW:
	  case TILE_WIZARD_BOTTOM_W:
	  case TILE_WIZARD_BOTTOM_L:
	  case TILE_WIZARD_BOTTOM_R:
	  case TILE_WIZARD_FIREPLACE_TS:
	  case TILE_WIZARD_FIREPLACE_BS:
        return false;
      case TILE_PLAYERSTART:
      case TILE_ROAD:
      case TILE_BRIDGE_LOWER:
      case TILE_ROAD:
      case TILE_DIRTROAD_N_E:
      case TILE_DIRTROAD_N_S:
      case TILE_DIRTROAD_S_E:
      case TILE_DIRTROAD_W_E:
      case TILE_DIRTROAD_W_N:
      case TILE_DIRTROAD_W_S:
      case TILE_DIRTROAD_W_N_E:
      case TILE_DIRTROAD_W_S_E:
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
      case TILE_GARDEN_1:
        return true;
      default:
        return true;
    }
  };

  this.newRandomPic = function () {
    if (this.picVariants.length) {
      var picIndex = Math.round(Math.random() * (this.picVariants.length - 1));
      var oldPic = this.myPic;
      this.myPic = this.picVariants[ picIndex ];
    } else {
      console.warn("Called newRandomPic on enemy without pic variants", this);
    }
  }
}

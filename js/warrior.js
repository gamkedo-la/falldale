// TODO: Probably want to set direction per object instead of
//       putting it in a global variable
// this also doesn't allow diagonal movement
var direction = "south";

const PLAYER_SPEED = 6.0;
const PLAYER_SPEED_DEBUFF = 4.0;

var levelExperienceArray = [ 500, 2000, 4000, 6000, 10000, 16000, 26000, 42000, 68000 ];

function warriorClass(whichPlayerPic) {
  this.mySword = new swordClass();
  this.myArrow = new arrowClass(direction);
  this.myRock = new rockClass();
  this.recentWeapon = this.mySword;
  this.arrowList = [];
  this.x = 65;
  this.prevX = this.x;
  this.centerX = 40;
  this.y = 100;
  this.prevY = this.y;
  this.resetPositionCoords = {x: this.x, y: this.y};
  this.centerY = 80;
  this.head = this.y - 25;
  this.feet = this.y + 25;
  this.leftArm = this.x + 25;
  this.rightArm = this.x - 25;
  this.speed = PLAYER_SPEED;
  this.isFrozen = false;
  this.isEnemyCollision = false;
  this.myWarriorPic = null; // which picture to use
  this.name = "Untitled warrior";
  this.keysHeld = 0;
  this.woodAx = 0;
  this.goldpieces = 10;
  this.experience = 0;
  this.maxHealth = 4;
  this.health = 4;
  this.isTakingDamage = false;
  this.warriorHealthCountdownSeconds = 5;
  this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
  this.waitTime = 0;
  this.walkIntoTileIndex = 0;
  this.previousTileType = -1;
  this.sx = 40;
  this.sy = 0;
  this.tickCount = 0;
  this.frameIndex = 0;
  this.width = 50;
  this.numberOfFrames = 6;
  this.height = 50;
  this.ticksPerFrame = 5;
  this.playerMove = false;
  this.strength = 0;
  this.dexterity = 0;
  this.constitution = 0;
  this.intelligence = 0;
  this.wisdom = 0;
  this.charisma = 0;
  this.experienceLevel = 1;
  this.armor = 10;
  this.healingPotion = 0;
  this.haveMap = false;
  this.questOneActive = true;
  this.delkonRewardOffer = false;
  this.questOneComplete = false;
  this.questTwoActive = false;
  this.questTwoComplete = false;
  this.questThreeActive = false;
  this.questThreeComplete = false;
  this.questFourActive = false;
  this.questFourComplete = false;
  this.questFiveActive = false;
  this.questFiveComplete = false;
  this.questSixActive = false;
  this.questSixComplete = false;
  this.goblinsKilledInFallDale = 0;

  // side quests
  this.catsMet = 0;
  this.stepsTaken = 0;
  this.attackCount = 0;
  this.doorOpenCount = 0;

  this.keyHeld_WalkNorth = false;
  this.keyHeld_WalkSouth = false;
  this.keyHeld_WalkWest = false;
  this.keyHeld_WalkEast = false;
  this.keyHeld_Sword = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;
  this.controlKeySword;

  this.isInsideAnyBuilding = true;
  this.lastOpenDoorIndex = rowColToArrayIndex(4, 4);
  this.lastOpenDoorTile = TILE_FRONTDOOR_YELLOW;

  this.savePrefix = "player_";
  this.saveVariables = [ "x", "y", "health", "maxHealth", "name", "experience", "keysHeld", "goldpieces",
    "experienceLevel", "healingPotion", "haveMap", "questOneComplete", "delkonRewardOffer",
    "goblinsKilledInFallDale" ];

  this.setupInput = function (upKey, rightKey, downKey, leftKey, swordKey, arrowKey, rockKey, inventoryKey, statsKey, healthKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
    this.controlKeySword = swordKey;
    this.controlKeyArrow = arrowKey;
    this.controlKeyRock = rockKey;
    this.controlKeyInventory = inventoryKey;
    this.controlKeyStats = statsKey;
    this.controlKeyDisplayHealth = healthKey;
  };

  this.releaseKeys = function () {
    this.keyHeld_WalkNorth = false;
    this.keyHeld_WalkSouth = false;
    this.keyHeld_WalkWest = false;
    this.keyHeld_WalkEast = false;
    this.keyHeld_Sword = false;
  };

  this.saveData = function () {
    for (var variable in this.saveVariables) {
      localStorage[ this.savePrefix + this.saveVariables[ variable ] ] = this[ this.saveVariables[ variable ] ];
      console.log("saving " + this[ this.saveVariables[ variable ] ] + " which is " + this.saveVariables[ variable ]);
    }
  };

  this.loadData = function () {
    for (var variable in this.saveVariables) {
      this[ this.saveVariables[ variable ] ] = parseInt(localStorage[ this.savePrefix + this.saveVariables[ variable ] ]);
      console.log("loaded " + this[ this.saveVariables[ variable ] ] + " which is " + this.saveVariables[ variable ]);
    }
  };

  this.positionWarriorAtStartAndReplaceStartTile = function () {
    for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (roomGrid[ arrayIndex ] == TILE_PLAYERSTART) {
          roomGrid[ arrayIndex ] = TILE_ROAD;
          this.x = eachCol * TILE_W + TILE_W / 2;
          this.y = eachRow * TILE_H + TILE_H / 2;
          return;
        } // end of Player Start if
      } //end of col row for
    } // end of row for
  };

  this.initialize = function (warriorName) {
    this.name = warriorName;
    this.yellowKeysHeld = 0;
    this.greenKeysHeld = 0;
    this.blueKeysHeld = 0;
    this.redKeysHeld = 0;
    this.health = 4;

    this.mySword.reset();
    this.myArrow.reset();
    this.myRock.reset();

    this.positionWarriorAtStartAndReplaceStartTile();
  }; // end of warrior initialize function

  this.storePos = function () {
    this.prevX = this.x;
    this.prevY = this.y;
  };

  this.restorePos = function () {
    this.x = this.prevX;
    this.y = this.prevY;
  };

  this.move = function () {
    this.playerMove = !this.isFrozen && (this.keyHeld_WalkNorth || this.keyHeld_WalkSouth || this.keyHeld_WalkWest || this.keyHeld_WalkEast);

    this.storePos();

    var { nextX, nextY } = this.nextPosWithInput(nextY, nextX);

    const tileC = pixelXtoTileCol(nextX);
    const tileR = pixelYtoTileRow(nextY + (this.height / 2));

    const didLoadNewLevel = this.loadNewLevelIfAtEdge(tileC, tileR);
    if (didLoadNewLevel) {
      OverlayFX.init();
      return;
    }

    if (this.prevX != nextX || this.prevY != nextY) {
      let collision = this.collisionCheck(nextX, nextY);
      this.setDirection(collision.x, collision.y);
      this.updatePosition(collision.x, collision.y);
    }

    this.mySword.move();
    this.myArrow.move();
    this.myRock.move();

    this.tryToTriggerMonsterSpawnAt(skeletonClass, skeletonPic, skeletonSpawnTiles, this.x + this.width / 2, this.y + this.height / 2, direction, 6);
  };

  this.freeze = function (duration) {
    this.isFrozen = true;

    (function (warrior) {
      setTimeout(function () {
        warrior.isFrozen = false;
      }, duration);
    })(this);
  };

  this.tryToTriggerMonsterSpawnAt = function (monsterClass, monsterPic, spawnTiles, x, y, dir = direction, frameCount, chance = 0.3) { // 0.0 to less than 2.0 chance
    for (var i = 0; i < spawnTiles.length; i++) {
      if (isTileIndexAdjacentToPixelCoord(x, y, spawnTiles[ i ])) {
        // TODO: Find a better way to determine the chance?
        if (this.tickCount * 12 % 10 == 0 && Math.random() + Math.random() > 2.0 - chance) {
          var monsterInstance = new monsterClass('Papyrus', monsterPic, frameCount);
          if (dir == "north") {
            y -= 2 * TILE_H;
          }
          if (dir == "south") {
            y += 2 * TILE_H;
          }
          if (dir == "west") {
            x -= 2 * TILE_W;
          }
          if (dir == "east") {
            x += 2 * TILE_W;
          }
          monsterInstance.reset(x, y);
          enemyList.push(monsterInstance);
		  monsterInstance.initialize('Skeleton1', skeletonPic, frameCount);
          return;
        }
      }
    }
  };

  this.checkForLevelUp = function () {
    if (this.experience >= levelExperienceArray[ this.experienceLevel ]) {
      this.levelup();
    }
  };

  this.levelup = function () {
    // results when player hits certain experience
    var increasedHitPoints = 0;
    this.experienceLevel++;
    increasedHitPoints = Math.floor(Math.random() * 6) + 1;
    this.maxHealth = this.maxHealth + increasedHitPoints;
    this.health = this.health + increasedHitPoints;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
    dialogManager.setDialogWithCountdown("I feel stronger!.  LEVEL UP. I've gained " + increasedHitPoints + " Hit Points");
  };

  this.death = function () {
    this.health = this.maxHealth;
    this.x = this.resetPositionCoords.x;
    this.y = this.resetPositionCoords.y;
    camera.x = this.x - 150;
    camera.y = this.y - 150;
  };

  this.rangeTest = function (adversary) {
    return !(adversary.x > (this.x + this.width) ||
        (adversary.x + adversary.width) < this.x ||
        adversary.y > (this.y + this.height) ||
        (adversary.y + adversary.height) < this.y);
  };

  this.checkWarriorandWeaponCollisionAgainst = function (thisEnemy) {
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;

    if (!debugMode && this.rangeTest(thisEnemy) && thisEnemy.type == "enemy") {
      this.restorePos();
      thisEnemy.restorePos();
      thisEnemy.enemyMove = false;
    } else if (thisEnemy.type == "enemy") {
      thisEnemy.enemyMove = true;
    }

    if (thisEnemy.isOverlappingPoint(this.centerX, this.centerY)) {
      // thisEnemy.interractWithPlayer(); // TODO: once all isOverlappingPoint are refactored to return true/false AND not react directly
    }

    if (this.mySword.hitTest(this, thisEnemy)) {
      //empty
    }

    if (this.myArrow.rangeTest(thisEnemy)) {
      if (this.myArrow.hitTest(this, thisEnemy)) {
        //empty
      }
    }

    if (this.myRock.rangeTest(thisEnemy)) {
      if (this.myRock.hitTest(this, thisEnemy)) {
        //empty
      }
    }
  };

  this.swordSwing = function () {
    if (this.mySword.isReady()) {
      this.recentWeapon = this.mySword;
      this.mySword.shootFrom(this);
      swordSwingSound.play();
    }
  };

  this.shotArrow = function () {
    if (this.myArrow.isReady()) {
      this.recentWeapon = this.myArrow;
      this.myArrow.shootFrom(this, this.direction);
      arrowShotSound.play();
    }
  };

  this.shotRock = function () {
    if (this.myRock.isReady()) {
      this.recentWeapon = this.myRock;
      this.myRock.shootFrom(this, this.direction);
      rockThrowSound1.play();
    }
  };

  this.takeDamage = function (howMuch) {
    this.health -= howMuch / 10;
    playerHurtSound.play();
    this.displayHealth = true;
    this.isTakingDamage = true;
    if (this.health <= 0) {
    	this.death();
    	resetLevel();
    }
  };

  this.updateTickCountAndFrameIndex = function () {
    if (this.playerMove) {
      this.tickCount++;
      let currentTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
      let currentTileType = roomGrid[currentTileIndex];
      console.log(currentTileIndex, currentTileType);
      if (groundFootsteps.currentTime > groundFootsteps.duration - 0.2) {
        groundFootsteps.currentTime = 0;
      }
      if (stoneFootsteps.currentTime > stoneFootsteps.duration - 0.2) {
        stoneFootsteps.currentTime = 0;
      }
      if (currentTileType === 18 && !groundFootStepsPlaying) {
        groundFootsteps.play();
        groundFootStepsPlaying = true;
        stoneFootsteps.pause();
        stoneFootstepsPlaying = false;
      }
      if (currentTileType === 0 && !stoneFootstepsPlaying) {
        stoneFootsteps.play();
        stoneFootstepsPlaying = true;
        groundFootsteps.pause();
        groundFootStepsPlaying = false;
      }
    }
    if (!this.playerMove) {
      if (groundFootStepsPlaying || stoneFootstepsPlaying) {
        groundFootsteps.pause();
        groundFootStepsPlaying = false;
        stoneFootsteps.pause();
        stoneFootstepsPlaying = false;
      }

    }

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  };

  this.drawFlashingWarriorAndHealth = function () {
    if (this.isTakingDamage) {
      if (this.warriorDisplayHealthCountdown % 10 >= 4) {
        this.drawWarriorAndShadow();
      }
    }
    else {
      this.drawWarriorAndShadow();
    }

    colorRect(this.x, this.y - 16, 40, 12, "black");
    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
    colorRect(this.x + 2, this.y - 14, (this.health / this.maxHealth) * 35, 8, "green");

    this.warriorDisplayHealthCountdown--;
    if (this.warriorDisplayHealthCountdown <= 0) {
      this.displayHealth = false;
      this.isTakingDamage = false;
      this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
    }
  };

  this.drawDebug = function () {
    colorRect(this.x, this.y, 5, 5, "white");
    colorRect(this.x, this.y + this.height, 5, 5, "white");
    colorRect(this.x + this.width, this.y, 5, 5, "white");
    colorRect(this.x + this.width, this.y + this.height, 5, 5, "white");

    colorRect(this.centerX, this.centerY, 5, 5, 'white');
  };

  this.drawWarriorAndShadow = function () {
    canvasContext.drawImage(shadowPic, this.x - 16, this.y + 32);
    canvasContext.drawImage(this.myWarriorPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);

    // for (var i = 0; i < PARTICLES_PER_TICK; i++) {
    //   var tempParticle = new particleClass(this.x + 20, this.y, 'lime');
    //   particle.push(tempParticle);
    // }

    OverlayFX.maybeLeaveFootprint(this);
  };

  this.draw = function () {
    this.updateTickCountAndFrameIndex();

    this.sx = this.frameIndex * this.width;

    if ((this.direction == "north") || (this.direction == "west")) {
      this.mySword.draw(this);
    }

    if (this.displayHealth) {
      this.drawFlashingWarriorAndHealth();
    } else {
      this.drawWarriorAndShadow();
    }

    if (debugMode) {
      this.drawDebug();
    }

    if ((this.direction == "south") || (this.direction == "east")) {
      this.mySword.draw(this);
    }

    this.myArrow.draw();
    this.myRock.draw();

  };

  this.getWalkSpeed = function () {

    let xSpeed = 0;
    let ySpeed = 0;

    if (this.keyHeld_WalkWest) {
      xSpeed = -this.speed;
    }

    if (this.keyHeld_WalkEast) {
      xSpeed = this.speed;
    }

    if (this.keyHeld_WalkNorth) {
      ySpeed = -this.speed;
    }

    if (this.keyHeld_WalkSouth) {
      ySpeed = this.speed;
    }

    // reduce diagonal speed
    if ((this.keyHeld_WalkWest || this.keyHeld_WalkEast) &&
        (this.keyHeld_WalkNorth || this.keyHeld_WalkSouth)) {
      xSpeed *= 0.85; // sin 45
      ySpeed *= 0.85;
    }

    return { x: xSpeed, y: ySpeed };
  };

  this.setDirection = function (nextX, nextY) {

    if (nextX > this.prevX) {
      this.direction = "east";
      this.sx = 0;
      this.sy = this.height * 3;
    } else if (nextX < this.prevX) {
      this.direction = "west";
      this.sx = 0;
      this.sy = this.height * 2;
    } else if (nextY < this.prevY) {
      this.direction = "north";
      this.sx = 0;
      this.sy = 0;
    } else if (nextY > this.prevY) {
      this.direction = "south";
      this.sx = 0;
      this.sy = this.height;
    } else if (this.keyHeld_WalkWest) {
      this.direction = "west";
      this.sx = 0;
      this.sy = this.height * 2;
    } else if (this.keyHeld_WalkEast) {
      this.direction = "east";
      this.sx = 0;
      this.sy = this.height * 3;
    } else if (this.keyHeld_WalkNorth) {
      this.direction = "north";
      this.sx = 0;
      this.sy = 0;
    } else if (this.keyHeld_WalkSouth) {
      this.direction = "south";
      this.sx = 0;
      this.sy = this.height;
    }
  };

  this.nextPosWithInput = function () {
    let x = this.x;
    let y = this.y;

    let speed = this.getWalkSpeed();
    x += speed.x;
    y += speed.y;

    return { nextX: x, nextY: y };
  };

  this.loadNewLevelIfAtEdge = function (tileC, tileR) {
    if (tileC <= 0 && (levelCol-1) >= 0) {
      console.log("Touching left edge of map");
      levelCol--;
      console.log("this.x before is " + this.x);
      this.x = (ROOM_COLS - 3) * TILE_W;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    if (tileR <= 0 && (levelRow - 1) >= 0) {
      console.log("Touching top edge of map");
      levelRow--;
      this.y = (ROOM_ROWS - 3) * TILE_H;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    if (tileC >= ROOM_COLS - 1 && levelCol < MAP_WIDTH) {
      console.log("Touching right edge of map");
      levelCol++;
      this.x = TILE_W;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    if (tileR >= ROOM_ROWS - 1 && levelRow < MAP_WIDTH) {
      console.log("Touching bottom edge of map");
      levelRow++;
      this.y = TILE_H;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    return false;
  };

  this.indexOfNextTile = function (nextX, nextY) {

    let xOffset = 0;
    let yOffset = 0;

    if (this.keyHeld_WalkNorth) {
      yOffset = 0;
    } else if (this.keyHeld_WalkSouth) {
      yOffset = this.height;
    } else {
      yOffset = this.height / 2;
    }

    if (this.keyHeld_WalkWest) {
      xOffset = 0;
    } else if (this.keyHeld_WalkEast) {
      xOffset = this.width;
    } else {
      xOffset = this.width / 2;
    }

    return getTileIndexAtPixelCoord(nextX + xOffset, nextY + yOffset);
  };

  this.tileTypeForIndex = function (tileIndex) {
    if (tileIndex == undefined) {
      return TILE_WALL;
    } else {
      return roomGrid[ tileIndex ];
    }
  };

  this.setSpeedAndPosition = function (speed, xPos, yPos) {
    if (debugMode) {
      this.speed = 20;
    } else if (this.isFrozen) {
      this.speed = 0;
    } else {
      this.speed = speed;
    }

    this.x = xPos;
    this.y = yPos;
  };

  this.loadNextLevel = function (newRow, newCol) {
    levelRow = newRow;
    levelCol = newCol;
    loadLevel();
  };

  this.replaceTileAtIndexWithTileOfTypeAndPlaySound = function (aTileIndex, aTileType, sound = null) {
    if (sound != null) {
      sound.play();
    }

    setNewTypeForTileObjectAtIndex(aTileType, aTileIndex);
    roomGrid[ aTileIndex ] = aTileType;
  };

  this.tryToOpenYellowDoor = function (tileIndex) {
    if (this.yellowKeysHeld > 0 || debugMode) {
      this.yellowKeysHeld--; // one less key
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
      dialogManager.setDialogWithCountdown("I've used a yellow key.");
    } else {
      dialogManager.setDialogWithCountdown("I need a yellow key to open this door.");
    }
  };

  this.tryToOpenGreenDoor = function (tileIndex) {
    if (this.greenKeysHeld > 0 || debugMode) {
      this.greenKeysHeld--; // one less key
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
      dialogManager.setDialogWithCountdown("I've used a green key.");
    } else {
      dialogManager.setDialogWithCountdown("I need a green key to open this door.");
    }
  };

  this.tryToOpenRedDoor = function (tileIndex) {
    if (this.redKeysHeld > 0 || debugMode) {
      this.redKeysHeld--; // one less key
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
      dialogManager.setDialogWithCountdown("I've used a red key.");
    } else {
      dialogManager.setDialogWithCountdown("I need a red key to open this door.");
    }

  };

  this.tryToOpenBlueDoor = function (tileIndex) {
    if (this.blueKeysHeld > 0 || debugMode) {
      this.blueKeysHeld--; // one less key
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
      dialogManager.setDialogWithCountdown("I've used a blue key.");
    } else {
      dialogManager.setDialogWithCountdown("I need a blue key to open this door.");
    }
  };

  this.tryToRemoveFallenTreeOnRoad = function (tileIndex) {
    if (this.woodAx > 0 || debugMode) {
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD);
      dialogManager.setDialogWithCountdown("Chop Chop");
    } else {
      dialogManager.setDialogWithCountdown("This tree is in my way.  If I only had an Ax.");
    }
  };

  this.tryToRemoveFallenTreeOnGrass = function (tileIndex) {
    if (this.woodAx > 0 || debugMode) {
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS);
      dialogManager.setDialogWithCountdown("Chop Chop");
    } else {
      dialogManager.setDialogWithCountdown("This tree is in my way.  If I only had an Ax.");
    }
  };

  this.pickUpYellowKey = function (tileIndex) {
    this.yellowKeysHeld++; // one more key
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
    dialogManager.setDialogWithCountdown("I've found a yellow key.");
  };

  this.pickUpRedKey = function (tileIndex) {
    this.redKeysHeld++; // one more key
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
    dialogManager.setDialogWithCountdown("I've found a red key.");
  };

  this.pickUpBlueKey = function (tileIndex) {
    this.blueKeysHeld++; // one more key
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
    dialogManager.setDialogWithCountdown("I've found a blue key.");
  };

  this.pickUpGreenKey = function (tileIndex) {
    this.greenKeysHeld++; // one more key
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
    dialogManager.setDialogWithCountdown("I've found a green key.");
  };

  this.pickUpMap = function (tileIndex) {
    this.haveMap = true; // treasure map found
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS, null);
    dialogManager.setDialogWithCountdown("So this is what this place looks like.  [PRESS 3] for map");
  };

  this.tryToGetTreasureWithYellowKey = function (tileIndex) {
    if (this.yellowKeysHeld > 0) {
      this.yellowKeysHeld--; // one less key
      this.goldpieces = this.goldpieces + 50;
      this.myArrow.quantity += 5;
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, null);
      dialogManager.setDialogWithCountdown("I've used a yellow key and found 50 gold pieces, and 5 arrows");
    } else {
      dialogManager.setDialogWithCountdown("I need a yellow key to open this treasure chest.");
    }
  };

  this.pickUpThrowingRocks = function (tileIndex) {
    this.myRock.quantity += 5;
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS, null);
    dialogManager.setDialogWithCountdown("What luck!  I can use these rocks for throwing at enemies.");
  };

  this.pickUpArrows = function (tileIndex) {
    this.myArrow.quantity += 5;
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS, null);
    dialogManager.setDialogWithCountdown("I'll add these 5 arrows to my inventory.");
  };

  this.impaledOnFreshSpikes = function (tileIndex, nextX, nextY) {
    this.setSpeedAndPosition(this.speed, nextX, nextY);
    this.health = this.health - 0.5;
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_SPIKES_BLOODY, spikeSound);
  };

  this.impaledOnBloodySpikes = function (nextX, nextY) {
    this.setSpeedAndPosition(this.speed, nextX, nextY);
    dialogManager.setDialogWithCountdown("OUCH! Bloody Spikes!");
  };

  this.tryOpenDoor = function (walkIntoTileIndex, doorTileType, message) {

    if (this.isInsideAnyBuilding || this.lastOpenDoorIndex > 0)
      return;

    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(walkIntoTileIndex, TILE_OPEN_DOORWAY, shutDoor);
    this.lastOpenDoorIndex = walkIntoTileIndex;
    this.lastOpenDoorTile = doorTileType;
    dialogManager.setDialogWithCountdown(message);
  };

  this.tryCloseDoor = function () {
    if (!this.isInsideAnyBuilding && this.lastOpenDoorIndex > 0) {
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(this.lastOpenDoorIndex, this.lastOpenDoorTile, shutDoor);
      this.lastOpenDoorIndex = -1;
      return true;
    }
    return false;
  };

  this.collisionCheck = function (nextX, nextY) {

    let col = [];
    col[ 0 ] = { index: this.indexOfNextTile(nextX, nextY), x: nextX, y: nextY };
    col[ 1 ] = { index: this.indexOfNextTile(nextX, this.y), x: nextX, y: this.y };
    col[ 2 ] = { index: this.indexOfNextTile(this.x, nextY), x: this.x, y: nextY };

    for (i = 0; i <= 2; i++) {
      const walkIntoTileType = this.tileTypeForIndex(col[ i ].index);

      if (this.isPassableTile(walkIntoTileType)) {
        nextX = col[ i ].x;
        nextY = col[ i ].y;
        break;
      }
    }

    //speed buffs/debuffs
    const walkIntoTileTypeIndex = this.indexOfNextTile(nextX, nextY + (this.height / 2));
    const walkIntoTileTypeFeet = this.tileTypeForIndex(walkIntoTileTypeIndex);

    switch (walkIntoTileTypeFeet) {
      case TILE_GRASS:
      case TILE_GARDEN_1:
        this.setSpeedAndPosition(PLAYER_SPEED_DEBUFF, nextX, nextY);
        break;
      default:
        const index = this.indexOfNextTile(nextX, nextY);
        const type = this.tileTypeForIndex(index);
        if (this.isPassableTile(type))
          this.setSpeedAndPosition(PLAYER_SPEED, nextX, nextY);
    }

    return { x: nextX, y: nextY };
  };

  this.updatePosition = function (nextX, nextY) {

    let walkIntoTileIndex = this.indexOfNextTile(nextX, nextY);
    const walkIntoTileType = this.tileTypeForIndex(walkIntoTileIndex);

    switch (walkIntoTileType) {
      case TILE_TREE5FALLEN_BOTTOM:
        this.tryToRemoveFallenTreeOnRoad(walkIntoTileIndex);
        break;
      case TILE_TREE5FALLEN_TOP:
      case TILE_TREE5FALLEN_BOTTOM_GRASS:
        this.tryToRemoveFallenTreeOnGrass(walkIntoTileIndex);
        break;
      case TILE_HEALER_FRONTDOOR:
        if (this.lastOpenDoorIndex = -1)
          this.tryOpenDoor(walkIntoTileIndex, TILE_HEALER_FRONTDOOR,
              "This place smells nice.  Is that lavender?");
        return;
      case TILE_YELLOW_DOOR:
        this.tryToOpenYellowDoor(walkIntoTileIndex);
        break;
      case TILE_GREEN_DOOR:
        this.tryToOpenGreenDoor(walkIntoTileIndex);
        break;
      case TILE_FRONTDOOR_YELLOW:
        if (this.lastOpenDoorIndex = -1)
          this.tryOpenDoor(walkIntoTileIndex, TILE_FRONTDOOR_YELLOW);
        return;
      case TILE_RED_DOOR:
        this.tryToOpenRedDoor(walkIntoTileIndex);
        break;
      case TILE_BLUE_DOOR:
        this.tryToOpenBlueDoor(walkIntoTileIndex);
        break;
      case TILE_YELLOW_KEY:
        this.pickUpYellowKey(walkIntoTileIndex);
        break;
      case TILE_RED_KEY:
        this.pickUpRedKey(walkIntoTileIndex);
        break;
      case TILE_BLUE_KEY:
        this.pickUpBlueKey(walkIntoTileIndex);
        break;
      case TILE_GREEN_KEY:
        this.pickUpGreenKey(walkIntoTileIndex);
        break;
      case TILE_MAP:
        this.pickUpMap(walkIntoTileIndex);
        break;
      case TILE_GRAVEYARD_YELLOW_GATE:
        this.tryToOpenYellowDoor(walkIntoTileIndex);
        break;
      case TILE_TREASURE:
        this.tryToGetTreasureWithYellowKey(walkIntoTileIndex);
        break;
      case TILE_THROWINGROCKS:
        this.pickUpThrowingRocks(walkIntoTileIndex);
        break;
      case TILE_ARROWS:
        this.pickUpArrows(walkIntoTileIndex);
        break;
      case TILE_GRAVE_1:
      case TILE_GRAVE_2:
      case TILE_GRAVE_3:
        dialogManager.setDialogWithCountdown("Too many good people have died from the Skeleton King and his army of the dead.");
        break;
      case TILE_GRAVE_4:
        dialogManager.setDialogWithCountdown("I need to avenge my friend.  The Skeleton King and his army of the dead must be destroyed!.");
        break;
      case TILE_FOUNTAIN:
        dialogManager.setDialogWithCountdown("What a beautiful fountain.");
        break;
      case TILE_SPIKES:
        this.impaledOnFreshSpikes(walkIntoTileIndex, nextX, nextY);
        break;
      case TILE_SPIKES_BLOODY:
        this.impaledOnBloodySpikes(nextX, nextY);
        break;
      case TILE_HOUSE_DRESSER_BOTTOM:
        dialogManager.setDialogWithCountdown("I really need to get some new clothes.");
        break;
      case TILE_HOUSE_LS_BED_BOTTOM:
        dialogManager.setDialogWithCountdown("No time to sleep!.");
        break;
      case TILE_BS_BW_WEAPONSRACKBOTTOM:
        dialogManager.setDialogWithCountdown("No swords?!  Isn't this a blacksmith's shop?");
        break;
      case TILE_CHAIR:
        dialogManager.setDialogWithCountdown("I really need a drink!");
        break;
      case TILE_WALL:
      case TILE_OPEN_DOORWAY:
        return;
      default:
        break;
    } // end of switch

    this.tryCloseDoor();

  };// end of updatePosition()

  this.isPassableTile = function (aTile) {

    if (debugMode)
      return true;

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
      case TILE_GRAVEYARD_FENCE_LEFT:
      case TILE_GRAVEYARD_FENCE_RIGHT:
      case TILE_GRAVEYARD_FENCE:
      case TILE_GRAVEYARD_FENCE_SIDE:
      case TILE_GRAVEYARD_FENCE_BR:
      case TILE_GRAVEYARD_FENCE_TR:
      case TILE_GRAVEYARD_FENCE_LEFTSIDE:
      case TILE_GRAVEYARD_FENCE_BL:
      case TILE_GRAVEYARD_FENCE_TL:
      case TILE_WATER:
      case TILE_TREE:
      case TILE_TREE2TOPHALF:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
      case TILE_TREE4TOPHALF:
      case TILE_TREE4BOTTOMHALF:
      case TILE_TREE5FALLEN_TOP:
      case TILE_TREE5FALLEN_BOTTOM:
      case TILE_TREE5FALLEN_BOTTOM_GRASS:
      case TILE_YELLOW_DOOR:
      case TILE_GREEN_DOOR:
      case TILE_BLUE_DOOR:
      case TILE_RED_DOOR:
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
      case TILE_GRAVEYARD_YELLOW_GATE:
        if (this.yellowKeysHeld > 0) {
          return true;
        } else {
          return false;
        }
      default:
        return true;
    }
  }

}// end of warriorClass

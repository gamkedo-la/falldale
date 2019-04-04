// TODO: Probably want to set direction per object instead of
//       putting it in a global variable
// this also doesn't allow diagonal movement
// hello world! this is a practice commit, will remove this asap - Jeremy Domasian
var direction = "south";

levelExperienceArray = [500, 2000, 4000, 6000, 10000, 16000, 26000, 42000, 68000]

function warriorClass() {
	this.mySword = new swordClass();
	this.myArrow = new arrowClass(direction);
	this.myRock = new rockClass();
	this.recentWeapon = this.mySword;
	this.arrowList = [];
	this.x = 65;
	this.centerX = 40;
	this.y = 100;
	this.centerY = 80;
	this.head = this.y - 25;
	this.feet = this.y + 25;
	this.leftArm = this.x + 25;
	this.rightArm = this.x - 25;
	this.speed = 3.0;
	this.isFrozen = false;
	this.myWarriorPic = biggyPic; // which picture to use
	this.name = "Untitled warrior";
	this.keysHeld = 0;
	this.goldpieces = 10;
	this.experience = 0;
	this.maxHealth = 4;
	this.health = 4;
	this.warriorHealthCountdownSeconds = 5;
	this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
	this.waitTime = 0;
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
	this.questOneComplete = false; // Clear the town of Goblins
	this.delkonRewardOffer = false; // 50 gp
	this.goblinsKilledInFallDale = 0;

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

	this.savePrefix = "player_";
	this.saveVariables = ["x", "y", "health", "maxHealth", "name", "experience", "keysHeld", "goldpieces",
		"experienceLevel", "healingPotion", "haveMap", "questOneComplete", "delkonRewardOffer",
		"goblinsKilledInFallDale"];

	this.setupInput = function(upKey, rightKey, downKey, leftKey, swordKey, arrowKey, rockKey, inventoryKey, statsKey, healthKey) {
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

	this.releaseKeys = function(){
		this.keyHeld_WalkNorth = false;
		this.keyHeld_WalkSouth = false;
		this.keyHeld_WalkWest = false;
		this.keyHeld_WalkEast = false;
		this.keyHeld_Sword = false;
	};

	this.saveData = function() {
		for (var variable in this.saveVariables) {
			localStorage[this.savePrefix + this.saveVariables[variable]] = this[this.saveVariables[variable]];
			console.log("saving " + this[this.saveVariables[variable]] + " which is " + this.saveVariables[variable]);
		}
	};

	this.loadData = function() {
		for (var variable in this.saveVariables) {
			this[this.saveVariables[variable]] = parseInt(localStorage[this.savePrefix + this.saveVariables[variable]]);
			console.log("loaded " + this[this.saveVariables[variable]] + " which is " + this.saveVariables[variable]);
		}
	};

	this.positionWarriorAtStartAndReplaceStartTile = function() {
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_PLAYERSTART) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
	};

	this.initialize = function(warriorName) {
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

	this.move = function() {
		var {nextX, nextY} = this.nextPosWithInput(nextY, nextX);

		this.playerMove = !this.isFrozen && (this.keyHeld_WalkNorth || this.keyHeld_WalkSouth || this.keyHeld_WalkWest || this.keyHeld_WalkEast);

		const tileC = pixelXtoTileCol(nextX);
		const tileR = pixelYtoTileRow(nextY);

		const didLoadNewLevel = this.loadNewLevelIfAtEdge(tileC, tileR);
		if(didLoadNewLevel) {return;}

		const walkIntoTileIndex = this.indexOfNextTile(nextX, nextY);

		this.previousTileType = this.updatePosition(nextX, nextY, walkIntoTileIndex);

		this.mySword.move();
		this.myArrow.move();
		this.myRock.move();

		this.tryToTriggerMonsterSpawnAt(skeletonClass, skeletonPic, skeletonSpawnTiles, this.x + this.width / 2, this.y + this.height / 2, direction);
	};

	this.freeze = function(duration) {
		this.isFrozen = true;

		(function(warrior) {
			setTimeout(function() {
				warrior.isFrozen = false;
			}, duration);
		})(this);
	};

	this.tryToTriggerMonsterSpawnAt = function(monsterClass, monsterPic, spawnTiles, x, y, dir = direction, chance = 0.3) { // 0.0 to less than 2.0 chance
		for (var i = 0; i < spawnTiles.length; i++) {
			if(isTileIndexAdjacentToPixelCoord(x, y, spawnTiles[i])) {
				// TODO: Find a better way to determine the chance?
				if (this.tickCount * 12 % 10 == 0 && Math.random() + Math.random() > 2.0 - chance) {
					var monsterInstance = new monsterClass('Papyrus', monsterPic);
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
					return;
				}
			}
		}
	};

	this.checkForLevelUp = function() {
		if (this.experience >= levelExperienceArray[this.experienceLevel]){
			this.levelup();
		}
	};

	this.levelup = function() {
		// results when player hits certain experience
		var increasedHitPoints = 0;
		this.experienceLevel++;
		increasedHitPoints = Math.floor(Math.random() * 6) + 1;
		this.maxHealth = this.maxHealth + increasedHitPoints;
		this.health = this.health + increasedHitPoints;
		if(this.health > this.maxHealth){
			this.health = this.maxHealth;
		}
		dialogManager.setDialogWithCountdown("I feel stronger!.  LEVEL UP. I've gained " + increasedHitPoints + " Hit Points");
	};
	
	this.death = function() {
		this.health = 4;
		this.x = 300; // a better location will be coded in the feature
		this.y = 300; // a better location will be coded in the feature
	};

	this.checkWarriorandWeaponCollisionAgainst = function(thisEnemy) {
		this.centerX = this.x + this.width/2;
		this.centerY = this.y + this.height/2;

		if(thisEnemy.isOverlappingPoint(this.centerX,this.centerY)) {
			//empty
		}

		if( this.mySword.hitTest(this, thisEnemy) ) {
			//empty
		}

		if(this.myArrow.rangeTest(thisEnemy)) {
			if( this.myArrow.hitTest(this, thisEnemy) ) {
				//empty
			}
		}

		if(this.myRock.rangeTest(thisEnemy)) {
			if( this.myRock.hitTest(this, thisEnemy) ) {
				//empty
			}
		}
	};

	this.swordSwing = function() {
		if( this.mySword.isReady() ) {
			this.recentWeapon = this.mySword;
			this.mySword.shootFrom(this);
			swordSwingSound.play();
		}
	};

	this.shotArrow = function() {
		if( this.myArrow.isReady() ) {
			this.recentWeapon = this.myArrow;
			this.myArrow.shootFrom(this, direction);
			arrowShotSound.play();
		}
	};

	this.shotRock = function() {
		if( this.myRock.isReady() ) {
			this.recentWeapon = this.myRock;
			this.myRock.shootFrom(this, direction);
			rockThrowSound1.play();
		}
	};

	this.takeDamage = function(howMuch) {
		this.health -= howMuch / 10;
		playerHurtSound.play();
		this.displayHealth = true;
	};

	this.updateTickCountAndFrameIndex = function() {
		if (this.playerMove) {
			this.tickCount++;
		}

		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;
			if (this.frameIndex < this.numberOfFrames - 1) {
				this.frameIndex += 1;
			}
			else {
				this.frameIndex = 0;
			}
		}
	};

	this.drawFlashingWarriorAndHealth = function() {
		if (this.warriorDisplayHealthCountdown % 10 >= 4) {
			this.drawWarriorAndShadow()
		}

		colorRect(this.x,this.y-16, 40,12, "black");
		colorRect(this.x+2,this.y-14, 35, 8, "red");
		colorRect(this.x+2,this.y-14, (this.health/this.maxHealth)*35, 8, "green");

		this.warriorDisplayHealthCountdown--;
		if(this.warriorDisplayHealthCountdown <= 0){
			this.displayHealth = false;
			this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
		}
	};

	this.drawDebug = function() {
		colorRect(this.x,this.y, 5,5, "white");
		colorRect(this.x,this.y+this.height, 5,5, "white");
		colorRect(this.x+this.width,this.y, 5,5, "white");
		colorRect(this.x+this.width,this.y+this.height, 5,5, "white");

		colorRect(this.centerX,this.centerY, 5, 5, 'white');
	};

	this.drawWarriorAndShadow = function() {
		canvasContext.drawImage(shadowPic, this.x-16, this.y+32);
		canvasContext.drawImage(this.myWarriorPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);
	};

	this.draw = function() {
		this.updateTickCountAndFrameIndex();

		this.sx = this.frameIndex * this.width;

		if((direction == "north") || (direction == "west")) {
			this.mySword.draw(this);
		}

		if(this.displayHealth) {
			this.drawFlashingWarriorAndHealth();
		} else {
			this.drawWarriorAndShadow();
		}

		if(debugMode) {this.drawDebug();}

		if((direction == "south") || (direction == "east")) {
			this.mySword.draw(this);
		}
//		this.mySword.draw(this);

		this.myArrow.draw();

		this.myRock.draw();

	};

	this.nextPosWithInput = function() {
		let x = this.x;
		let y = this.y;
		if (this.keyHeld_WalkNorth) {
			y -= this.speed;
			direction = "north";
			this.sx = 0;
			this.sy = 0;
		}
		if (this.keyHeld_WalkSouth) {
			y += this.speed;
			direction = "south";
			this.sx = 0;
			this.sy = this.height;
		}
		if (this.keyHeld_WalkWest) {
			x -= this.speed;
			direction = "west";
			this.sx = 0;
			this.sy = this.height * 2;
		}
		if (this.keyHeld_WalkEast) {
			x += this.speed;
			direction = "east";
			this.sx = 0;
			this.sy = this.height * 3;
		}

		return {nextX:x, nextY:y};
	};

	this.loadNewLevelIfAtEdge = function(tileC, tileR) {
		if (tileC <= 0) {
			console.log("Touching left edge of map");
			levelCol--;
			console.log("this.x before is " + this.x);
			this.x = (ROOM_COLS - 3) * TILE_W;
			loadLevel();
			return true;
		}

		if (tileR <= 0) {
			console.log("Touching top edge of map");
			levelRow--;
			this.y = (ROOM_ROWS - 3) * TILE_H;
			loadLevel();
			return true;
		}

		if (tileC >= ROOM_COLS - 1) {
			console.log("Touching right edge of map");
			levelCol++;
			this.x = TILE_W;
			loadLevel();
			return true;
		}

		if (tileR >= ROOM_ROWS - 1) {
			console.log("Touching bottom edge of map");
			levelRow++;
			this.y = TILE_H;
			loadLevel();
			return true;
		}

		return false;
	};

	this.indexOfNextTile = function(nextX, nextY) {
		if(direction == "north") {
			return getTileIndexAtPixelCoord(nextX+(this.width/2),nextY);
		} else if(direction == "south") {
			return getTileIndexAtPixelCoord(nextX+(this.width/2),nextY+this.height);
		} else if(direction == "west") {
			return getTileIndexAtPixelCoord(nextX, nextY+(this.height/2));
		} else if(direction == "east") {
			return getTileIndexAtPixelCoord(nextX+this.width, nextY+(this.height/2));
		} else {
			return getTileIndexAtPixelCoord(nextX, nextY);
		}
	};

	this.tileTypeForIndex = function(tileIndex) {
		if(tileIndex == undefined) {
			return TILE_WALL;
		} else {
			return roomGrid[tileIndex];
		}
	};

	this.setSpeedAndPosition = function(speed, xPos, yPos) {
		if(debugMode) {
			this.speed = 20;
		} else if (this.isFrozen) {
			this.speed = 0;
		} else {
			this.speed = speed;
		}

		this.x = xPos;
		this.y = yPos;
	};

	this.loadNextLevel = function(newRow, newCol) {
		levelRow = newRow;
		levelCol = newCol;
		loadLevel();
	};

	this.replaceTileAtIndexWithTileOfTypeAndPlaySound = function(aTileIndex, aTileType, sound = null) {
		if(sound != null) {
			sound.play();
		}

		setNewTypeForTileObjectAtIndex(aTileType, aTileIndex);
		roomGrid[aTileIndex] = aTileType;
	};

	this.openHealerDoor = function(tileIndex) {
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
		dialogManager.setDialogWithCountdown("This place smells nice.  Is that lavender?");
	};

	this.tryToOpenYellowDoor = function(tileIndex) {
		if(this.yellowKeysHeld > 0 || debugMode) {
			this.yellowKeysHeld--; // one less key
			this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
			dialogManager.setDialogWithCountdown("I've used a yellow key.");
		} else {
			dialogManager.setDialogWithCountdown("I need a yellow key to open this door.");
		}
	};

	this.tryToOpenGreenDoor = function(tileIndex) {
		if(this.greenKeysHeld > 0 || debugMode) {
			this.greenKeysHeld--; // one less key
			this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
			dialogManager.setDialogWithCountdown("I've used a green key.");
		} else {
			dialogManager.setDialogWithCountdown("I need a green key to open this door.");
		}
	};

	this.tryToOpenRedDoor = function(tileIndex) {
		if(this.redKeysHeld > 0 || debugMode) {
			this.redKeysHeld--; // one less key
			this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
			dialogManager.setDialogWithCountdown("I've used a red key.");
		} else {
			dialogManager.setDialogWithCountdown("I need a red key to open this door.");
		}

	};

	this.tryToOpenBlueDoor = function(tileIndex) {
		if(this.blueKeysHeld > 0 || debugMode) {
			this.blueKeysHeld--; // one less key
			this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
			dialogManager.setDialogWithCountdown("I've used a blue key.");
		} else {
			dialogManager.setDialogWithCountdown("I need a blue key to open this door.");
		}
	};

	this.pickUpYellowKey = function(tileIndex) {
		this.yellowKeysHeld++; // one more key
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
		dialogManager.setDialogWithCountdown("I've found a yellow key.");
	};

	this.pickUpRedKey = function(tileIndex) {
		this.redKeysHeld++; // one more key
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
		dialogManager.setDialogWithCountdown("I've found a red key.");
	};

	this.pickUpBlueKey = function(tileIndex) {
		this.blueKeysHeld++; // one more key
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
		dialogManager.setDialogWithCountdown("I've found a blue key.");
	};

	this.pickUpGreenKey = function(tileIndex) {
		this.greenKeysHeld++; // one more key
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
		dialogManager.setDialogWithCountdown("I've found a green key.");
	};

	this.pickUpMap = function(tileIndex) {
		this.haveMap = true; // treasure map found
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS, null);
		dialogManager.setDialogWithCountdown("So this is what this place looks like.  [PRESS 3] for map");
	};

	this.tryToGetTreasureWithYellowKey = function(tileIndex) {
		if(this.yellowKeysHeld > 0) {
			this.yellowKeysHeld--; // one less key
			this.goldpieces = this.goldpieces + 50;
			this.myArrow.quantity += 5;
			this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, null);
			dialogManager.setDialogWithCountdown("I've used a yellow key and found 50 gold pieces, and 5 arrows");
		} else {
			dialogManager.setDialogWithCountdown("I need a yellow key to open this treasure chest.");
		}
	};

	this.pickUpThrowingRocks = function(tileIndex) {
		this.myRock.quantity += 5;
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS, null);
		dialogManager.setDialogWithCountdown("What luck!  I can use these rocks for throwing at enemies.");
	};

	this.pickUpArrows = function(tileIndex) {
		this.myArrow.quantity += 5;
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_GRASS, null);
		dialogManager.setDialogWithCountdown("I'll add these 5 arrows to my inventory.");
	};

	this.impaledOnFreshSpikes = function(tileIndex, nextX, nextY) {
		this.setSpeedAndPosition(this.speed, nextX, nextY);
		this.health = this.health - 0.5;
		this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_SPIKES_BLOODY, spikeSound);
	};

	this.impaledOnBloodySpikes = function(nextX, nextY) {
		this.setSpeedAndPosition(this.speed, nextX, nextY);
		dialogManager.setDialogWithCountdown("OUCH! Bloody Spikes!");
	};

	this.updatePosition = function(nextX, nextY, walkIntoTileIndex) {
		const walkIntoTileType = this.tileTypeForIndex(walkIntoTileIndex);

		switch(walkIntoTileType) {
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
				this.setSpeedAndPosition(3.0, nextX, nextY);
				break;
			case TILE_GRASS:
			case TILE_GARDEN_1:
				this.setSpeedAndPosition(2.0, nextX, nextY);
				break;
			case TILE_GRAVE_YARD_PORTAL:
				this.loadNextLevel(3, 1);
				break;
			case TILE_HOME_VILLAGE_PORTAL:
				this.loadNextLevel(2, 1);
				break;
			case TILE_FOREST_PORTAL:
				this.loadNextLevel(3, 0);
				break;
			case TILE_HEALER_FRONTDOOR:
				this.openHealerDoor(walkIntoTileIndex);
				break;
			case TILE_YELLOW_DOOR:
				this.tryToOpenYellowDoor(walkIntoTileIndex);
				break;
			case TILE_GREEN_DOOR:
				this.tryToOpenGreenDoor(walkIntoTileIndex);
				break;
			case TILE_FRONTDOOR_YELLOW:
				this.replaceTileAtIndexWithTileOfTypeAndPlaySound(walkIntoTileIndex, TILE_ROAD, null);
				break;
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
			case TILE_CHAIR:
				this.setSpeedAndPosition(this.speed, nextX, nextY);
				break;
			case TILE_WALL:
			default:
				break;
		} // end of switch

		return walkIntoTileType;
	};// end of updatePosition()
}// end of warriorClass

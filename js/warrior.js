var playerMoveSpeed = 3.0;

// TODO: Probably want to set direction per object instead of
//       putting it in a global variable
// this also doesn't allow diagonal movement
var direction = "south";

var healthCountdownSeconds = 5;
var displayHealthCountdown = healthCountdownSeconds * 30;

level02Experience = 500;
level03Experience = 2000;
level04Experience = 4000;
level05Experience = 6000;
level06Experience = 10000;
level07Experience = 16000;
level08Experience = 26000;
level09Experience = 42000;
level10Experience = 68000;

function warriorClass() {
	this.mySword = new swordClass();
	this.myArrow = new arrowClass();
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
	this.speed = 0;
	this.myWarriorPic = biggyPic; // which picture to use
	this.name = "Untitled warrior";
	this.keysHeld = 0;
	this.goldpieces = 10;
	this.experience = 0;
	this.maxHealth = 4;
	this.health = 4;
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
	this.saveVariables = ["x", "y", "health", "maxHealth", "name", "experience", "keysHeld", "goldpieces", "experienceLevel", "healingPotion", "haveMap"];

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

	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic;
		this.yellowKeysHeld = 0;
		this.greenKeysHeld = 0;
		this.blueKeysHeld = 0;
		this.redKeysHeld = 0;
		this.health = 4;

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
		//console.log("No Player Start found!");
		this.mySword.reset();
		this.myArrow.reset();
		this.myRock.reset();
	}; // end of warriorRest func

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_WalkNorth) {
			nextY -= playerMoveSpeed;
			direction = "north";
			this.sx = 0;
			this.sy = 0;
		}
		if(this.keyHeld_WalkSouth) {
			nextY += playerMoveSpeed;
			direction = "south";
			this.sx = 0;
			this.sy = this.height;
		}
		if(this.keyHeld_WalkWest) {
			nextX -= playerMoveSpeed;
			direction = "west";
			this.sx = 0;
			this.sy = this.height*2;
		}
		if(this.keyHeld_WalkEast) {
			nextX += playerMoveSpeed;
			direction = "east";
			this.sx = 0;
			this.sy = this.height*3;
		}

		if(this.keyHeld_WalkNorth || this.keyHeld_WalkSouth || this.keyHeld_WalkWest || this.keyHeld_WalkEast) {
			this.playerMove = true;
		} else {
			this.playerMove = false;
		}
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
		var walkIntoTileType = TILE_WALL;

		if(direction == "north") {
			walkIntoTileIndex = getTileIndexAtPixelCoord(nextX+(this.width/2),nextY);
		}
		if(direction == "south") {
			walkIntoTileIndex = getTileIndexAtPixelCoord(nextX+(this.width/2),nextY+this.height);
		}
		if(direction == "west") {
			walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY+(this.height/2));
		}
		if(direction == "east") {
			walkIntoTileIndex = getTileIndexAtPixelCoord(nextX+this.width, nextY+(this.height/2));
		}

		if(walkIntoTileIndex != undefined) {
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_BRIDGE_LOWER:
			case TILE_ROAD:
				playerMoveSpeed = 3.0;
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GRASS:
				playerMoveSpeed = 2.0;
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GRAVE_YARD_PORTAL:
				levelNow = 1;//1=graveyard
				loadLevel(levelList[levelNow]);
				break;

			case TILE_HOME_VILLAGE_PORTAL:
			levelNow = 0;//0=levelOne
			loadLevel(levelList[levelNow]);
				break;
			case TILE_FINISH:
				nextLevel();
				break;
			case TILE_HEALER_FRONTDOOR:
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				setDialogUICountdown(3);
				dialog = "This place smells nice.  Is that lavender?";
				doorSound.play();
			case TILE_YELLOW_DOOR:
				if(this.yellowKeysHeld > 0 || debugMode) {
					this.yellowKeysHeld--; // one less key
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					setDialogUICountdown(3);
					dialog = "I've used a yellow key.";
					doorSound.play();
				} else {
					setDialogUICountdown(3);
					dialog = "I need a yellow key to open this door.";
				}
				break;
			case TILE_GREEN_DOOR:
				if(this.greenKeysHeld > 0 || debugMode) {
					this.greenKeysHeld--; // one less key
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					setDialogUICountdown(3);
					dialog = "I've used a green key.";
					doorSound.play();
				} else {
					setDialogUICountdown(3);
					dialog = "I need a green key to open this door.";
				}
				break;
			case TILE_FRONTDOOR_YELLOW:
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_RED_DOOR:
				if(this.redKeysHeld > 0 || debugMode) {
					this.redKeysHeld--; // one less key
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					setDialogUICountdown(3);
					dialog = "I've used a red key.";
					doorSound.play();
				} else {
					setDialogUICountdown(3);
					dialog = "I need a red key to open this door.";
				}
				break;
			case TILE_BLUE_DOOR:
				if(this.blueKeysHeld > 0 || debugMode) {
					this.blueKeysHeld--; // one less key
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					setDialogUICountdown(3);
					dialog = "I've used a blue key.";
					doorSound.play();
				} else {
					setDialogUICountdown(3);
					dialog = "I need a blue key to open this door.";
				}
				break;
			case TILE_YELLOW_KEY:
				this.yellowKeysHeld++; // one more key
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				setDialogUICountdown(3);
				dialog = "I've found a yellow key.";
				keySound.play();
				break;
			case TILE_RED_KEY:
				this.redKeysHeld++; // one more key
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				setDialogUICountdown(3);
				dialog = "I've found a red key.";
				keySound.play();
				break;
			case TILE_BLUE_KEY:
				this.blueKeysHeld++; // one more key
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				setDialogUICountdown(3);
				dialog = "I've found a blue key.";
				keySound.play();
				break;
			case TILE_GREEN_KEY:
				this.greenKeysHeld++; // one more key
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				setDialogUICountdown(3);
				dialog = "I've found a green key.";
				keySound.play();
				break;
			case TILE_MAP:
				this.haveMap = true; // treasure map found
				roomGrid[walkIntoTileIndex] = TILE_GRASS;
				setDialogUICountdown(3);
				dialog = "So this is what this place looks like.  [PRESS 3] for map";

				break;
			case TILE_TREASURE:
				if(this.yellowKeysHeld > 0) {
					this.yellowKeysHeld--; // one less key
					this.goldpieces = this.goldpieces + 50;
					redWarrior.myArrow.arrowQuantity = redWarrior.myArrow.arrowQuantity + 5;
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					setDialogUICountdown(3);
					dialog = "I've used a yellow key and found 50 gold pieces, and 5 arrows";
				} else {
					setDialogUICountdown(3);
					dialog = "I need a yellow key to open this treasure chest.";
				}
				break;
			case TILE_THROWINGROCKS:
				redWarrior.myRock.rockQuantity = redWarrior.myRock.rockQuantity + 5;
				roomGrid[walkIntoTileIndex] = TILE_GRASS;
				setDialogUICountdown(3);
				dialog = "What luck!  I can use these rocks for throwing at enemies.";
				break;
			case TILE_ARROWS:
				redWarrior.myArrow.arrowQuantity = redWarrior.myArrow.arrowQuantity + 5;
				roomGrid[walkIntoTileIndex] = TILE_GRASS;
				setDialogUICountdown(3);
				dialog = "I'll add these 5 arrows to my inventory.";
				break;
			case TILE_GRAVE:
				setDialogUICountdown(3);
				dialog = "Too many good people have died from the Skeleton King and his army of the dead.";
				break;
			case TILE_FRESH_GRAVE:
				setDialogUICountdown(3);
				dialog = "I need to avenge my friend.  The Skeleton King and his army of the dead must be destroyed!.";
				break;
			case TILE_BED:
				setDialogUICountdown(3);
				dialog = "I am not tired.";
				break;
			case TILE_FOUNTAIN:
				setDialogUICountdown(3);
				dialog = "What a beautiful fountain.";
				break;
			case TILE_CABINET:
				setDialogUICountdown(3);
				dialog = "The bookcase is bare.  One day, I'll have a library of my own.";
				break;
			case TILE_SPIKES:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.health = this.health - 0.5; // Damage to Health
				roomGrid[walkIntoTileIndex] = TILE_SPIKES_BLOODY;
				spikeSound.play();
				break;
			case TILE_SPIKES_BLOODY:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				setDialogUICountdown(3);
				dialog = "OUCH! Bloody Spikes!";
				break;
			case TILE_HOUSE_DRESSER_BOTTOM:
				setDialogUICountdown(3);
				dialog = "I really need to get some new clothes.";
				break;
			case TILE_HOUSE_LS_BED_BOTTOM:
				setDialogUICountdown(3);
				dialog = "No time to sleep!.";
				break;
			case TILE_BS_BW_WEAPONSRACKBOTTOM:
				setDialogUICountdown(3);
				dialog = "No swords?!  Isn't this a blacksmith's shop?";
				break;
			case TILE_CHAIR:
				setDialogUICountdown(3);
				dialog = "I really need a drink!";
				break;
			case TILE_CHAIR:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_WALL:
			default:
				break;

		} // end of switch

		this.previousTileType = walkIntoTileType;
		this.mySword.move();
		this.myArrow.move();
		this.myRock.move();

		this.tryToTriggerMonsterSpawnAt(skeletonClass, skeletonPic, skeletonSpawnTiles, this.x + this.width / 2, this.y + this.height / 2, direction);
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

	this.checkForLevelUp = function(){
		if(this.experience >= level02Experience && this.experienceLevel == 1){
			this.levelup();
		} else if (this.experience >= level03Experience && this.experienceLevel == 2){
			this.levelup();
		} else if (this.experience >= level04Experience && this.experienceLevel == 3){
			this.levelup();
		} else if (this.experience >= level05Experience && this.experienceLevel == 4){
				this.levelup();
		} else if (this.experience >= level06Experience && this.experienceLevel == 5){
				this.levelup();
		} else if (this.experience >= level07Experience && this.experienceLevel == 6){
				this.levelup();
		} else if (this.experience >= level08Experience && this.experienceLevel == 7){
				this.levelup();
		} else if (this.experience >= level09Experience && this.experienceLevel == 8){
				this.levelup();
		} else if (this.experience >= level10Experience && this.experienceLevel == 9){
				this.levelup();
		}
	};

	this.levelup = function(){
		// results when player hits certain experience
		var increasedHitPoints = 0;
		this.experienceLevel++;
		increasedHitPoints = Math.floor(Math.random() * 6) + 1;
		this.maxHealth = this.maxHealth + increasedHitPoints;
		this.health = this.health + increasedHitPoints;
		if(this.health > this.maxHealth){
			this.health = this.maxHealth;
		}
		setDialogUICountdown(3);
		dialog = "I feel stronger!.  LEVEL UP. I've gained " + increasedHitPoints + " Hit Points";
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
		}
	};

	this.shotArrow = function() {
		if( this.myArrow.isReady() ) {
			this.recentWeapon = this.myArrow;
			this.myArrow.shootFrom(this, direction);
		}
	};

	this.shotRock = function() {
		if( this.myRock.isReady() ) {
			this.recentWeapon = this.myRock;
			this.myRock.shootFrom(this, direction);
		}
	};

	this.takeDamage = function(howMuch) {
		this.health -= howMuch / 10;
		playerHurtSound.play();
		this.displayHealth = true;
	};

	this.draw = function() {
		if(this.playerMove) {
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

		this.sx = this.frameIndex * this.width;

		if(this.displayHealth){
			if (displayHealthCountdown % 10 >= 4) {
				canvasContext.drawImage(shadowPic, this.x-16, this.y+32);
				canvasContext.drawImage(this.myWarriorPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
			}
			colorRect(this.x,this.y-16, 40,12, "black");
			colorRect(this.x+2,this.y-14, 35, 8, "red");
			colorRect(this.x+2,this.y-14, (this.health/this.maxHealth)*35, 8, "green");

			displayHealthCountdown--;
			if(displayHealthCountdown <= 0){
				this.displayHealth = false;
				displayHealthCountdown = healthCountdownSeconds * 30;
			}
		}
		else {
			canvasContext.drawImage(shadowPic, this.x-16, this.y+32);
			canvasContext.drawImage(this.myWarriorPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
		}

			if(debugMode){


				colorRect(this.x,this.y, 5,5, "white");
				colorRect(this.x,this.y+this.height, 5,5, "white");
				colorRect(this.x+this.width,this.y, 5,5, "white");
				colorRect(this.x+this.width,this.y+this.height, 5,5, "white");

				colorRect(this.centerX,this.centerY, 5, 5, 'white');
			}

		this.mySword.draw(this);

		this.myArrow.draw();

		this.myRock.draw();

		}
	}

function instantCamFollow() {
    camPanX = redWarrior.x - canvas.width/2;
    camPanY = redWarrior.y - canvas.height/2;
}

function cameraFollow() {
    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;

    var playerDistFromCameraFocusX = Math.abs(redWarrior.x-cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(redWarrior.y-cameraFocusCenterY);

    if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      if(cameraFocusCenterX < redWarrior.x)  {
        camPanX += playerMoveSpeed;
      } else {
        camPanX -= playerMoveSpeed;
      }
    }
    if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      if(cameraFocusCenterY < redWarrior.y)  {
        camPanY += playerMoveSpeed;
      } else {
        camPanY -= playerMoveSpeed;
      }
    }

	if(camPanX < 0) {
      camPanX = 0;
    }
    if(camPanY < 0) {
      camPanY = 0;
    }
    var maxPanRight = ROOM_COLS * TILE_W - canvas.width;
    var maxPanTop = ROOM_ROWS * TILE_H - canvas.height;
    if(camPanX > maxPanRight) {
      camPanX = maxPanRight;
    }
    if(camPanY > maxPanTop) {
      camPanY = maxPanTop;
    }
  }


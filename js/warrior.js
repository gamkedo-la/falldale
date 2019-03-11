// TODO: Probably want to set direction per object instead of
//       putting it in a global variable
// this also doesn't allow diagonal movement
var direction = "south";

var healthCountdownSeconds = 5;
var displayHealthCountdown = healthCountdownSeconds * 30;

levelExperienceArray = [500, 2000, 4000, 6000, 10000, 16000, 26000, 42000, 68000]

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
	this.speed = 3.0;
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
		"experienceLevel", "healingPotion", "haveMap", "questOneComplete", "delkonRewardOffer"];

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
		if (gameStarted === false) {
			this.yellowKeysHeld = 0;
			this.greenKeysHeld = 0;
			this.blueKeysHeld = 0;
			this.redKeysHeld = 0;
			this.health = 4;
			this.mySword.reset();
			this.myArrow.reset();
			this.myRock.reset();
		}

		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_PLAYERSTART) {
					roomGrid[arrayIndex] = TILE_ROAD;
					if (gameStarted === false) {
						this.x = eachCol * TILE_W + TILE_W/2;
						this.y = eachRow * TILE_H + TILE_H/2;
						gameStarted = true;
					}
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
		//console.log("No Player Start found!");

	}; // end of warriorRest func

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_WalkNorth) {
			nextY -= this.speed;
			direction = "north";
			this.sx = 0;
			this.sy = 0;
		}
		if(this.keyHeld_WalkSouth) {
			nextY += this.speed;
			direction = "south";
			this.sx = 0;
			this.sy = this.height;
		}
		if(this.keyHeld_WalkWest) {
			nextX -= this.speed;
			direction = "west";
			this.sx = 0;
			this.sy = this.height*2;
		}
		if(this.keyHeld_WalkEast) {
			nextX += this.speed;
			direction = "east";
			this.sx = 0;
			this.sy = this.height*3;
		}

		if(this.keyHeld_WalkNorth || this.keyHeld_WalkSouth || this.keyHeld_WalkWest || this.keyHeld_WalkEast) {
			this.playerMove = true;
		} else {
			this.playerMove = false;
		}
		var tileC = pixelXtoTileCol(nextX);
		var tileR = pixelYtoTileRow(nextY);

		if (tileC <= 0) {
			console.log("Touching left edge of map");
			levelCol --;
			console.log("this.x before is " + this.x);
			this.x = (ROOM_COLS - 3) * TILE_W;
			loadLevel();
			return;
		}

		if (tileR <= 0) {
			console.log("Touching top edge of map");
			levelRow--;
			this.y = (ROOM_ROWS - 3) * TILE_H;
			loadLevel();
			return;
		}

		if (tileC >= ROOM_COLS - 1) {
			console.log("Touching right edge of map");
			levelCol++;
			this.x = TILE_W;
			loadLevel();
			return;
		}

		if (tileR >= ROOM_ROWS - 1) {
			console.log("Touching bottom edge of map");
			levelRow++;
			this.y = TILE_H;
			loadLevel();
			return;
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
				if (debugMode) {
					this.speed = 20.0;
				} else {
					this.speed = 3.0;
				}
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GRASS:
				if (debugMode) {
					this.speed = 20.0;
				} else {
					this.speed = 2.0;
				}
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GRAVE_YARD_PORTAL:
				levelRow = 3;
				levelCol = 1;
				loadLevel();
				break;
			case TILE_HOME_VILLAGE_PORTAL:
				levelRow = 2;
				levelCol = 1;
				loadLevel();
				break;
			case TILE_FOREST_PORTAL:
				levelRow = 3;
				levelCol = 0;
				loadLevel();
				break;
			case TILE_HEALER_FRONTDOOR:
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				setDialogUICountdown(3);
				dialog = "This place smells nice.  Is that lavender?";
				doorSound.play();
				break;
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
     		case TILE_GRAVE_1 || TILE_GRAVE_2 || TILE_GRAVE_3:
				setDialogUICountdown(3);
				dialog = "Too many good people have died from the Skeleton King and his army of the dead.";
				break;
		    case TILE_GRAVE_4:
				setDialogUICountdown(3);
				dialog = "I need to avenge my friend.  The Skeleton King and his army of the dead must be destroyed!.";
				break;
			case TILE_FOUNTAIN:
				setDialogUICountdown(3);
				dialog = "What a beautiful fountain.";
				break;
			case TILE_SPIKES:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.health = this.health - 0.5;
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

		if (this.experience >= levelExperienceArray[this.experienceLevel]){
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

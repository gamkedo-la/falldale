var debugSkipToGame = true;

// Characters //

var canvas, canvasContext;
var framesPerSecond = 30;
var damageUICountdown = 3;//in seconds
var diceWidth = 40;
var diceHeight = 40;
var stateScreenOffsetX, stateScreenOffsetY;
var redWarrior = new warriorClass();
var enemyList = [];
var dialog = "H: Hides health, I: Inventory, O: Stats";
var inventory = " ";
var inventoryScreen = false;
var mapShow = false;
var statsScreen = false;
var scrollBackgroundScreen = true;

// Game States //

var menuScreen = true;
var scrollBackground = false;
var characterCreationScreen = false;
var isInShop = false;
var isAtHealer = false;
var debugMode = false;
var displayHealth = false;
var tileEditor = false;
var gamePaused = false;
var muteInputCycle = 0;
var saveGame = new SaveGame();

// Sounds //

var doorSound = new SoundOverlapsClass("woodDoorOpen");
var keySound = new SoundOverlapsClass("keys");
var spikeSound = new SoundOverlapsClass("spikes");
var zombieHurtSound = new SoundOverlapsClass("zombiehurt");
var goblinHurtSound = new SoundOverlapsClass("goblinDeath");
var skeletonHurtSound = new SoundOverlapsClass("skeletonhurt");
var batHurtSound = new SoundOverlapsClass("bathurt");
var playerHurtSound = new SoundOverlapsClass("playerHurt");
var backgroundMusic = new BackgroundMusicClass();
var meowPurrSound = new SoundOverlapsClass("meow_purr");




var dialogUIVisibilityCountdown = 3;


function resizeCanvas() {
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stateScreenOffsetX = canvas.width/2 - 400;
    stateScreenOffsetY = canvas.height/2 - 300;
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener('focus', function () {gamePaused = false;});
    window.addEventListener('blur', function() {gamePaused = true;})

    resizeCanvas();

    colorRect(0, 0, canvas.width, canvas.height, 'orange'); // startup page
    colorText("Loading Images... please wait", 400, 300, 'black');
    loadImages();
    canvas.addEventListener('mousedown', handleMouseClick);
    backgroundMusic.loopSong("falldale-pub");
}

function imageLoadingDoneSoStartGame() {
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();
    console.log("setupInput should run - Main.js");
    levelNow = 3; // Use this line to skip to level being worked on. 
    loadLevel(levelList[levelNow]);
	if(debugSkipToGame){
		console.log("Debug Mode is on, skip directly to game");
	}
}

function nextLevel() {
    levelNow++;
    if (levelNow > levelList.length) {
        levelNow = 0;
    }
    loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {
    roomGrid = whichLevel.slice();
    redWarrior.reset(warriorPic, "Red warrior");

    enemyList.splice(0, enemyList.length); //Empty enemyList

    var arrayIndex = 0
    for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
            var newEnemy;
            if(roomGrid[arrayIndex] == TILE_BAT) {
                newEnemy = new batClass('Bat');
            } else if(roomGrid[arrayIndex] == TILE_SKELETON) {
                newEnemy = new skeletonClass('Skeleton1', skeletonPic);
			} else if(roomGrid[arrayIndex] == TILE_SKELETON) {
                newEnemy = new skeletonClass('Skeleton2', skeletonPic2);
			} else if(roomGrid[arrayIndex] == TILE_SKELETON) {
                newEnemy = new skeletonClass('Skeleton3', skeletonPic3);
            } else if(roomGrid[arrayIndex] == TILE_ZOMBIE) {
                newEnemy = new zombieClass('Zombie', zombiePic);
            } else if(roomGrid[arrayIndex] == TILE_ZOMBIE2) {
                newEnemy = new zombieClass('Zombie2', zombiePic2);
			} else if(roomGrid[arrayIndex] == TILE_ZOMBIE3) {
                newEnemy = new zombieClass('Zombie3', zombiePic3);
			} else if(roomGrid[arrayIndex] == TILE_GOBLIN) {
                newEnemy = new goblinClass('Goblin');
            } else if(roomGrid[arrayIndex] == TILE_GREEN_ORC_SWORD) {
                newEnemy = new orcClass('Orc - Sword', orcPic);
			} else if(roomGrid[arrayIndex] == TILE_GREEN_ORC_CLUB) {
                newEnemy = new orcClass('Orc - Club2', orcPic2);
			} else if(roomGrid[arrayIndex] == TILE_GREEN_ORC_AX) {
                newEnemy = new orcClass('Orc - Ax', orcPic3);
            } else if(roomGrid[arrayIndex] == TILE_ARCHER) {
                newEnemy = new archerClass('Archer');
			} else if(roomGrid[arrayIndex] == TILE_DRUID) {
                newEnemy = new druidClass('Druid', druidPic);
            } else if(roomGrid[arrayIndex] == TILE_ADDY) {   // NPC
                newEnemy = new npcClass('Addy', addyPic );
			} else if(roomGrid[arrayIndex] == TILE_DELKON) {   // NPC
                newEnemy = new npcClass('Delkon', delkonPic);
			} else if(roomGrid[arrayIndex] == TILE_DODD) {   // NPC
                newEnemy = new npcClass('Dodd', doddPic);
			} else if(roomGrid[arrayIndex] == TILE_FENTON) {   // NPC
                newEnemy = new npcClass('Fenton', fentonPic);
			} else if(roomGrid[arrayIndex] == TILE_GABRIEL) {   // NPC
                newEnemy = new npcClass('Gabriel', gabrielPic);
                newEnemy.patrolPoints = [157, 73, 74, 138];//index of tiles Gabriel cycles through, Not working yet
			} else if(roomGrid[arrayIndex] == TILE_HEALER) {   // NPC
                newEnemy = new npcClass('Healer', healerPic);
			} else if(roomGrid[arrayIndex] == TILE_PRINCESS) {   // NPC
                newEnemy = new npcClass('Princess', princessPic);
			} else if(roomGrid[arrayIndex] == TILE_SHOPKEEPER) {   // NPC
                newEnemy = new npcClass('Shop Keeper', shopkeeperPic);
			} else if(roomGrid[arrayIndex] == TILE_TARAN) {   // NPC
                newEnemy = new npcClass('Taran', taranPic);
			} else if(roomGrid[arrayIndex] == TILE_CAT) {   // NPC
                newEnemy = new npcClass('Fido', catPic);
                newEnemy.numberOfFrames = 6; // six frame walk cycle
                newEnemy.patrolPoints = [4, 6, 10, 6]; // sidewalk near your house
			} else {
                arrayIndex++;
                continue;//Don't reset or add to enemyList if no enemy tile found
            }
            resetX = eachCol * TILE_W + TILE_W/2;
            resetY = eachRow * TILE_H + TILE_H/2;
            newEnemy.reset(resetX, resetY);
            enemyList.push(newEnemy);
			console.log(enemyList);
            roomGrid[arrayIndex] = TILE_ROAD;
            arrayIndex++;
        } //end of col for
    } // end of row for
}

function updateAll() {
	moveAll();
	updateItems();
    drawAll();
}

function moveAll() {

    if (menuScreen || isAtHealer || tileEditor || gamePaused) {
        // no movement
    } else if (gamePaused == false) {
        redWarrior.move();
        for (var i=0; i< enemyList.length; i++) {
            enemyList[i].move();
            if (enemyList[i].health > 0) {
                redWarrior.checkWarriorandWeaponCollisionAgainst(enemyList[i]);
            } 
        }
		cameraFollow();
    };
};

function updateItems(){
	heartsReadyToRemove();
	removeHearts();
	goldReadyToRemove();
	removegold();
	healingPotionReadyToRemove();
	removeHealingPotion();
}



function health() {

    if (redWarrior.health <= 0) {
        resetLevel();
    }
}

function messageDraw() {

	dialogUIVisibilityCountdown--;
	displayMessage();
}

function setDialogUICountdown(seconds) {
	dialogUIVisibilityCountdown = seconds * 30; // 30fps
}

function displayMessage() {

	colorRect(0, canvas.height - 50, canvas.width, 50, "black");
	colorRect(5, canvas.height - 45, canvas.width - 10, 40, "white");

    if (dialogUIVisibilityCountdown <= 0) {
		return;
	} else {
		colorText(dialog, 20, canvas.height - 20, "Black");
	}
}

function damageDraw() {
    var sx = 0;
    var sy = 0;
    damageUIVisibilityCountdown--;

    if (damageUIVisibilityCountdown <= 0) {
        return;
    } else {
        sx = (displayDamagePoints-1) * diceWidth;
        if(redWarrior.recentWeapon == redWarrior.myRock) {
            sy = diceHeight;
        }
    }

    if(redWarrior.recentWeapon.toHitPoints > 0) {
        colorText("Attack", canvas.width - 230, canvas.height - 32, "Black");
        colorText("Roll", canvas.width - 230, canvas.height - 12, "Black");
        canvasContext.drawImage(twentySidedDicePic , canvas.width-170,canvas.height-40, 30, 30);
        colorText(redWarrior.recentWeapon.toHitPoints, canvas.width - 162, canvas.height - 20, "Black");

        if (redWarrior.recentWeapon.toHitPoints > 10) { /////////  eventually would like to incorporate armor and weapon to determine if a hit is done.... for now, greater than 10. //////
            colorText("Damage", canvas.width - 120, canvas.height - 32, "Black");
            colorText("Roll", canvas.width - 120, canvas.height - 12, "Black");
            canvasContext.drawImage(dicePic, sx, sy, diceWidth, diceHeight, canvas.width - 50, canvas.height - 40, 30, 30);
        }
    }
}

function inventoryDraw() {
    colorRect(canvas.width - 200, canvas.height - 200, 200, 150, "black");
    colorRect(canvas.width - 195, canvas.height - 195, 190, 140, "white");
    colorText("Arrows: " + redWarrior.myArrow.arrowQuantity, canvas.width - 170, canvas.height - 180, "Black");
    colorText("Rocks: " + redWarrior.myRock.rockQuantity, canvas.width - 170, canvas.height - 160, "Black");
    colorText("Gold Pieces: " + redWarrior.goldpieces, canvas.width - 170, canvas.height - 140, "Black");
    colorText("Yellow Keys: " + redWarrior.yellowKeysHeld, canvas.width - 170, canvas.height - 120, "Black");
    colorText("Red Keys: " + redWarrior.redKeysHeld, canvas.width - 170, canvas.height - 100, "Black");
    colorText("Blue Keys: " + redWarrior.blueKeysHeld, canvas.width - 170, canvas.height - 80, "Black");
    colorText("Green Keys: " + redWarrior.greenKeysHeld, canvas.width - 170, canvas.height - 60, "Black");
}

function mapDraw() {
    let maxScreenLength = canvas.width < canvas.height ? canvas.width : canvas.height;
    let mapLength = maxScreenLength * 0.8;
    let mapPosX = (canvas.width - mapLength) / 2;
    let mapPosY = (canvas.height - mapLength) / 2;
    colorRect(0,0, canvas.width,canvas.height, "rgba(0,0,0,0.7)");
    canvasContext.drawImage(falldaleMap, mapPosX, mapPosY, mapLength, mapLength); // temp map
}

function statsDraw() {
    colorRect(canvas.width - 210, canvas.height - 320, 210, 270, "black");
    colorRect(canvas.width - 205, canvas.height - 315, 200, 265, "white");
    colorText("Experience Level: " + redWarrior.experienceLevel, canvas.width - 190, canvas.height - 300, "Black");
    colorText("Level Up at: " + redWarrior.experienceLevel, canvas.width - 190, canvas.height - 280, "Black");
    colorText("Armor Class: " + redWarrior.armor, canvas.width - 190, canvas.height - 260, "Black");
    colorText("Hit Point: " + redWarrior.health, canvas.width - 190, canvas.height - 240, "Black");
    colorText("Experience: " + redWarrior.experience, canvas.width - 190, canvas.height - 220, "Black");
    colorText("Max Sword Damage: " + redWarrior.mySword.damageDice, canvas.width - 190, canvas.height - 200, "Black");
    colorText("Max Arrow Damage: " + redWarrior.myArrow.damage, canvas.width - 190, canvas.height - 180, "Black");
    colorText("Max Stone Damage: " + redWarrior.myRock.damage, canvas.width - 190, canvas.height - 160, "Black");
    colorText("STR: " + redWarrior.strength + "     DEX: " + redWarrior.dexterity, canvas.width - 190, canvas.height - 120, "Black");
    colorText("CON: " + redWarrior.constitution + "     INT: " + redWarrior.intelligence, canvas.width - 190, canvas.height - 100, "Black");
    colorText("WIS: " + redWarrior.wisdom + "     CHA: " + redWarrior.charisma, canvas.width - 190, canvas.height - 80, "Black");
}

function drawMenuScreen() {
    canvasContext.save();
    canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
    canvasContext.drawImage(titlepagePic, 0, 0); // blanks out the screen
    canvasContext.font = "30px Georgia";
    colorText("Falldale", 120, 100, "white");
    canvasContext.font = "20px Georgia";
    colorText("", 170, 150, "white");
    colorText("", 170, 200, "white");
    colorText("", 170, 225, "white");
    colorText("Click to start to begin", 170, 255, "white");
    canvasContext.font = "15px Georgia";
    colorText("Move Left - Left Arrow", 170, 300, "white");
    colorText("Move Down - Down Arrow", 170, 325, "white");
    colorText("Move Right - Right Arrow", 170, 350, "white");
    colorText("Move Up - Up Arrow", 170, 375, "white");
    colorText("Sword Attack - Space bar", 170, 400, "white");
    canvasContext.restore();
}


function drawAll() {
    if (menuScreen) {
        drawMenuScreen();
		if(debugSkipToGame){
			handleMouseClick(null);
		}
	} else if (isInShop) {
        drawShop();
    } else if (isAtHealer) {
        drawHealerShop();
    } else if (characterCreationScreen) {
        //if(redWarrior.strength == 0){
        drawCreationScreen(strength);
        drawDice(Dice1);
        drawDice(Dice2);
        drawDice(Dice3);
		if(debugSkipToGame){
			characterCreationScreenInput(KEY_SPACEBAR);
			characterCreationScreenInput(ENTER);
		}
        //}
    } else if (scrollBackgroundScreen) {
        drawScrollNarrative();
		if(debugSkipToGame){
			scrollBackgroundScreenInput(KEY_SPACEBAR);
		}
	} else if (tileEditor) {
        drawEditorMode();
    } else {
        colorRect(0,0, canvas.width, canvas.height, "#008000"); // fill areas not covered by room on wide displays
        canvasContext.save();
        canvasContext.translate(-camPanX, -camPanY);
        //drawOnlyTilesOnScreen();
        //drawRoom(true,false); // draw floors only
        drawRoom(true,true); // draw all level tiles
        for (var i=0; i<enemyList.length; i++) {
            enemyList[i].draw();
        }
		for (var i=0; i<heartsList.length; i++) {
            heartsList[i].draw();
        }
		for (var i=0; i<healingPotionList.length; i++) {
            healingPotionList[i].draw();
        }
		for (var i=0; i<goldList.length; i++) {
            goldList[i].draw();
        }
        //drawRoom(false,true); // draw all non floors
        redWarrior.draw();
        drawRooftops();
        OverlayFX.draw(); // night mode, light glows, detail decals, footsteps etc
        canvasContext.restore();
        health();
        messageDraw();
        damageDraw();
		if(muteAudio){
			canvasContext.drawImage(muteAudioPic, 20, 20);
		}
        if (inventoryScreen) {
            inventoryDraw();
        }
        if (statsScreen) {
            statsDraw();
        }
        if (mapShow) {
            mapDraw();
        }
		if (gamePaused) {
            colorRect(0,0, canvas.width, canvas.height, "rgba(0,0,0,0.8");
            colorRect(canvas.width/2-150, canvas.height/2-75, 300, 4, "rgba(255,255,255,0.7)");
            colorRect(canvas.width/2-150, canvas.height/2+50, 300, 4, "rgba(255,255,255,0.7 )");
            drawTextWithShadowCentered("Game Paused", canvas.width/2, canvas.height/2-20, "white", "20px endorregular");
            drawTextWithShadowCentered("Press 'P' to resume", canvas.width/2, canvas.height/2+15, "white", "12px endorregular");
        }
    }
}

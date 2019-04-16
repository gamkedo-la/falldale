var debugSkipToGame = true;

// Characters //

var canvas, canvasContext;
var minimapCanvas, minimapContext;
const FRAMES_PER_SECOND = 30;
var frameCounter = 0;
var damageUICountdown = 3;//in seconds
var diceWidth = 40;
var diceHeight = 40;
var stateScreenOffsetX, stateScreenOffsetY;
var camera;
var redWarrior = new warriorClass();
var enemyList = [];
var tileList = [];
var particleList = [];
const dialogManager = new DialogManager();
dialogManager.setDialogWithCountdown("H: Hides health, I: Inventory, O: Stats", 3);
var inventory = " ";
var inventoryScreen = false;
var mapShow = false;
var statsScreen = false;
var scrollBackgroundScreen = true;

// Game States //

var menuScreen = true;
var scrollBackground = false;
var characterCreationScreen = false;
var characterSelectionScreen = false;
var isInShop = false;
var isAtHealer = false;
var questCompletionScreenActive = false;
var debugMode = false;
var displayHealth = false;
var tileEditor = false;
var gamePaused = false;
var muteInputCycle = 0;
var saveGame = new SaveGame();
var continueGame = false;

// Sounds //

var backgroundMusic = new BackgroundMusicClass("goblinRaid");
var doorSound = new SoundOverlapsClass("woodDoorOpen");
var keySound = new SoundOverlapsClass("keys");
var spikeSound = new SoundOverlapsClass("spikes");
var zombieHurtSound = new SoundOverlapsClass("zombiehurt");
var zombieAlertSound = new SoundOverlapsClass("zombieAlert");
var goblinHurtSound = new SoundOverlapsClass("goblinDeath");
var skeletonHurtSound = new SoundOverlapsClass("skeletonhurt");
var batHurtSound = new SoundOverlapsClass("bathurt");
var playerHurtSound = new SoundOverlapsClass("playerHurt");
var bugbearHurtSound = new SoundOverlapsClass("bugbearHurt");
var arrowShotSound = new SoundOverlapsClass("arrowShot");
var swordSwingSound = new SoundOverlapsClass("swordSwing");
var rockThrowSound1 = new SoundOverlapsClass("rock1");
var rockThrowSound2 = new SoundOverlapsClass("rock2");
var rockThrowSound3 = new SoundOverlapsClass("rock3");
var meowPurrSound = new SoundOverlapsClass("meow_purr");
var humanMaleHello = new SoundOverlapsClass("humanMaleHello");
var humanMaleHi = new SoundOverlapsClass("humanMaleHi");
var humanMaleHi2 = new SoundOverlapsClass("humanMaleHi2");
var humanMaleHi3 = new SoundOverlapsClass("humanMaleHi3");
var humanMaleHi4 = new SoundOverlapsClass("humanMaleHi4");
var humanMaleGoodDay = new SoundOverlapsClass("humanMaleGoodDay");
var humanMaleWelcome = new SoundOverlapsClass("humanMaleWelcome");
var humanMaleGoodAfternoon = new SoundOverlapsClass("humanMaleGoodAfternoon");
var humanFemaleHello = new SoundOverlapsClass("humanFemaleHello");
var humanFemaleHi = new SoundOverlapsClass("humanFemaleHi");

const DIALOG_BOX_HEIGHT = 50;


//var dialogUIVisibilityCountdown = 3;


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stateScreenOffsetX = canvas.width/2 - 400;
    stateScreenOffsetY = canvas.height/2 - 300;
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
	minimapCanvas = document.createElement('canvas');
    canvasContext = canvas.getContext('2d');
	minimapContext = minimapCanvas.getContext('2d');
	minimapCanvas.width = ROOM_COLS*4;
	minimapCanvas.height = ROOM_ROWS*4;
	
	minimapContext.fillStyle = 'red';
	minimapContext.fillRect(0,0, minimapCanvas.width, minimapCanvas.height);
	
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener('focus', function () {gamePaused = false;});
    window.addEventListener('blur', function() {gamePaused = true;});

    resizeCanvas();
    camera = new Camera();

    colorRect(0, 0, canvas.width, canvas.height, 'orange'); // startup page
    colorText("Loading Images... please wait", 400, 300, 'black');
    loadImages();
    canvas.addEventListener('mousedown', handleMouseClick);
    backgroundMusic.loopSong("goblinRaid");
};

function imageLoadingDoneSoStartGame() {
    setInterval(updateAll, 1000 / FRAMES_PER_SECOND);

    setupInput();
    console.log("setupInput should run - Main.js");
	OverlayFX.nightMode = true;
    // levelNow = 3; // Use this line to skip to level being worked on.
    if (continueGame === false) {
        redWarrior.initialize("Red warrior");
    } else {
        saveGame.loadData();
    }
    loadLevel();
    if(debugSkipToGame){
        console.log("Debug Mode is on, skip directly to game");
    }
}

function backgroundMusicSelect(){
	var musicLevel = levelNow;
	switch(musicLevel){
		case 1:
		    backgroundMusic.loopSong("woodsbgm")			
			break;
		case 2:
		    backgroundMusic.loopSong("woodsbgm");
			break;
		case 3:
		    backgroundMusic.loopSong("woodsbgm")
			break;
		case 4:
			backgroundMusic.loopSong("woodsbgm");
			break;
		case 5:
			backgroundMusic.loopSong("woodsbgm")
			break;
		case 6:
		    backgroundMusic.loopSong("woodsbgm");
			break;
		case 7:
			if(redWarrior.questOneComplete){
				backgroundMusic.loopSong("have-a-nice-beer");
			} else {
				backgroundMusic.loopSong("goblinRaid");
			}
			break;
		case 8:
		    backgroundMusic.loopSong("woodsbgm")
			break;
		case 9:
		    backgroundMusic.loopSong("woodsbgm")
			break;
		case 10:
		    backgroundMusic.loopSong("woodsbgm");
			break;
		case 12:
		    backgroundMusic.loopSong("woodsbgm");
			break;
	}
}

function loadLevel() {
    recalulateLevelNow();
    var whichLevel = levelList[levelNow];
    roomGrid = whichLevel.slice();
    enemyList.splice(0, enemyList.length); //Empty enemyList
    tileList.splice(0, tileList.length); //Empty tileList
	backgroundMusicSelect();
	
    var arrayIndex = 0;
    for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
            var newEnemy;
            var newTile;
            if(roomGrid[arrayIndex] == TILE_BAT) {
                newEnemy = new batClass();
				newEnemy.initialize("bat", batPic, 4);
            } else if(roomGrid[arrayIndex] == TILE_SKELETON) {
                newEnemy = new skeletonClass('Skeleton1', skeletonPic, 4);
            } else if(roomGrid[arrayIndex] == TILE_SKELETON) {
                newEnemy = new skeletonClass('Skeleton2', skeletonPic2, 6);
            } else if(roomGrid[arrayIndex] == TILE_SKELETON) {
                newEnemy = new skeletonClass('Skeleton3', skeletonPic3, 6);
            } else if(roomGrid[arrayIndex] == TILE_ZOMBIE) {
                newEnemy = new zombieClass();
				newEnemy.initialize('Zombie', zombiePic, 4);
            } else if(roomGrid[arrayIndex] == TILE_ZOMBIE2) {
                newEnemy = new zombieClass();
				newEnemy.initialize('Zombie2', zombiePic2, 6);
            } else if(roomGrid[arrayIndex] == TILE_ZOMBIE3) {
                newEnemy = new zombieClass();
				newEnemy.initialize('Zombie3', zombiePic3, 6);
            } else if(roomGrid[arrayIndex] == TILE_GOBLIN) {
                newEnemy = new goblinClass();
				newEnemy.initialize('Goblin', goblinPic, 6);
            } else if(roomGrid[arrayIndex] == TILE_GREEN_ORC_SWORD) {
                newEnemy = new orcClass();
				newEnemy.initialize('Orc - Sword', orcPic, 6);
            } else if(roomGrid[arrayIndex] == TILE_GREEN_ORC_CLUB) {
                newEnemy = new orcClass();
				newEnemy.initialize('Orc - Club2', orcPic2, 4);
            } else if(roomGrid[arrayIndex] == TILE_GREEN_ORC_AX) {
                newEnemy = new orcClass();
				newEnemy.initialize('Orc - Ax', orcPic3, 4);
            } else if(roomGrid[arrayIndex] == TILE_ARCHER) {
                newEnemy = new archerClass();
				newEnemy.initialize('Archer', archerPic3, 4);
            } else if(roomGrid[arrayIndex] == TILE_BULLYWUG) {
                newEnemy = new bullywugClass();
				newEnemy.initialize('Bullywug', bullywugPic, 0);
            } else if(roomGrid[arrayIndex] == TILE_DRUID) {
                newEnemy = new druidClass();
				newEnemy.initialize('Druid', druidPic, 1);
			} else if(roomGrid[arrayIndex] == TILE_ORCBOSS) {
                newEnemy = new orcBossClass();
				newEnemy.initialize('Orc Boss', orcBossPic, 1);
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
            } else if(roomGrid[arrayIndex] == TILE_ARYA) {   // NPC
                newEnemy = new npcClass('Arya', aryaPic);
            } else if(roomGrid[arrayIndex] == TILE_LAWRENCE) {   // NPC
                newEnemy = new npcClass('Lawrence', lawrencePic);
			} else if(roomGrid[arrayIndex] == TILE_ROWAN) {   // NPC
                newEnemy = new npcClass('Rowan', rowanPic);
			} else if(roomGrid[arrayIndex] == TILE_TARAN) {   // NPC
                newEnemy = new npcClass('Taran', taranPic);
			} else if(roomGrid[arrayIndex] == TILE_CAT) {   // NPC
                newEnemy = new npcClass('Fido', catPic);
                newEnemy.numberOfFrames = 6; // six frame walk cycle
                newEnemy.patrolPoints = [4, 6, 10, 6]; // sidewalk near your house
                newEnemy.spriteSheetRows = 2; // to allow flipping
            } else {
                newTile = new TileObject(arrayIndex);

                if(tileTypeHasTransparency(newTile.type)) {
                    newTile.setNewType(TILE_ROAD);
                    tileList.push(newTile)
                    newTile = new TileObject(arrayIndex);
                } else if(tileTypeHasGrassTransparency(newTile.type)) {
                    newTile.setNewType(TILE_GRASS);
                    tileList.push(newTile)
                    newTile = new TileObject(arrayIndex);
                }

                tileList.push(newTile);
                arrayIndex++;
                continue;//Don't reset or add to enemyList if no enemy tile found
            }
            resetX = eachCol * TILE_W + TILE_W/2;
            resetY = eachRow * TILE_H + TILE_H/2;
            newEnemy.reset(resetX, resetY);
            enemyList.push(newEnemy);
            roomGrid[arrayIndex] = TILE_ROAD;
            tileList.push(new TileObject(arrayIndex));
            arrayIndex++;
        } //end of col for
    } // end of row for
	redrawMinimapTiles();
}

function updateAll() {
    moveAll();
    updateItems();
    drawAll();
}

function moveAll() {

    if (menuScreen || isAtHealer || tileEditor || gamePaused) {
        // no movement
    } else if (!gamePaused) {
        redWarrior.move();
		updateParticles();
        for (var i=0; i< enemyList.length; i++) {
            enemyList[i].move();
            if (enemyList[i].health > 0) {
                redWarrior.checkWarriorandWeaponCollisionAgainst(enemyList[i]);
            }
        }
        camera.follow(redWarrior);
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
		redWarrior.death();
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
    colorText("Arrows: " + redWarrior.myArrow.quantity, canvas.width - 170, canvas.height - 180, "Black");
    colorText("Rocks: " + redWarrior.myRock.quantity, canvas.width - 170, canvas.height - 160, "Black");
    colorText("Gold Pieces: " + redWarrior.goldpieces, canvas.width - 170, canvas.height - 140, "Black");
    colorText("Yellow Keys: " + redWarrior.yellowKeysHeld, canvas.width - 170, canvas.height - 120, "Black");
    colorText("Red Keys: " + redWarrior.redKeysHeld, canvas.width - 170, canvas.height - 100, "Black");
    colorText("Blue Keys: " + redWarrior.blueKeysHeld, canvas.width - 170, canvas.height - 80, "Black");
    colorText("Green Keys: " + redWarrior.greenKeysHeld, canvas.width - 170, canvas.height - 60, "Black");
}

function miniMapDraw() {
    const distFromEdge = 30;
    const width = 180;
    const height = 180;
    const posX = canvas.width - width - distFromEdge;
    const posY = distFromEdge;
    drawMiniMap(posX,posY, width,height, 4);
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

function depthSortedDraw() {
    let tilesOnscreen = tileList.filter(
        tile => camera.canShow(tile.x, tile.y, tile.width, tile.height)
    );

    let floorTiles = tilesOnscreen.filter(
        tile => tileIsAFloor(tile.type)
    );

    let objectsToDraw = tilesOnscreen.filter(
        tile => (!tileIsAFloor(tile.type))
    );

    let visibleEnemies = enemyList.filter(
        enemy => camera.canShow(enemy.x, enemy.y, enemy.width, enemy.height)
    );

    let flyingEnemies = visibleEnemies.filter(
        enemy => (enemy.isFlying)
    );

    objectsToDraw = objectsToDraw.concat(visibleEnemies.filter(
        enemy => (!enemy.isFlying)
    ));

    objectsToDraw = objectsToDraw.concat(heartsList.filter(
        heart => camera.canShow(heart.x, heart.y, heart.width, heart.height)
    ));

    objectsToDraw = objectsToDraw.concat(healingPotionList.filter(
        potion => camera.canShow(potion.x, potion.y, potion.width, potion.height)
    ));

    objectsToDraw = objectsToDraw.concat(goldList.filter(
        gold => camera.canShow(gold.x, gold.y, gold.width, gold.height)
    ));

    objectsToDraw.push(redWarrior);

    objectsToDraw.sort(
        function(a, b) {return ((a.y + a.height) - (b.y + b.height));}
    );

    for(let i = 0; i < floorTiles.length; i++) {
        floorTiles[i].draw();
    }

    OverlayFX.draw(); // grass, pebbles, cracks, flowers, night mode

    for(let i = 0; i < objectsToDraw.length; i++) {
        objectsToDraw[i].draw();
    }

    for(let i = 0; i < flyingEnemies.length; i++) {
        flyingEnemies[i].draw();
    }
}

function drawAll() {
    frameCounter++;
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
        drawCreationScreen(strength);
        drawDice(Dice1);
        drawDice(Dice2);
        drawDice(Dice3);
        if(debugSkipToGame){
            characterCreationScreenInput(KEY_SPACEBAR);
            characterCreationScreenInput(ENTER);
        }
	} else if (characterSelectionScreen) {
		drawSelectorScreen();
        if(debugSkipToGame){
            characterSelectorScreenInput(ENTER);
        }
    } else if (scrollBackgroundScreen) {
        drawScrollNarrative();
        if(debugSkipToGame){
            scrollBackgroundScreenInput(KEY_SPACEBAR);
        }
    } else if (tileEditor) {
        drawEditorMode();
	} else if (questCompletionScreenActive) {
        drawQuestOneCompletionScreen();	
    } else {
        colorRect(0,0, canvas.width, canvas.height, "#008000"); // fill areas not covered by room on wide displays
        canvasContext.save();
        canvasContext.translate(-camera.x, -camera.y);

        depthSortedDraw();

        // FIXME these fx are Falldale-only right now
        // it would be nice if they also were on all game regions
        if (levelNow == 7) { //7=fallDale??? elsewhere it is listed as 0 FIXME
            drawRooftops(fallDaleRooftops); // FIXME: hardcoded for main town area only
            // this is now rendered inside depthSortedDraw right after floor tiles
            //OverlayFX.draw(); // night mode, light glows, detail decals, footsteps etc
        } else if (levelNow == 0){
			drawRooftops(orcBossForestRoofTops);
		} else if (levelNow == 6){
			drawRooftops(forestRoofTops);
		}
		drawParticles();
		canvasContext.restore();
		if(redWarrior.questOneActive) {
			colorText(goblinsKilledInFallDale + " out of the 10 Goblins killed in Falldale.", 10, 20, "red");
		}
		if(redWarrior.questTwoActive){
			colorText(goblinsKilledInForest + " out of the 10 Goblins killed in the forest.", 10, 20, "red");
			colorText(orcsKilledInForest + " out of the 10 Orcs killed in the forest.", 10, 40, "red");
		}
        health();
        dialogManager.drawDialog();
//        messageDraw();
        damageDraw();
        //canvasContext.drawImage(minimapCanvas, canvas.width-minimapCanvas.width-20, 20);
		miniMapDraw();

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

// Characters //

var canvas, canvasContext;
var redWarrior = new warriorClass();
var bat1 = new batClass("Bat Carlos");
var bat2 = new batClass("Bat Anely");
var skeleton = new skeletonClass("Skeleton Greg");
var skeleton2 = new skeletonClass("Skeleton Keith");
var zombie = new zombieClass("Zombie Mike");
var zombie2 = new zombieClass("Zombie Bob");
var goblin = new goblinClass("Goblin Vince");
var archer = new archerClass("Archer Kevin", archerPic);
var archer2 = new archerClass("Archer Aaron", archerPic);
var dialog = " ";
var inventory = " ";
var inventoryScreen = false;
var statsScreen = false;

// Game States //

var menuScreen = true;
var characterCreationScreen = false;
var isInShop = false;
var debugMode = false;
var displayHealth = true;
var tileEditor = false;

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


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0, canvas.width, canvas.height, 'orange'); // startup page
    colorText("Loading Images... please wait", 400, 300, 'black');
    loadImages();
    canvas.addEventListener('mousedown', handleMouseClick);
    backgroundMusic.loopSong("dungeonbackground");
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();

    loadLevel(levelOne);

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
    skeleton.reset(skeletonPic);
    skeleton2.reset(skeletonPic);
    zombie.reset(zombiePic);
    zombie2.reset(zombiePic);
    bat1.reset(batPic);
    bat2.reset(batPic);
    goblin.reset(goblinPic);
    archer.reset(archerPic);
    archer2.reset(archerPic);
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    if (menuScreen) {
        // no movement
    } else if (isInShop) {
        // no movement
    } else if (tileEditor) {

    } else {
        redWarrior.move();
        bat1.move();
        bat2.move();
        skeleton.move();
        skeleton2.move();
        zombie.move();
        zombie2.move();
        goblin.move();
        archer.move();
        archer2.move();
        if (bat1.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(bat1);
        }
        if (bat2.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(bat2);
        }
        if (skeleton.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(skeleton);
        }
        if (skeleton2.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(skeleton2);
        }
        if (zombie.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(zombie);
        }
        if (zombie2.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(zombie2);
        }
        if (goblin.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(goblin);
        }
        if (archer.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(archer);
        }
        if (archer2.health > 0) {
            redWarrior.checkWarriorandSwordCollisionAgainst(archer2);
        }

        cameraFollow();
    };
};

function health() {

    if (redWarrior.health <= 0) {
        resetLevel();
    }
}

function messageDraw() {
    colorRect(0, canvas.height - 50, canvas.width, 50, "black");
    colorRect(5, canvas.height - 45, canvas.width - 10, 40, "white");
    colorText(dialog, 20, canvas.height - 20, "Black");
}

function damageDraw() {
    var sx = 0;

    if (displayDamangePoints == 1) {
        sx = 0;
    } else if (displayDamangePoints == 2) {
        sx = 40;
    } else if (displayDamangePoints == 3) {
        sx = 80;
    } else if (displayDamangePoints == 4) {
        sx = 120;
    } else if (displayDamangePoints == 5) {
        sx = 160;
    } else if (displayDamangePoints == 6) {
        sx = 200;
    }

    if (redWarrior.mySword.toHitPoints > 0) {
        colorText("Attack", canvas.width - 230, canvas.height - 32, "Black");
        colorText("Roll", canvas.width - 230, canvas.height - 12, "Black");
        //canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width-170,canvas.height-40, 30, 30);
        colorText(redWarrior.mySword.toHitPoints, canvas.width - 180, canvas.height - 12, "Black");

        if (redWarrior.mySword.toHitPoints > 10) { /////////  eventually would like to incorporate armor and weapon to determine if a hit is done.... for now, greater than 10. //////
            colorText("Damage", canvas.width - 120, canvas.height - 32, "Black");
            colorText("Roll", canvas.width - 120, canvas.height - 12, "Black");
            canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width - 50, canvas.height - 40, 30, 30);
        } else {
            colorRect(canvas.width - 120, canvas.height - 40, 115, 35, "white");
        }
    }
}

function inventoryDraw() {
    colorRect(canvas.width - 200, canvas.height - 200, 200, 150, "black");
    colorRect(canvas.width - 195, canvas.height - 195, 190, 140, "white");
    colorText("Arrows: " + redWarrior.myArrow.arrowQuantity, canvas.width - 180, canvas.height - 180, "Black");
    colorText("Rocks: " + redWarrior.myRock.rockQuantity, canvas.width - 180, canvas.height - 160, "Black");
    colorText("Gold Pieces: " + redWarrior.goldpieces, canvas.width - 180, canvas.height - 140, "Black");
    colorText("Yellow Keys: " + redWarrior.yellowKeysHeld, canvas.width - 180, canvas.height - 120, "Black");
    colorText("Red Keys: " + redWarrior.redKeysHeld, canvas.width - 180, canvas.height - 100, "Black");
    colorText("Blue Keys: " + redWarrior.blueKeysHeld, canvas.width - 180, canvas.height - 80, "Black");
    colorText("Green Keys: " + redWarrior.greenKeysHeld, canvas.width - 180, canvas.height - 60, "Black");
}

function statsDraw() {
    colorRect(canvas.width - 200, canvas.height - 380, 200, 330, "black");
    colorRect(canvas.width - 195, canvas.height - 375, 190, 320, "white");
    colorText("Experience Level: " + redWarrior.experienceLevel, canvas.width - 180, canvas.height - 300, "Black");
    colorText("Level Up at: " + redWarrior.experienceLevel, canvas.width - 180, canvas.height - 280, "Black");
    colorText("Armor Class: " + redWarrior.armor, canvas.width - 180, canvas.height - 260, "Black");
    colorText("Hit Point: " + redWarrior.health, canvas.width - 180, canvas.height - 240, "Black");
    colorText("Experience: " + redWarrior.experience, canvas.width - 180, canvas.height - 220, "Black");
    colorText("Max Sword Damage: " + redWarrior.mySword.damageDice, canvas.width - 180, canvas.height - 200, "Black");
    colorText("Max Arrow Damage: " + redWarrior.myArrow.damage, canvas.width - 180, canvas.height - 180, "Black");
    colorText("Max Stone Damage: " + redWarrior.myRock.damage, canvas.width - 180, canvas.height - 160, "Black");
    colorText("STR: " + redWarrior.strength + "     DEX: " + redWarrior.dexterity, canvas.width - 180, canvas.height - 120, "Black");
    colorText("CON: " + redWarrior.constitution + "     INT: " + redWarrior.intelligence, canvas.width - 180, canvas.height - 100, "Black");
    colorText("WIS: " + redWarrior.wisdom + "     CHA: " + redWarrior.charisma, canvas.width - 180, canvas.height - 80, "Black");
}


function drawAll() {
    if (menuScreen) {
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
    } else if (isInShop) {
        drawShop();
    } else if (characterCreationScreen) {
        //if(redWarrior.strength == 0){			
        drawCreationScreen(strength);
        drawDice(Dice1);
        drawDice(Dice2);
        drawDice(Dice3);
        //}
    } else if (tileEditor) {
        drawEditorMood();
    } else {
        canvasContext.save();
        canvasContext.translate(-camPanX, -camPanY);
        drawRoom();
        //drawOnlyTilesOnScreen();
        redWarrior.draw();
        bat1.draw();
        bat2.draw();
        skeleton.draw();
        skeleton2.draw();
        zombie.draw();
        zombie2.draw();
        goblin.draw();
        archer.draw();
        archer2.draw();
        canvasContext.restore();
        health();
        messageDraw();
        damageDraw();
        if (inventoryScreen) {
            inventoryDraw();
        }
        if (statsScreen) {
            statsDraw();
        }
    }
}
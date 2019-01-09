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

// Game State //

var menuScreen = true;
var isInShop = false;
var debugMode = false;

// Sound //

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
	
	colorRect(0,0, canvas.width,canvas.height, 'orange'); // startup page
	colorText("Loading Images... please wait", 400, 300, 'black');	
	loadImages();
	canvas.addEventListener('mousedown',handleMouseClick);
	backgroundMusic.loopSong("dungeonbackground");
}

function imageLoadingDoneSoStartGame() {	
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	setupInput();
	
	loadLevel(levelOne);

}

function nextLevel() {
	levelNow++;
	if(levelNow > levelList.length) {
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
	if(menuScreen){
		// no movement
	} else if (isInShop){
		
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
		if(bat1.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(bat1);
		}
		if(bat2.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(bat2);
		}
		if(skeleton.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(skeleton);
		}
		if(skeleton2.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(skeleton2);
		}
		if(zombie.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(zombie);
		}
		if(zombie2.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(zombie2);
		}
		if(goblin.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(goblin);
		}
		if(archer.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(archer);
		}
		if(archer2.health > 0){
			redWarrior.checkWarriorandSwordCollisionAgainst(archer2);
		}

		cameraFollow();	
	};
};

function health() {
	colorRect(695,15,115,30, 'black');
	if (redWarrior.health >= 0) {
	colorRect(700,20,10,20, 'green'); // 0.5 HP
	} if (redWarrior.health < .5) {
	colorRect(700,20,10,20, 'red'); // 0.5 HP //
	} if (redWarrior.health >= .5) {
	colorRect(710,20,10,20, 'green'); // 0.5 HP
	} if (redWarrior.health < 1) {
 	colorRect(710,20,10,20, 'red'); // 0.5 HP //
	} if (redWarrior.health >= 1) {
	colorRect(725,20,10,20, 'green'); // 1 HP **********
	} if (redWarrior.health < 1.5) {
	colorRect(725,20,10,20, 'red'); // 1 HP //  
	} if (redWarrior.health >= 1.5) {
	colorRect(735,20,10,20, 'green'); // 1.5 HP	
	} if (redWarrior.health < 2 ) {
	colorRect(735,20,10,20, 'red'); // 1.5 HP //
	} if (redWarrior.health >= 2) {
	colorRect(750,20,10,20, 'green'); // 2 HP ***********
	} if (redWarrior.health < 2.5) {
	colorRect(750,20,10,20, 'red'); // 2 HP 
	} if (redWarrior.health >= 2.5) {
	colorRect(760,20,10,20, 'green'); // 2.5 HP
	} if (redWarrior.health < 3) {
	colorRect(760,20,10,20, 'red'); // 2.5 HP
	} if (redWarrior.health >= 3) {
	colorRect(775,20,10,20, 'green'); // 3 HP ******************
	} if (redWarrior.health < 3.5) {
	colorRect(775,20,10,20, 'red'); // 3 HP
	} if (redWarrior.health >= 3.5) {
	colorRect(785,20,10,20, 'green'); // 3.5 HP
	} if (redWarrior.health < 4) {
	colorRect(785,20,10,20, 'red'); // 3.5 HP
	}
	
	if (redWarrior.health <= 0) {
		resetLevel();
	}
}

function messageDraw(){
	colorRect(0,canvas.height-50, canvas.width, 50, "black");
	colorRect(5,canvas.height-45, canvas.width-10, 40, "white");
	colorText( dialog, 20, canvas.height-20, "Black");
}

function damageDraw(){
	var sx = 0;
	
	if(redWarrior.mySword.damagePoints == 1){
		sx = 0;
	} else if(redWarrior.mySword.damagePoints == 2){
		sx = 40;
	} else if(redWarrior.mySword.damagePoints == 3){
		sx = 80;
	} else if(redWarrior.mySword.damagePoints == 4){
		sx = 120;
	} else if(redWarrior.mySword.damagePoints == 5){
		sx = 160;
	} else if(redWarrior.mySword.damagePoints == 6){
		sx = 200;
	}
	colorText("Damage", canvas.width-120, canvas.height-32, "Black");
	colorText("Roll", canvas.width-120, canvas.height-12, "Black");
	canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width-50,canvas.height-40, 30, 30);
}

function inventoryDraw() {
	colorRect(canvas.width-200,canvas.height-200, 200, 150, "black");
	colorRect(canvas.width-195,canvas.height-195, 190, 140, "white");
	colorText( "Arrows: " + redWarrior.myArrow.arrowQuantity , canvas.width-180,canvas.height-180, "Black");	
	colorText( "Rocks: " + redWarrior.myRock.rockQuantity, canvas.width-180,canvas.height-160, "Black");
	colorText( "Gold Pieces: " + redWarrior.goldpieces, canvas.width-180,canvas.height-140, "Black");
	colorText( "Yellow Keys: " + redWarrior.yellowKeysHeld, canvas.width-180,canvas.height-120, "Black");
	colorText( "Red Keys: " + redWarrior.redKeysHeld, canvas.width-180,canvas.height-100, "Black");
	colorText( "Blue Keys: " + redWarrior.blueKeysHeld , canvas.width-180,canvas.height-80, "Black");
	colorText( "Green Keys: " + redWarrior.greenKeysHeld, canvas.width-180,canvas.height-60, "Black");
}

function statsDraw() {
	colorRect(canvas.width-200,canvas.height-200, 200, 150, "black");
	colorRect(canvas.width-195,canvas.height-195, 190, 140, "white");
	colorText( "Hit Point: " + redWarrior.health , canvas.width-180,canvas.height-180, "Black");	
	colorText( "Experience: " + redWarrior.experience, canvas.width-180,canvas.height-160, "Black");
	colorText( "Max Sword Damage: " + redWarrior.mySword.damageDice, canvas.width-180,canvas.height-140, "Black");
	colorText( "Max Arrow Damage: " + redWarrior.myArrow.damage, canvas.width-180,canvas.height-120, "Black");
	colorText( "Max Stone Damage: " + redWarrior.myRock.damage, canvas.width-180,canvas.height-100, "Black");
}


function drawAll() {
		if(menuScreen){
			canvasContext.drawImage(titlepagePic, 0,0);  // blanks out the screen
			canvasContext.font="30px Georgia";
			colorText("Welcome to Vince's Warrior Legend!", 120, 100, "white");				
			canvasContext.font="20px Georgia";
			colorText("This game is still Work in Progress, but playable!", 170, 150, "white");	
			colorText("Move from level to level by collecting keys.", 170, 200, "white");	
			colorText("Kill monsters with your sword, and collect gold.", 170, 225, "white");	
			colorText("Click to start", 170, 255, "white");
			canvasContext.font="15px Georgia";
			colorText("Move Left - Left Arrow", 170, 300, "white");	
			colorText("Move Down - Down Arrow", 170, 325, "white");
			colorText("Move Right - Right Arrow", 170, 350, "white");
			colorText("Move Up - Up Arrow", 170, 375, "white");
			colorText("Sword Attack - Space bar", 170, 400, "white");
		} else if (isInShop){ 
			drawShop();
		} else {
			canvasContext.save();
			canvasContext.translate(-camPanX,-camPanY);
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
			if(inventoryScreen){
				inventoryDraw();
			}
			if(statsScreen){
				statsDraw();
			}
		}
}
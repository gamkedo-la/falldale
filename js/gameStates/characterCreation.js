var result1sx;
var result2sx;
var result3sx;
var Dice1 = false;
var Dice2 = false;
var Dice3 = false;
var rollingCreationDice = false;
var strength = false;
var dexterity = false;
var ready = false; // prevents starting the game without rolling
var gameKeeperFeedback = "Choose your Hero";

function drawCreationScreen(){
	if(rollingCreationDice) {
		updateCharaterAbilities();
	}

    canvasContext.save();
    canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
	canvasContext.drawImage(storeFrontPic, 0,0);  // replace with a Creation Screen background
	drawTextWithShadowCentered(gameKeeperFeedback , 0.60 * canvas.width, 50, "white", "45px sans-serif");
	colorText("Character Creation" , 25, 50, "white");
	colorText('Press "Space Bar" to Roll' , 25, 70, "white");
	colorText("Strength: " + redWarrior.strength , 50, 100, "white");
	colorText("Dexterity: " + redWarrior.dexterity, 50, 120, "white");
	colorText("Constitution: " + redWarrior.constitution , 50, 140, "white");
	colorText("Intelligence: " + redWarrior.intelligence, 50, 160, "white");
	colorText("Wisdom: " + redWarrior.wisdom, 50, 180, "white");
	colorText("Charisma: " + redWarrior.charisma, 50, 200, "white");
	colorText('Press "Enter" to continue', 25, 230, "white");
//	colorText('bug: press "spacebar" to bypass', 25, 280, "red");
	canvasContext.restore();
}

function drawDice(DiceNumber){
	var Dice = DiceNumber
	var sx;
	
	if(Dice == Dice1){
		sx = result1sx;
		canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width-300,canvas.height-40, 30, 30);	
		dice1 = false;
	} 
	if (Dice == Dice2){
		sx = result2sx;	
		canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width-250,canvas.height-40, 30, 30);
		dice2 = false;
	}
	if (Dice == Dice3){
		sx = result3sx;
		canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width-200,canvas.height-40, 30, 30);
		dice3 = false;		
	}

}

function updateCharaterAbilities() {
	characterCreationRolling();

	redWarrior.strength = characterCreationRolling();
	redWarrior.dexterity = characterCreationRolling();
	redWarrior.constitution = characterCreationRolling();
	redWarrior.intelligence = characterCreationRolling();
	redWarrior.wisdom = characterCreationRolling();
	redWarrior.charisma = characterCreationRolling();
}
	
function characterCreationRolling(){

	var sx;
	var diceRoll1;
	var diceRoll2;
	var diceRoll3;
	var diceSides = 6;
	var diceRollTotal;
	
	diceRoll1 = Math.floor(Math.random() * diceSides) + 1
	diceRoll2 = Math.floor(Math.random() * diceSides) + 1
	diceRoll3 = Math.floor(Math.random() * diceSides) + 1

	if(diceRoll1 == 1){
		result1sx = 0;
	} else if(diceRoll1 == 2){
		result1sx = 40;
	} else if(diceRoll1 == 3){
		result1sx = 80;
	} else if(diceRoll1 == 4){
		result1sx = 120;
	} else if(diceRoll1 == 5){
		result1sx = 160;
	} else if(diceRoll1 == 6){
		result1sx = 200;
	}
	
	if(diceRoll2 == 1){
		result2sx = 0;
	} else if(diceRoll2 == 2){
		result2sx = 40;
	} else if(diceRoll2 == 3){
		result2sx = 80;
	} else if(diceRoll2 == 4){
		result2sx = 120;
	} else if(diceRoll2 == 5){
		result2sx = 160;
	} else if(diceRoll2 == 6){
		result2sx = 200;
	}
	
	if(diceRoll3 == 1){
		result3sx = 0;
	} else if(diceRoll3 == 2){
		result3sx = 40;
	} else if(diceRoll3 == 3){
		result3sx = 80;
	} else if(diceRoll3 == 4){
		result3sx = 120;
	} else if(diceRoll3 == 5){
		result3sx = 160;
	} else if(diceRoll3 == 6){
		result3sx = 200;
	}
	
	canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width-200,canvas.height-40, 30, 30);
	diceRollTotal = diceRoll1 + diceRoll2 + diceRoll3;

	return diceRollTotal;
}

function characterCreationScreenInput(whichKeyCode){
	switch(whichKeyCode){
		
		case KEY_SPACEBAR:
		if(rollingCreationDice) {
			rollingCreationDice = false;
			ready = true;
		} else {
			rollingCreationDice = true;
			ready = false;
		}

		break;

		case ENTER:
		if (ready)
		{
			characterCreationScreen = false;
			characterSelectionScreen = true;

			gameKeeperFeedback = "Have you chosen wisely?";
		}

		default:
			gameKeeperFeedback = "";
			break;
	} 
	dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);
}
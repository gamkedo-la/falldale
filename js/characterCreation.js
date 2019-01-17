var result1sx;
var result2sx;
var result3sx;
var Dice1 = false;
var Dice2 = false;
var Dice3 = false;
var strength = false;
var dexterity = false;

function drawCreationScreen(){
	canvasContext.drawImage(storeFrontPic, 0,0);  // replace with a Creation Screen background
	colorText("Character Creation" , 25, 50, "white");
	colorText('Press "Space Bar" to Roll' , 25, 70, "white");
	colorText("Strength: " + redWarrior.strength , 50, 100, "white");
	colorText("Dexterity: " + redWarrior.dexterity, 50, 120, "white");
	colorText("Constitution: " + redWarrior.constitution , 50, 140, "white");
	colorText("Intelligence: " + redWarrior.intelligence, 50, 160, "white");
	colorText("Wisdom: " + redWarrior.wisdom, 50, 180, "white");
	colorText("Charisma: " + redWarrior.charisma, 50, 200, "white");
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

	
function characterCreationRolling(attribute){

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
	
	if(redWarrior.strength == 0){
		redWarrior.strength = diceRollTotal;
	} else if(redWarrior.dexterity == 0){
		redWarrior.dexterity = diceRollTotal;
	} else if(redWarrior.constitution == 0){
		redWarrior.constitution = diceRollTotal;
	} else if(redWarrior.intelligence == 0){
		redWarrior.intelligence = diceRollTotal;
	} else if(redWarrior.wisdom == 0){
		redWarrior.wisdom = diceRollTotal;
	} else if(redWarrior.charisma == 0){
		redWarrior.charisma = diceRollTotal;
	}
}

function characterCreationScreenInput(whichKeyCode){
	var gameKeeperFeedback = null;
	
	switch(whichKeyCode){
		
		case KEY_SPACEBAR: 
		if(redWarrior.strength == 0){
			characterCreationRolling(redWarrior.strength);
		} else if(redWarrior.dexterity == 0){
			characterCreationRolling(redWarrior.dexterity);
		} else if(redWarrior.constitution == 0){
			characterCreationRolling(redWarrior.constitution);
		} else if(redWarrior.intelligence == 0){
			characterCreationRolling(redWarrior.intelligence);
		} else if(redWarrior.wisdom == 0){
			characterCreationRolling(redWarrior.wisdom);
		} else if(redWarrior.charisma == 0){
			characterCreationRolling(redWarrior.charisma);
		} else {
			characterCreationScreen = false;		
		}
		
		break;
		
		default:
			gameKeeperFeedback = "Shop Keeper:  Please come again.";
			break;
	} 
	
	dialog = gameKeeperFeedback;				
}
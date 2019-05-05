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
var hasRolledDice = false;
var rollCharacterButtonText = "Roll new character";


function drawCreationScreen() {
  colorRect(0, 0, canvas.width, canvas.height, 'orange'); // startup page
  if (rollingCreationDice) {
    updateCharaterAbilities();
  }

  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(storeFrontPic, 0, 0);  // replace with a Creation Screen background
  // drawTextWithShadowCentered(gameKeeperFeedback, 0.40 * canvas.width, 50, "white", "35px sans-serif");
  colorText("Character Creation", 25, 50, "black");
  colorText("Strength: " + redWarrior.strength, 50, 100, "black");
  colorText("Dexterity: " + redWarrior.dexterity, 50, 120, "black");
  colorText("Constitution: " + redWarrior.constitution, 50, 140, "black");
  colorText("Intelligence: " + redWarrior.intelligence, 50, 160, "black");
  colorText("Wisdom: " + redWarrior.wisdom, 50, 180, "black");
  colorText("Charisma: " + redWarrior.charisma, 50, 200, "black");
  colorRect(15, 260, 200, 50, 'blue');
  colorText(rollCharacterButtonText, 40, 290, "white");

  if (hasRolledDice) {
    colorRect(15, 325, 200, 50, 'green');
    colorText('Play  >>', 80, 355, "white");
  }

  canvasContext.restore();
}

function drawDice(DiceNumber) {
  var Dice = DiceNumber;
  var sx;

  if (Dice == Dice1) {
    sx = result1sx;
    canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width - 300, canvas.height - 40, 30, 30);
    dice1 = false;
  }
  if (Dice == Dice2) {
    sx = result2sx;
    canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width - 250, canvas.height - 40, 30, 30);
    dice2 = false;
  }
  if (Dice == Dice3) {
    sx = result3sx;
    canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width - 200, canvas.height - 40, 30, 30);
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

function characterCreationRolling() {

  var sx;
  var diceRoll1;
  var diceRoll2;
  var diceRoll3;
  var diceSides = 6;
  var diceRollTotal;

  diceRoll1 = Math.floor(Math.random() * diceSides) + 1;
  diceRoll2 = Math.floor(Math.random() * diceSides) + 1;
  diceRoll3 = Math.floor(Math.random() * diceSides) + 1;

  if (diceRoll1 == 1) {
    result1sx = 0;
  } else if (diceRoll1 == 2) {
    result1sx = 40;
  } else if (diceRoll1 == 3) {
    result1sx = 80;
  } else if (diceRoll1 == 4) {
    result1sx = 120;
  } else if (diceRoll1 == 5) {
    result1sx = 160;
  } else if (diceRoll1 == 6) {
    result1sx = 200;
  }

  if (diceRoll2 == 1) {
    result2sx = 0;
  } else if (diceRoll2 == 2) {
    result2sx = 40;
  } else if (diceRoll2 == 3) {
    result2sx = 80;
  } else if (diceRoll2 == 4) {
    result2sx = 120;
  } else if (diceRoll2 == 5) {
    result2sx = 160;
  } else if (diceRoll2 == 6) {
    result2sx = 200;
  }

  if (diceRoll3 == 1) {
    result3sx = 0;
  } else if (diceRoll3 == 2) {
    result3sx = 40;
  } else if (diceRoll3 == 3) {
    result3sx = 80;
  } else if (diceRoll3 == 4) {
    result3sx = 120;
  } else if (diceRoll3 == 5) {
    result3sx = 160;
  } else if (diceRoll3 == 6) {
    result3sx = 200;
  }

  canvasContext.drawImage(dicePic, sx, 0, 40, 40, canvas.width - 200, canvas.height - 40, 30, 30);
  diceRollTotal = diceRoll1 + diceRoll2 + diceRoll3;

  return diceRollTotal;
}

function characterCreationScreenClick(evt) {
  var frameTopY = (0.50 * canvas.height) - 300;
  var frameLeftX = (0.50 * canvas.width) - 400;
  var differenceX = calculateMousePos(evt).x - frameLeftX;
  var differenceY = calculateMousePos(evt).y - frameTopY;
  if (15 <= differenceX && differenceX <= 215 && 262 <= differenceY && differenceY <= 311) {
    // clicked roll character button
    if (rollingCreationDice) {
      rollingCreationDice = false;
      ready = true;
      rollCharacterButtonText = "Roll new character";
      hasRolledDice = true
    } else {
      rollingCreationDice = true;
      ready = false;
      rollCharacterButtonText = "Stop rolling";
      hasRolledDice = false
    }
  } else if (15 <= differenceX && differenceX <= 215 && 327 <= differenceY && differenceY <= 376 && hasRolledDice) {
    // clicked roll character button and it is available
    if (ready) {
      characterCreationScreen = false;
      characterSelectionScreen = true;

      gameKeeperFeedback = "Have you chosen wisely?";
    }
  }


  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);

}
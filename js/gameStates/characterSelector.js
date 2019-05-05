// TODO: add new characters here and in the `characters` array.
var warrior = {
  name : "Warrior",
  sprites : warriorPic,
  sprite_width : 40,
  sprite_height : 50,
  sprite_frames : 4,
  portrait: warriorProfilePic,
};

var biggy = {
  name : "Biggy",
  sprites : biggyPic,
  sprite_width : 50,
  sprite_height : 50,
  sprite_frames : 6,
  portrait: biggyProfilePic,
};

var smally = {
  name : "Smally",
  sprites : smallyPic,
  sprite_width : 50,
  sprite_height : 50,
  sprite_frames : 6,
  portrait: smallyProfilePic,
	
};

var teeny = {
  name : "Teeny",
  sprites : teenyPic,
  sprite_width : 50,
  sprite_height : 50,
  sprite_frames : 6,
  portrait: teenyProfilePic,
	
};

var weeny = {
  name : "Weeny",
  sprites : weenyPic,
  sprite_width : 50,
  sprite_height : 50,
  sprite_frames : 6,
  portrait: weeyProfilePic,
	
};

var characters = [ warrior, biggy, smally, teeny, weeny ]; 
var characterSelectedIndex = 0;
var characterSelected = null;
var firstTimeCharacterSelection = true;

function drawSelectorScreen() {

  if(firstTimeCharacterSelection)
  {
    firstTimeCharacterSelection = false;
    selectCharacter(0);
  }

  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(storeFrontPic, 0, 0);  // replace with a Creation Screen background
  // drawTextWithShadowCentered(gameKeeperFeedback, 0.40 * canvas.width, 50, "white", "35px sans-serif");
  colorText("Character Creation", 25, 50, "black");
  // colorText('Press "Up" and "Down" to Choose', 25, 70, "white");
  colorText(characterSelected.name, 25, 90, "red");
  colorRect(310, 130, 40, 40, 'white');
  colorText('prev', 313, 155, "black");
  colorRect(310, 175, 40, 40, 'white');
  colorText('next', 313, 200, "black");
  colorText('Click next or prev to select character', 60, 230, "black");
  if(characterSelected.portrait)
  {
    canvasContext.drawImage(characterSelected.portrait, 100, 100, 100, 100);
  }
  colorRect(15, 260, 200, 50, 'blue');
  colorText("Continue >>", 30, 290, "black");
  canvasContext.restore();
}

function characterSelectorScreenClick(evt) {
  var frameTopY = (0.50 * canvas.height) - 300;
  var frameLeftX = (0.50 * canvas.width) - 400;
  var differenceX = calculateMousePos(evt).x - frameLeftX;
  var differenceY = calculateMousePos(evt).y - frameTopY;
  console.log(differenceX, differenceY);
  if (310 <= differenceX && differenceX <= 350 && 130 <= differenceY && differenceY <= 170) {
    // clicked prev button
    selectPreviousCharacter();
  } else if (310 <= differenceX && differenceX <= 350 && 175 <= differenceY && differenceY <= 215) {
    // clicked next button
    selectNextCharacter();
  } else if (15 <= differenceX && differenceX <= 215 && 262 <= differenceY && differenceY <= 311) {
    if (ready) {
      launchGame();
    }
  }


  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);
}


function characterSelectorScreenInput(whichKeyCode) {
  switch (whichKeyCode) {
    case ENTER:
      if (ready) {
        launchGame();
      }

    default:
      gameKeeperFeedback = "";
      break;
  }
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);
}

function selectPreviousCharacter() {
  var newIndex = characterSelectedIndex -1 ; // go to next item in array
  if (newIndex < 0) {
    newIndex = characters.length - 1; // wrap around
  }
  selectCharacter(newIndex);
}

function selectNextCharacter() {
  var newIndex = characterSelectedIndex + 1;
  if (newIndex >= characters.length) {
    newIndex = 0; // wrap around
  }
  selectCharacter(newIndex);
}

function selectCharacter(index){
  characterSelectedIndex = index;
  characterSelected = characters[ characterSelectedIndex ];
  console.log(characterSelected.name);
  redWarrior.myWarriorPic = characterSelected.sprites;
  redWarrior.width = characterSelected.sprite_width;
  redWarrior.height = characterSelected.sprite_height;
  redWarrior.numberOfFrames = characterSelected.sprite_frames;
}

function launchGame() {
  loadLevel();
  characterSelectionScreen = false;
  scrollBackgroundScreen = true;

  gameKeeperFeedback = "Have you chosen wisely?";
}
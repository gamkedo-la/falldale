var characters = [ 'warriorPic', 'Biggy', 'Smally', 'Teeny', 'Weeny' ];
var characterSelectedIndex = 0;
var characterSelected = characters[ characterSelectedIndex ];


function drawSelectorScreen() {

  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(storeFrontPic, 0, 0);  // replace with a Creation Screen background
  // drawTextWithShadowCentered(gameKeeperFeedback, 0.40 * canvas.width, 50, "white", "35px sans-serif");
  colorText("Character Creation", 25, 50, "white");
  // colorText('Press "Up" and "Down" to Choose', 25, 70, "white");
  colorText(characterSelected, 25, 90, "red");
  colorRect(310, 130, 40, 40, 'white');
  colorText('prev', 313, 155, "black");
  colorRect(310, 175, 40, 40, 'white');
  colorText('next', 313, 200, "black");
  colorText('Click next or prev to select character', 60, 230, "white");

  colorRect(15, 260, 200, 50, 'blue');
  colorText("Continue >>", 30, 290, "white");
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
    characterSelectedIndex--; // go to next item in array
    if (characterSelectedIndex <= 0) {
      characterSelectedIndex = characters.length - 1; // wrap around
    }
    characterSelected = characters[ characterSelectedIndex ];
    redWarrior.myWarriorPic = characterSelected;
  } else if (310 <= differenceX && differenceX <= 350 && 175 <= differenceY && differenceY <= 215) {
    // clicked next button
    characterSelectedIndex++; // go to next item in array
    if (characterSelectedIndex >= characters.length) {
      characterSelectedIndex = 0; // wrap around
    }
    characterSelected = characters[ characterSelectedIndex ];
    console.log(characterSelected);
    redWarrior.myWarriorPic = characterSelected;

  } else if (15 <= differenceX && differenceX <= 215 && 262 <= differenceY && differenceY <= 311) {
    if (ready) {
      characterSelectionScreen = false;
      scrollBackgroundScreen = true;

      gameKeeperFeedback = "Have you chosen wisely?";
    }
  }


  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);
}


function characterSelectorScreenInput(whichKeyCode) {
  switch (whichKeyCode) {
    case ENTER:
      if (ready) {
        characterSelectionScreen = false;
        scrollBackgroundScreen = true;

        gameKeeperFeedback = "Have you chosen wisely?";
      }

    default:
      gameKeeperFeedback = "";
      break;
  }
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);
}
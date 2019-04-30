displayQ3 = true;

function questThreeCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      questThreeCompletionScreenActive = false;
	  displayQ3 = false;
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawQuestThreeCompletionScreen() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("The Orc King is DEAD.", 350, 50, "white");
  colorText("JUST A CONCEPT, NEEDS TO BE WRITTEN", 100, 100, "white");
  colorText("JUST A CONCEPT, NEEDS TO BE WRITTEN", 100, 350, "white");
  colorText("....", 100, 150, "white");
  colorText("....", 100, 200, "white");
  colorText("....", 100, 250, "white");
  colorText("....", 100, 300, "white");
  colorText("Press ENTER", 100, 400, "white");
  canvasContext.restore();
} 
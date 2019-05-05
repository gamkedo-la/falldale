

function questTwoCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      questTwoCompletionScreenActive = false;
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawQuestTwoCompletionScreen () {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("The Goblins and Orcs have been cleared of the Forest.", 350, 50, "black");
  colorText("The Princess and citizens of Falldale will be happy.", 100, 150, "black");
  colorText("You have cleared the nearby forest of all the Goblins and Orcs.", 100, 200, "black");
  colorText("You once again prove yourself a hero.", 100, 250, "black");
  colorText("Bards will continue writing songs about your heroic acts.", 100, 300, "black");
  colorText("Press ENTER", 100, 400, "black");
  canvasContext.restore();
} 
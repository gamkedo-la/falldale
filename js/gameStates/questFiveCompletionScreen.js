function questFiveCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      questFiveCompletionScreenActive = false;
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawQuestFiveCompletionScreen () {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("The Druid Queen is DEAD.", 350, 50, "white");
  colorText("You tragically killed the Druid Queen, but it had to be done", 100, 150, "white");
  colorText("to defend Falldale.  She could not be trusted to hold the Crystal Shard", 100, 200, "white");
  colorText("of Earth, as she was doing evil with it.", 100, 250, "white");
  colorText("Press ENTER", 100, 400, "white");
  canvasContext.restore();
} 
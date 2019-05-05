function questFourCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      questFourCompletionScreenActive = false;
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawQuestFourCompletionScreen () {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("The graveyard is at peace.", 350, 50, "white");
  colorText("In this quest, you have discovered that your friend", 100, 150, "white");
  colorText("The Druid Queen has gone berserk and has been   ", 100, 200, "white");
  colorText("raising the dead.  She can not be trusted with her", 100, 250, "white");
  colorText("Crystal Shard of Earth.", 100, 300, "white");
  colorText("Press ENTER", 100, 400, "white");
  canvasContext.restore();
} 
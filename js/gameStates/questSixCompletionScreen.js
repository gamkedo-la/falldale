function questSixCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      questSixCompletionScreenActive = false;
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawQuestSixCompletionScreen () {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("The Wizard is DEAD.", 350, 50, "white");
  colorText("You have killed the Wizard and have obtained the third Shard.", 100, 150, "white");
  colorText("You are now ready to ready to go back to Falldale as the Hero.", 100, 200, "white");
  colorText("The town has been saved from its enemies and can now live in peace.", 100, 250, "white");
  colorText("Press ENTER", 100, 400, "white");
  canvasContext.restore();
} 
displayQ3 = true;

function questThreeCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      questThreeCompletionScreenActive = false;
	  displayQ3 = false;
	  OverlayFX.nightMode = true;
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
  colorText("The Orc King is DEAD.", 350, 50, "black");
  colorText("You have brought the Orc King to his end.", 100, 150, "black");
  colorText("You have found the Crystal Shard of Obsidian.", 100, 200, "black");
  colorText("This is one of the three shards the Princess has", 100, 250, "black");
  colorText("asked for.  Why does she require these crystal shards?", 100, 300, "black");
  colorText("I guess it's not my place to ask.", 100, 350, "black");
  colorText("Press ENTER", 100, 400, "black");
  canvasContext.restore();
} 
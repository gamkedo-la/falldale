function questOneCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      console.log("enter");
      questOneCompletionScreenActive = false;
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawQuestOneCompletionScreen() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("Falldale Saved", 310, 75, "black", font = "bold 42px Georgia");
  colorText("You have saved your lovely town of Falldale of the beasts roaming", 115, 150, "black", font = "20px Georgia");
  colorText("the streets.  You wonder what has happened in your absence?", 150, 200, "black", font = "20px Georgia");
  colorText("Assured that your town being safe, you seek to find", 147, 250, "black", font = "20px Georgia");
  colorText("your Princess to get answers.", 144, 300, "black", font = "20px Georgia");
  colorText("Press Enter to Continue.", 450, 500, "gray", font = "20px Georgia");
  //Feel free to edit/update/change to this storyline.
  canvasContext.restore();
}
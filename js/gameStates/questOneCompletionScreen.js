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
  colorText("Falldale Saved", 310, 75, "blue", font = "bold 42px Georgia");
  colorText("You have saved your lovely town of Falldale of the beasts roaming", 115, 150, "green", font = "20px Georgia");
  colorText(" the streets.  You wonder what has happened in your absence?", 150, 200, "green", font = "20px Georgia");
  colorText("Comforted of your town being safe, you want to go check on", 153, 250, "green", font = "20px Georgia");
   colorText("your Princess.", 153, 250, "green", font = "20px Georgia");
  //Feel free to edit/update/change to this storyline.
  canvasContext.restore();
}
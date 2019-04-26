function questOneCompletionScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER:
      console.log("enter");
      questCompletionScreenActive = false;
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
  colorText("The Goblins are no more.", 350, 50, "white");
  colorText("After waking up to find your lovely town of Falldale was under attack,", 100, 300, "white");
  colorText("you were able to save the town by killing all of the Goblin invaders.", 100, 350, "white");
  colorText("The residents of Falldale are happy to have you as their town hero.", 100, 400, "white");
  colorText("Bards will start writing songs about your heroic acts.", 100, 450, "white");
  colorText("Press ENTER", 100, 400, "white");
  canvasContext.restore();
}
function scrollBackgroundScreenClick(evt) {
  var gameKeeperFeedback = null;

  scrollBackgroundScreen = false;
}

function scrollBackgroundScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER: {
      scrollBackgroundScreen = false;
    }
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawScrollNarrative() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  colorRect(0, 0, canvas.width, canvas.height, 'orange');
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("Falldale", 310, 75, "blue", font = "bold 42px Georgia");
  colorText("You have been on the road for months exploring the outside world.", 115, 150, "green", font = "20px Georgia");
  colorText("Today you have finally returned to your beloved Falldale.", 150, 200, "green", font = "20px Georgia");
  colorText("Noticing that there are many beasts roaming the streets", 153, 250, "green", font = "20px Georgia");
  colorText("You quickly run to the house of your childhood", 180, 300, "green", font = "20px Georgia");
  colorText("Only to find that your home is devoid of life. Except for the cat!", 120, 350, "green", font = "20px Georgia");
  colorText("Determined to find the Druid who raised you", 184, 400, "green", font = "20px Georgia");
  colorText("And what is happening to your town, you set out on a new adventure.", 95, 450, "green", font = "20px Georgia");
  canvasContext.restore();
}
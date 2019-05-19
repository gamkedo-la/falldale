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
  let maxWidth = canvas.width * 0.2;
  let resizeFactor = 0.9;
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  colorRect(0, 0, canvas.width, canvas.height, 'orange');
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("Falldale", 310, 75, "black", font = "bold 42px Georgia");
  colorText("You have been on the road for months exploring the outside world.", 115, 150, "black", font = "20px Georgia", maxWidth, resizeFactor);
  colorText("Today you have finally returned to your beloved Falldale.", 150, 200, "black", font = "20px Georgia", maxWidth, resizeFactor);
  colorText("Noticing that there are many beasts roaming the streets", 153, 250, "black", font = "20px Georgia", maxWidth, resizeFactor);
  colorText("You quickly run to the house of your childhood", 180, 300, "black", font = "20px Georgia", maxWidth, resizeFactor);
  colorText("Only to find that your home is devoid of life. Except for the cat!", 120, 350, "black", font = "20px Georgia", maxWidth, resizeFactor);
  colorText("Determined to find the Druid who raised you", 184, 400, "black", font = "20px Georgia", maxWidth, resizeFactor);
  colorText("And what is happening to your town, you set out on a new adventure.", 95, 450, "black", font = "20px Georgia", maxWidth, resizeFactor);
  canvasContext.restore();
}
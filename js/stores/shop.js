var welcomeSpeech = false;

function drawShop() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(storeFrontPic, 0, 0);
  colorText("Please let me know if you would like any", 25, 50, "white");
  colorText("of our items in stock.", 25, 65, "white");
  colorText("1.) 10 Arrows 	- 	10 gp", 50, 100, "white");
  colorText("2.) 10 Rocks 	- 	 10 gp", 50, 120, "white");
  colorText("3.)  1 Heart 	- 	 10 gp", 50, 140, "white");
  colorText("4.) 'Nothing at this time'", 50, 160, "white");
  colorRect(630, 25, 150, 40, "black");
  colorText(`Your gold: ${ redWarrior.goldpieces }`, 650, 50, "gold");
  canvasContext.restore();

  if (!welcomeSpeech) {
  	if (redWarrior.questTwoComplete) {
  	  shopKeeperFeedback = "Shop Keeper:  You could use this Ax for your journey through the woods.";
  	} else {
  	  shopKeeperFeedback = "Shop Keeper:  Hi, I'm the Shop Keeper.  I could use a better name.";
  	}
  }
  welcomeSpeech = true;
  dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}

function shopInput(whichKeyCode) {
  var shopKeeperFeedback = null;

  switch (whichKeyCode) {
    case NUM_1:
      if (redWarrior.goldpieces >= 10) {
        redWarrior.goldpieces = redWarrior.goldpieces - 10;
        redWarrior.myArrow.quantity = redWarrior.myArrow.quantity + 10;
        shopKeeperFeedback = "Shop Keeper:  Thank you for purchasing the arrows.  Please come again.";
      } else {
        shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
      }
      break;
    case NUM_1:
    case NUM_2:
      if (redWarrior.goldpieces >= 10) {
        redWarrior.goldpieces = redWarrior.goldpieces - 10;
        redWarrior.myRock.quantity = redWarrior.myRock.quantity + 10;
        shopKeeperFeedback = "Shop Keeper:  Thank you for purchasing the throwing rocks.  Please come again.";
      } else {
        shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
      }
      break;
    case NUM_3:
      if (redWarrior.goldpieces >= 10) {
        redWarrior.goldpieces = redWarrior.goldpieces - 10;
        redWarrior.health++;
        shopKeeperFeedback = "Shop Keeper:  Thank you for purchase the heart.  Please come again.";
      } else {
        shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
      }
      break;
    case NUM_4:
      shopKeeperFeedback = "Shop Keeper:  Please come again.  We will have more inventory in the future.";
      break;
    default:
      shopKeeperFeedback = "Shop Keeper:  Please come again.";
      break;
  }
  isInShop = false;
  welcomeSpeech = false;
  lastShopScreenTime = new Date().getTime();
  dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}
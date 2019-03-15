function drawShop() {
    canvasContext.save();
    canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
    canvasContext.drawImage(storeFrontPic, 0, 0); 
    colorText("Please let me know if you would like any of our", 25, 50, "white");
    colorText("items in stock.", 25, 65, "white");
    colorText("1.) 10 Arrows 	- 	10 gp", 50, 100, "white");
    colorText("2.) 10 Rocks 	- 	 10 gp", 50, 120, "white");
    colorText("3.)  1 Heart 	- 	 5 gp", 50, 140, "white");
    colorText("4.) 'Nothing at this time'", 50, 160, "white");
    canvasContext.restore();
}

function shopInput(whichKeyCode) {
    var shopKeeperFeedback = null;

    switch (whichKeyCode) {

        case NUM_1:
            if (redWarrior.goldpieces >= 10) {
                redWarrior.goldpieces = redWarrior.goldpieces - 10;
                redWarrior.myArrow.arrowQuantity = redWarrior.myArrow.arrowQuantity + 10;
                shopKeeperFeedback = "Shop Keeper:  Thank you for purchasing the arrows.  Please come again.";
            } else {
                shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
            }
            break;
        case NUM_1:
        case NUM_2:
            if (redWarrior.goldpieces >= 10) {
                redWarrior.goldpieces = redWarrior.goldpieces - 10;
                redWarrior.myRock.rockQuantity = redWarrior.myRock.rockQuantity + 10;
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
    dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}
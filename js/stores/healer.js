function drawHealerShop() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(healerStorePic, 0, 0); // replace with healer background
  colorText("Please make a donation to our mission.", 25, 50, "white");
  colorText("Suggested Donations.", 25, 65, "white");
  colorText("1.) Restore 1 Hit Point - 			10 gp", 50, 100, "white");
  colorText("2.) Restore 5 Hit Points - 	 		40 gp", 50, 120, "white");
  colorText("3.) Healing Potion (cures 5 HP) -	50 gp", 50, 140, "white");
  colorText("4.) 'Nothing at this time'", 50, 160, "white");
  canvasContext.restore();
}

function healerInput(whichKeyCode) {
  var shopKeeperFeedback = null;

  switch (whichKeyCode) {
    case NUM_1:
      if (redWarrior.goldpieces >= 10) {
        if (redWarrior.health <= redWarrior.maxHealth - 1) {
          redWarrior.goldpieces = redWarrior.goldpieces - 10;
          redWarrior.health = redWarrior.health + 1;
          shopKeeperFeedback = "Healer:  Thank you for your donation.  Please come again.";
        } else {
          shopKeeperFeedback = "Healer:  I can not heal you any more.";
        }
      } else {
        shopKeeperFeedback = "Healer:  You don't have enough gold pieces";
      }
      break;
    case NUM_2:
      if (redWarrior.goldpieces >= 40) {
        if (redWarrior.health <= redWarrior.maxHealth - 5) {
          redWarrior.goldpieces = redWarrior.goldpieces - 40;
          redWarrior.health = redWarrior.health + 5;
          shopKeeperFeedback = "Healer:  Thank you for your generous donation.  Please come again.";
        } else {
          shopKeeperFeedback = "Healer:  I can not heal you that much.";
        }
      } else {
        shopKeeperFeedback = "Healer:  You don't have enough gold pieces";
      }
      break;
    case NUM_3:
      if (redWarrior.goldpieces >= 50) {
        redWarrior.goldpieces = redWarrior.goldpieces - 50;
        redWarrior.healingPotion++;
        shopKeeperFeedback = "Healer:  Thank you for your very generous donation.  Enjoy your healing potion when it's needed.";
      } else {
        shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
      }
      break;
    case NUM_4:
      shopKeeperFeedback = "Healer:  Thanks for stopping by.  Please come again.";
      break;
    default:
      shopKeeperFeedback = "Healer:  Please come again.";
      break;
  }
  console.log("healer interraction done");
  isAtHealer = false;
  lastShopScreenTime = new Date().getTime();
  dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}
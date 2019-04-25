// Killing the Orc King and returning the first Crystal to the Princess

function questThreeComplete() {
  redWarrior.questThreeComplete = true;
  dialogManager.setDialogWithCountdown("The Orc King is dead!", 8);
  levelList[ 0 ] = orcKingforest2;
  redWarrior.questThreeActive = false;
  questThreeCompletionScreenActive = true;
}

//Player discovers the Druid Queen has gone insane and can't be trusted with her Crystal
//Player goes on a quest to kill the Druid Queen and return the Crystal to the Princess
//Player discovers the Wizard in the Tower is the master mind behind the Druid going crazy 
//and the Orc King attacking the village

function questFiveComplete() {
  redWarrior.questFiveComplete = true;
  dialogManager.setDialogWithCountdown("The Druid Queen is dead!", 8);
  //levelList[ 9 ] = druidsGroove2;
  redWarrior.questFiveActive = false;
  questFiveCompletionScreenActive = true;
}
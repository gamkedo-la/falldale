//Player discovers the Druid Queen has gone insane and can't be trusted with her Crystal
//Player goes on a quest to kill the Druid Queen and return the Crystal to the Princess
//Player discovers the Wizard in the Tower is the master mind behind the Druid going crazy 
//and the Orc King attacking the village

var goblinsKilledInForest = 0;
var orcsKilledInForest = 0;

function countGoblinforQuestTwo() {
  if (redWarrior.questTwoComplete == false) {
    if (levelNow == 6) { // located in Forest
      goblinsKilledInForest++;
      console.log(goblinsKilledInForest);
      checkForQuestTwoComplete();
    }
  }
}

function countOrcforQuestTwo() {
  if (redWarrior.questTwoComplete == false) {
    if (levelNow == 6) { // located in Forest
      orcsKilledInForest++;
      console.log(orcsKilledInForest);
      checkForQuestTwoComplete();
    }
  }
}

function checkForQuestTwoComplete() {
  if (goblinsKilledInForest >= 10 && orcsKilledInForest >= 10) {
    redWarrior.questOneComplete = true;
    dialogManager.setDialogWithCountdown("I have van-quest all the Goblins and Orcs from the forest!", 8);
    backgroundMusic.loopSong("have-a-nice-beer");
    levelList[ 6 ] = forest2;
    questTwoActive = false;
    questCompletionScreenActive = true;
  }

}
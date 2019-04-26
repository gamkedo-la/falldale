//Clearing the Woods of the Orcs and Goblins
//Player discovers Orc King is behind all the raids trying to steal the Princess's Crystal

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
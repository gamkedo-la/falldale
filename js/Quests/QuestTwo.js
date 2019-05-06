//Clearing the Woods of the Orcs and Goblins
//Player discovers Orc King is behind all the raids trying to steal the Princess's Crystal

var goblinsKilledInForest = 0;
var orcsKilledInForest = 0;

function countGoblinforQuestTwo() {
  if (redWarrior.questTwoComplete == false) {
    if (levelNow == 6 && goblinsKilledInForest < 10) { // located in Forest
      goblinsKilledInForest++;
      checkForQuestTwoComplete();
    }
  }
}

function countOrcforQuestTwo() {
  if (redWarrior.questTwoComplete == false) {
    if (levelNow == 6 && orcsKilledInForest < 10) { // located in Forest
      orcsKilledInForest++;
      checkForQuestTwoComplete();
    }
  }
}

function checkForQuestTwoComplete() {
  console.log('Checking for Quest Two')
  if (goblinsKilledInForest >= 10 && orcsKilledInForest >= 10) {
    console.log('Complete')
	redWarrior.questTwoComplete = true;
    dialogManager.setDialogWithCountdown("I have van-quest all the Goblins and Orcs from the forest!", 8);
    backgroundMusic.loopSong("have-a-nice-beer");
    levelList[ 6 ] = forest2;
    redWarrior.questTwoActive = false;
    questTwoCompletionScreenActive = true;
	console.log(redWarrior.questTwoComplete);
  }

}
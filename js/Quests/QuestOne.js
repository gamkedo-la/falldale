// Clearing Falldale of the Goblins

var goblinsKilledInFallDale = 0;
var firstQuestLoad = false;

function countGoblinforQuestOne() {
  if (redWarrior.questOneComplete == false) {
    if (levelNow == 7) { // located in Falldale
      goblinsKilledInFallDale++;
      console.log(goblinsKilledInFallDale);
      checkForQuestOneComplete();
    }
  }
}

function checkForQuestOneComplete() {
  if (goblinsKilledInFallDale >= 10) {
    redWarrior.questOneComplete = true;
    dialogManager.setDialogWithCountdown("I have van-quest all the Goblins from Falldale!", 8);
    backgroundMusic.loopSong("have-a-nice-beer");
    OverlayFX.nightMode = false;
    levelList[ 7 ] = fallDale2;
    redWarrior.questOneActive = false;
    questOneCompletionScreenActive  = true;
  }

}
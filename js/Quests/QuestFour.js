//Player travels to the Graveyard to see why the undead are restless

var skeletonsKilledInGraveyardOneorTwo = 0;
var zombiesKilledInGraveyardOneorTwo = 0;


function skeletonsKilledInGraveyardOneorTwo() {
  if (redWarrior.questFourComplete == false) {
    if (levelNow == 10 || levelNow == 11) { // located in Falldale
      skeletonsKilledInGraveyardOneorTwo++;
      checkForQuestFourComplete();
    }
  }
}

function zombiesKilledInGraveyardOneorTwo() {
  if (redWarrior.questThreeComplete == false) {
    if (levelNow == 10 || levelNow == 11) { // located in Falldale
      zombiesKilledInGraveyardOneorTwo++;
      checkForQuestFourComplete();
    }
  }
}

function checkForQuestFourComplete() {
  if (skeletonsKilledInGraveyardOneorTwo >= 15 && zombiesKilledInGraveyardOneorTwo >= 15) {
    redWarrior.questFourComplete = true;
    dialogManager.setDialogWithCountdown("I have van-quest all the zombies and skeletons from the graveyard!", 8);
    backgroundMusic.loopSong("have-a-nice-beer");
    OverlayFX.nightMode = false;
    //levelList[ 10 ] = graveYard2;
    redWarrior.questFourActive = false;
    questFourCompletionScreenActive  = true;
  }

}
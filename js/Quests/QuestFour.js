//Player travels to the Graveyard to see why the undead are restless

var skeletonsKilledInGraveyardOneorTwo = 0;
var zombiesKilledInGraveyardOneorTwo = 0;


function skeletonsKilledInGraveyard() {
  if ( redWarrior.questFourActive == true) {
    if (levelNow == 10 || levelNow == 11) { // located in Graveyard
      skeletonsKilledInGraveyardOneorTwo++;
      checkForQuestFourComplete();
    }
  }
}

function zombiesKilledInGraveyard() {
	console.log(levelNow)
  if (redWarrior.questFourActive == true) {
    if (levelNow == 10 || levelNow == 11) { // located in Graveyard
      zombiesKilledInGraveyardOneorTwo++;
      checkForQuestFourComplete();
    }
  }
}

function checkForQuestFourComplete() {
  if (skeletonsKilledInGraveyardOneorTwo >= 20 && zombiesKilledInGraveyardOneorTwo >= 20) {
    redWarrior.questFourComplete = true;
    dialogManager.setDialogWithCountdown("I have van-quest all the zombies and skeletons from the graveyard!", 8);
    backgroundMusic.loopSong("have-a-nice-beer");
    OverlayFX.nightMode = false;
    //levelList[ 10 ] = graveYard2;
    redWarrior.questFourActive = false;
    questFourCompletionScreenActive  = true;
	OverlayFX.nightMode = false;
  }

}
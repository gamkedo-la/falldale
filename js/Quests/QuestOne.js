var goblinsKilledInFallDale = 0;

function countGoblinforQuestOne(){
	if(redWarrior.questOneComplete == false){ 
		if (levelNow == 7) { // located in Falldale
			goblinsKilledInFallDale++;
			console.log(goblinsKilledInFallDale);
			checkForQuestOneComplete();
		}
	}
}

function checkForQuestOneComplete(){
	if(goblinsKilledInFallDale >= 20){
		redWarrior.questOneComplete = true;
		setDialogUICountdown(8);
		dialog = "I have van-quest all the Goblins from Falldale!";
	}
	
}